package com.haru.ppobbi.domain.challenge.service;

import com.haru.ppobbi.domain.admin.entity.Challenge;

import java.util.List;

public interface ChallengeService {
    /**
     * 모든 Challenge 조회
     * @author Geon
     * @return {@code List<Challenge>}
     */
    public List<Challenge> selectChallenges();

    /**
     * challengNo를 받아 Challenge 단일 조회
     * @author Geon
     * @param challengeNo 조회할 Challenge 기본 키
     * @return Challenge
     */
    public Challenge selectChallenge(Integer challengeNo);
}
