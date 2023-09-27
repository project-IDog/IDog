package com.haru.ppobbi.domain.walking.repo;

import com.haru.ppobbi.domain.walking.entity.Walking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface WalkingRepository extends JpaRepository<Walking, Integer> {

    Optional<Walking> findWalkingByDogDogNoAndWalkingStartDateEqualsAndCanceled(Integer dogNo, LocalDateTime walkingStartDate, Integer canceled);

    public List<Walking> findAllByUserNoAndCanceled(Integer userNo, Integer canceled);

    public List<Walking> findAllByDogDogNoAndCanceled(Integer dogNo, Integer canceled);
}
