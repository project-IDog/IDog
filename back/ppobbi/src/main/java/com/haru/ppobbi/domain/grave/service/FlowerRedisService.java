package com.haru.ppobbi.domain.grave.service;

import com.haru.ppobbi.domain.grave.dto.FlowerRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.grave.dto.FlowerResponseDto.FlowerInfoDto;

public interface FlowerRedisService {

    void HoldXToPayRespects(RegistRequestDto registRequestDto);

    FlowerInfoDto countFlowers(Integer graveNo);
}
