package com.haru.ppobbi.domain.walking.service;

import com.haru.ppobbi.domain.walking.dto.WalkingRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.walking.dto.WalkingResponseDto.WalkingInfoDto;
import com.haru.ppobbi.domain.walking.entity.Walking;

import java.util.List;

public interface WalkingService {
    public Walking registOrUpdateWalking(String userId, RegistRequestDto registRequestDto);

    public List<WalkingInfoDto> selectWalkingsByUserNo(String userId);

    public List<WalkingInfoDto> selectWalkingsByDogNo(Integer dogNo);
}
