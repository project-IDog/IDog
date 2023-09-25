package com.haru.ppobbi.domain.challenge.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Integer> {
    /**
     * 모든 Challenge 조회
     * @author Geon
     * @param canceled 삭제 여부
     * @return {@code List<Challenge>}
     */
    public List<Challenge> findAllByCanceled(Integer canceled);

    /**
     * challengeNo를 조건으로 하는 Challenge 단일 조회
     * @author Geon
     * @param challengeNo Challeng 기본 키
     * @param canceled 삭제 여부
     * @return Challenge
     */
    public Challenge findChallengeByChallengeNoAndCanceled(Integer challengeNo, Integer canceled);
}
