package com.a506.comeet.app.member.repository;

import com.a506.comeet.app.member.dto.MemberSimpleResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface FollowCustomRepository {

    Slice<MemberSimpleResponseDto> getFollowers(Pageable pageable, String memberId, String prevMemberId);
    Slice<MemberSimpleResponseDto> getFollowings(Pageable pageable, String memberId, String prevMemberId);
}
