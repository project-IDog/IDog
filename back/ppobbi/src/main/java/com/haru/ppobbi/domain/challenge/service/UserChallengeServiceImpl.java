package com.haru.ppobbi.domain.challenge.service;

import com.haru.ppobbi.domain.challenge.entity.UserChallenge;
import com.haru.ppobbi.domain.challenge.repo.UserChallengeRepository;
import com.haru.ppobbi.global.constant.BaseConstant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserChallengeServiceImpl implements UserChallengeService{
    private final UserChallengeRepository userChallengeRepository;
    @Override
    public List<UserChallenge> selectUserChallenges(Integer userNo) {
        return userChallengeRepository.findAllByUserNoAndCanceled(userNo, BaseConstant.NOTCANCELED);
    }

    @Override
    public UserChallenge selectUserChallenge(Integer userChallengeNo) {
        return userChallengeRepository.findUserChallengeByUserChallengeNoAndCanceled(userChallengeNo, BaseConstant.NOTCANCELED);
    }
}
