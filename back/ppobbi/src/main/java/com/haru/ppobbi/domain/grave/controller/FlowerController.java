package com.haru.ppobbi.domain.grave.controller;

import static com.haru.ppobbi.domain.grave.constant.FlowerResponseMessage.*;
import com.haru.ppobbi.domain.grave.dto.FlowerRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.grave.dto.FlowerResponseDto.FlowerInfoDto;
import com.haru.ppobbi.domain.grave.service.FlowerRedisService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/flower")
public class FlowerController {
    private final FlowerRedisService flowerRedisService;

    @PostMapping
    public ResponseEntity<ResponseDto<String>> registFlower(@RequestBody RegistRequestDto registRequestDto){
        flowerRedisService.HoldXToPayRespects(registRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseDto.create(CREATE_SUCCESS));
    }

    @GetMapping("/{graveNo}")
    public ResponseEntity<ResponseDto<FlowerInfoDto>> getCountOfFlowers(@PathVariable("graveNo") Integer graveNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, flowerRedisService.countFlowers(graveNo)));
    }
}
