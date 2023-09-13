package com.haru.ppobbi.domain.challenge.service;

import com.haru.ppobbi.domain.challenge.entity.UserChallenge;

import java.util.List;

public interface UserChallengeService {
    /**
     * userNo를 받아 UserChallenge 조회
     * @author Geon
     * @param userNo 조회할 User 기본 키
     * @return {@code List<UserChallenge>}
     */
    public List<UserChallenge> selectUserChallenges(Integer userNo);

    /**
     * userChallengeNo를 받아 UserChallenge 단일 조회
     * @author Geon
     * @param userChallengeNo 조회할 UserChallenge 기본 키
     * @return UserChallenge
     */
    public UserChallenge selectUserChallenge(Integer userChallengeNo);
}
