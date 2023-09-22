package com.haru.ppobbi.domain.walking.repo;

import com.haru.ppobbi.domain.walking.entity.Walking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalkingRepository extends JpaRepository<Walking, Integer> {
    public List<Walking> findAllByUserNoAndCanceled(Integer userNo, Integer canceled);

    public List<Walking> findAllByDogDogNoAndCanceled(Integer dogNo, Integer canceled);
}
