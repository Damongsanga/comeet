package com.a506.comeet.member.entity;

import com.a506.comeet.common.enums.MemberAuthority;
import com.a506.comeet.common.enums.MemberFeature;
import com.a506.comeet.member.controller.dto.MemberSigninRequestDto;
import com.a506.comeet.member.controller.dto.MemberUpdateRequestDto;
import com.a506.comeet.common.BaseEntityWithSoftDelete;
import com.a506.comeet.room.entity.RoomMember;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

/**
 * 미완성
 */

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Member extends BaseEntityWithSoftDelete {

    @Id
    @Column(name="member_id")
    private String memberId;
    private String name;
    private String password;
    private String nickname;
    private String link = "default_link_letsgo";
    @Column(name = "profile_image")
    private String profileImage = "default_profile_image_letsgo";
    private String email;
    private String description = "default_description_letsgo";

    @Enumerated(EnumType.STRING)
    private MemberAuthority authority = MemberAuthority.USER;
    @Enumerated(EnumType.STRING)
    private MemberFeature feature = MemberFeature.EARTH;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<RoomMember> roomMembers = new ArrayList<>();

    @Builder
    public Member(String memberId, String name, String password, String nickname, String email) {
        this.memberId = memberId;
        this.name = name;
        this.password = password;
        this.nickname = nickname;
        this.email = email;
    }

    public void updateMember(MemberUpdateRequestDto dto){
        this.name = dto.getName();
        this.password = dto.getPassword();
        this.nickname = dto.getNickname();
        this.link = dto.getLink();
        this.profileImage = dto.getProfileImage();
        this.email = dto.getEmail();
        this.description = dto.getDescription();
        this.feature = dto.getFeature();
    }

    public void addRoomMember(RoomMember roomMember){
        roomMembers.add(roomMember);
    }

    public void removeRoomMember(RoomMember roomMember){
        roomMembers.removeIf(rm -> rm.getMember().getMemberId().equals(roomMember.getMember().memberId) && rm.getRoom().getId().equals(roomMember.getRoom().getId()));
    }




}
