package com.a506.comeet.app.member.repository;

import com.a506.comeet.app.member.dto.MemberDetailResponseDto;
import com.a506.comeet.app.member.dto.MemberSimpleResponseDto;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface MemberCustomRepository {

    Optional<MemberDetailResponseDto> getMemberDetail(String memberId);

    List<MemberSimpleResponseDto> getCurrentMembers(Set<String> currentMemberIdSet);
}
