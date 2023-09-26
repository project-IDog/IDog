package com.haru.ppobbi.domain.challenge.service;

import com.haru.ppobbi.domain.admin.entity.Challenge;
import com.haru.ppobbi.domain.challenge.dto.UserChallengeResponseDto.*;
import com.haru.ppobbi.domain.challenge.entity.UserChallenge;
import com.haru.ppobbi.domain.challenge.repo.UserChallengeRepository;
import com.haru.ppobbi.global.constant.BaseConstant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserChallengeServiceImpl implements UserChallengeService{
    private final UserChallengeRepository userChallengeRepository;
    @Override
    public List<UserChallengeListDto> selectUserChallenges(Integer userNo) {
        List<UserChallenge> userChallengeList = userChallengeRepository.findAllByUserNoAndCanceled(userNo, BaseConstant.NOTCANCELED);
        return userChallengeList.stream()
                .map(UserChallengeListDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public UserChallengeInfoDto selectUserChallenge(Integer userChallengeNo) {
        UserChallenge userChallenge = userChallengeRepository.findUserChallengeByUserChallengeNoAndCanceled(userChallengeNo, BaseConstant.NOTCANCELED);
        Challenge challenge = userChallenge.getChallenge();
        return UserChallengeInfoDto.builder()
                .userChallengeNo(userChallenge.getUserChallengeNo())
                .challengeName(challenge.getChallengeName())
                .challengeDesc(challenge.getChallengeDesc())
                .challengeCompleteCnt(challenge.getChallengeCompleteCnt())
                .challengeImageUrl(challenge.getChallengeImageUrl())
                .userChallengeIsComplete(Objects.equals(userChallenge.getUserChallengeIscomplete(), BaseConstant.COMPLETED))
                .completedDate(userChallenge.getCompletedDate().toLocalDate())
                .build();
    }
}
