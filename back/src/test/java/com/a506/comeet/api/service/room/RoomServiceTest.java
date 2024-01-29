package com.a506.comeet.api.service.room;

import com.a506.comeet.common.enums.RoomConstraints;
import com.a506.comeet.app.member.entity.Member;
import com.a506.comeet.app.member.repository.MemberRepository;
import com.a506.comeet.app.room.controller.dto.RoomCreateRequestDto;
import com.a506.comeet.app.room.controller.dto.RoomJoinRequestDto;
import com.a506.comeet.app.room.controller.dto.RoomUpdateRequestDto;
import com.a506.comeet.common.enums.RoomType;
import com.a506.comeet.app.room.entity.Room;
import static org.assertj.core.api.Assertions.*;

import com.a506.comeet.app.room.repository.RoomMemberRepository;
import com.a506.comeet.app.room.repository.RoomRepository;
import com.a506.comeet.app.room.service.RoomService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.validation.*;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@SpringBootTest
@Slf4j
@Transactional
class RoomServiceTest {

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomMemberRepository roomMemberRepository;

    @Autowired
    private MemberRepository memberRepository;

    @PersistenceContext
    private EntityManager em;

    @DisplayName("validation 검사를 한다")
    @Test
    @Transactional
    void validationTest(){
        RoomCreateRequestDto req = RoomCreateRequestDto.builder().
                mangerId("멤버1").description("설명").capacity(-1).constraints(RoomConstraints.FREE).type(RoomType.DISPOSABLE).
                build();
        boolean res = isValidating(req);
        assertThat(res).isTrue();
    }


    private static <T> boolean isValidating(T req) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<T>> violations = validator.validate(req);

        // 유효성 검사 결과 확인 및 처리
        if (!violations.isEmpty()) {
            for (ConstraintViolation<T> violation : violations) {
                System.out.println(violation.getPropertyPath() + ": " + violation.getMessage());
            }
            return true;
        }

        return false;
    }

    @Test
    @Transactional
    void createTest(){
        Member manager = Member.builder().memberId("매니저").email("ee").name("ss").nickname("ss").password("ss").build();
        em.persist(manager);
        em.flush();
        em.clear();

        RoomCreateRequestDto req = RoomCreateRequestDto.builder().
                mangerId("매니저").
                title("title").description("설명").capacity(10).constraints(RoomConstraints.FREE).type(RoomType.PERMANENT).
                build();

        Room room = roomService.createRoom(req);
        assertThat(room.getTitle()).isEqualTo(req.getTitle());
        log.info("room id : {}", room.getId());
        assertThat(roomMemberRepository.findByRoomAndMemberAndIsDeletedFalse(room, memberRepository.findByMemberIdAndIsDeletedFalse("멤버1").orElse(null))).isNotNull();
    }

    @Test
    @Transactional
    void updateTest(){

        Member manager = Member.builder().memberId("멤버1").email("ee").name("ss").nickname("ss").password("ss").build();
        Member newManager = Member.builder().memberId("멤버2").email("ee").name("ss").nickname("ss").password("ss").build();
        em.persist(manager);
        em.persist(newManager);
        em.flush();
        em.clear();

        RoomCreateRequestDto req = RoomCreateRequestDto.builder().
                mangerId("멤버1").
                title("title").description("설명").capacity(10).constraints(RoomConstraints.FREE).type(RoomType.DISPOSABLE).
                build();

        Room room = roomService.createRoom(req);

        RoomUpdateRequestDto req2 = RoomUpdateRequestDto.builder().mangerId("멤버2").build();
        roomService.updateRoom(req2, "멤버1", room.getId());

        assertThat(room.getManager().getMemberId()).isEqualTo(req2.getMangerId());
        log.info("room manager Id : {}", room.getManager().getMemberId());
    }

    @Test
    @DisplayName("유저가 방에 가입 후 나간다")
    @Transactional
    void joinLeaveTest(){

        //given
        // Manager 멤버 생성
        Member manager = Member.builder().memberId("멤버1").email("ee").name("ss").nickname("ss").password("ss").build();
        Member tmpMember = Member.builder().memberId("멤버2").email("ee").name("ss").nickname("ss").password("ss").build();
        em.persist(manager);
        em.persist(tmpMember);
        em.flush();
        em.clear();

        //방 생성
        RoomCreateRequestDto reqR = RoomCreateRequestDto.builder().
                mangerId("멤버1").
                title("title").description("설명").capacity(10).constraints(RoomConstraints.FREE).type(RoomType.PERMANENT).
                build();
        // 생성된 방의 id
        Long roomId = roomService.createRoom(reqR).getId();

        // 가입할 멤버 생성
        Member member = Member.builder().memberId("member1").email("ee").name("ss").nickname("ss").password("ss").build();
        em.persist(member);
        em.flush();
        em.clear();

        // when
        // 멤버를 방에 가입시킴
        log.info("멤버 방 가입");
        RoomJoinRequestDto req = new RoomJoinRequestDto("member1");
        roomService.joinMember(req, "멤버1", roomId);

        //assert
        Room room = roomRepository.findByIdAndIsDeletedFalse(roomId).get();
        assertThat(room.getRoomMembers().get(0).getMember().getMemberId()).isEqualTo("멤버1");
        assertThat(room.getRoomMembers().get(1).getMember().getMemberId()).isEqualTo("member1");
        assertThat(room.getRoomMembers().size()).isEqualTo(2);
        assertThat(room.getRoomMembers().get(0).getRoom().getTitle()).isEqualTo("title");
        assertThat(room.getMcount()).isEqualTo(2);

        RoomJoinRequestDto req2 = new RoomJoinRequestDto("멤버2");
        roomService.joinMember(req2, "멤버1", roomId);
        assertThat(room.getRoomMembers().size()).isEqualTo(3);
        assertThat(room.getRoomMembers().get(0).getRoom().getTitle()).isEqualTo("title");
        assertThat(room.getMcount()).isEqualTo(3);

        // leave
        log.info("멤버 방 나가기");
        roomService.leaveRoom("member1", roomId);
        room = roomRepository.findByIdAndIsDeletedFalse(roomId).get(); // 다시 가져와야?
        // assert
        assertThat(room.getRoomMembers().size()).isEqualTo(2);
        assertThat(room.getMcount()).isEqualTo(2);
    }


}