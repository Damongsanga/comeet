package com.a506.comeet.app.til.repository;

import com.a506.comeet.app.til.entity.Til;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TilRepository extends JpaRepository<Til, Long>, TilCustomRepository{
}
