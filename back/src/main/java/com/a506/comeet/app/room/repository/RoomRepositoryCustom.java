package com.a506.comeet.app.room.repository;

import com.a506.comeet.app.room.dto.ManagingRoomResponseDto;
import com.a506.comeet.app.room.dto.RoomResponseDto;
import com.a506.comeet.app.room.dto.RoomSearchRequestDto;
import com.a506.comeet.app.room.dto.RoomSearchResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface RoomRepositoryCustom {
    Slice<RoomSearchResponseDto> searchDisposableRoom(RoomSearchRequestDto req, Pageable pageable);

    RoomResponseDto getDetailRoomInfo(Long roomId);

    List<ManagingRoomResponseDto> getManagingRoom(String memberId);

}