package com.a506.comeet.app.note.repository;

import com.a506.comeet.app.note.dto.NoteSimpleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NoteCustomRepository {
    Page<NoteSimpleResponseDto> getNoteList(String memberId, Pageable pageable);
    int getUnreadCount(String memberId);
}
