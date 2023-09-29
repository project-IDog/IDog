package com.haru.ppobbi.domain.admin.repo;

import com.haru.ppobbi.domain.admin.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {
    public Optional<Challenge> findChallengeByChallengeNoAndCanceled(Integer challengeNo, Integer canceled);

    public List<Challenge> findAllByCanceled(Integer canceled);
}
