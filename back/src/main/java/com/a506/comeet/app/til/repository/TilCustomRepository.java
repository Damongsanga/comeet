package com.a506.comeet.app.til.repository;

import com.a506.comeet.app.til.dto.TilListResponseDto;
import com.a506.comeet.app.til.dto.TilSearchRequestDto;

import java.time.LocalDate;

public interface TilCustomRepository {

    boolean tilWithMemberAndDateExists(String memberId, LocalDate date);

    TilListResponseDto tilWithSearchRequest(TilSearchRequestDto req, String memberId);
}
