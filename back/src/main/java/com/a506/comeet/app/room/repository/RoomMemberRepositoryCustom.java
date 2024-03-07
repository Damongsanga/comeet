package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.dto.RoomSimpleResponseDto;

import java.util.List;

public interface RoomMemberRepositoryCustom {

    List<RoomSimpleResponseDto> getJoinedRooms(String memberId);

}
