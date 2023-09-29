package com.haru.ppobbi.domain.admin.service;

import com.haru.ppobbi.domain.admin.dto.ChallengeRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.admin.dto.ChallengeResponseDto.*;
import com.haru.ppobbi.domain.admin.entity.Challenge;

import java.util.List;

public interface ChallengeService {
    public Challenge registChallenge(RegistRequestDto registRequestDto);

    public ChallengeInfoDto selectChallengeInfo(Integer challengeNo);

    public List<ChallengeListDto> selectChallenges();
}
