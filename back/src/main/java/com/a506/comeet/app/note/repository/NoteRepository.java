package com.a506.comeet.app.note.repository;

import com.a506.comeet.app.note.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long>, NoteCustomRepository {
}
