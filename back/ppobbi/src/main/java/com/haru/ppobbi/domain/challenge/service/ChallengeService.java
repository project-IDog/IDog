package com.haru.ppobbi.domain.challenge.service;

import com.haru.ppobbi.domain.challenge.entity.Challenge;
import com.haru.ppobbi.domain.challenge.entity.UserChallenge;

import java.util.List;

public interface ChallengeService {

    public List<Challenge> selectChallenges();

    public Challenge selectChallenge(Integer challengeNo);

    public List<UserChallenge> selectUserChallenges(Integer userNo);

    public UserChallenge selectUserChallenge(Integer userNo, Integer challengeNo);
}
