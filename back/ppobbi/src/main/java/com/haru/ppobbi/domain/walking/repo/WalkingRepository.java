package com.haru.ppobbi.domain.walking.repo;

import com.haru.ppobbi.domain.walking.entity.Walking;
import com.haru.ppobbi.domain.walking.entity.WalkingSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface WalkingRepository extends JpaRepository<Walking, Integer> {

    Optional<Walking> findWalkingByDogDogNoAndWalkingStartDateEqualsAndCanceled(Integer dogNo, LocalDateTime walkingStartDate, Integer canceled);

    public List<Walking> findAllByUserNoAndCanceled(Integer userNo, Integer canceled);

    @Query(
        value = "SELECT w.walking_startdate as walkingStartDate, SUM(w.walking_count) as countSum, SUM(w.walking_time) as timeSum " +
                "FROM walkings w " +
                "WHERE w.user_no = :userNo " +
                "GROUP BY w.walking_startdate " +
                "ORDER BY w.walking_startdate DESC",
        nativeQuery = true
    )
    public List<WalkingSummary> findWalkingSummaryByUserNo(@Param("userNo") Integer userNo);

    public List<Walking> findAllByDogDogNoAndCanceled(Integer dogNo, Integer canceled);
}
