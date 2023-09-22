package com.haru.ppobbi.domain.walking.controller;

import static com.haru.ppobbi.domain.walking.constant.WalkingResponseMessage.*;
import com.haru.ppobbi.domain.walking.dto.WalkingRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.walking.dto.WalkingResponseDto.WalkingInfoDto;
import com.haru.ppobbi.domain.walking.entity.Walking;
import com.haru.ppobbi.domain.walking.service.WalkingService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/walking")
public class WalkingController {
    private WalkingService walkingService;

    @PostMapping()
    public ResponseEntity<ResponseDto<String>> registOrUpdateWalking(@RequestAttribute("userId") String userId, RegistRequestDto registRequestDto){
        Walking walking = walkingService.registOrUpdateWalking(userId, registRequestDto);
        return (walking.getWalkingCount() == 1) ?
                ResponseEntity.status(HttpStatus.CREATED).body(ResponseDto.create(CREATE_SUCCESS)) :
                ResponseEntity.status(HttpStatus.OK).body(ResponseDto.create(UPDATE_SUCCESS));
    }

    @GetMapping()
    public ResponseEntity<ResponseDto<List<WalkingInfoDto>>> getWalkingInfoByUser(@RequestAttribute("userId") String userId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, walkingService.selectWalkingsByUserId(userId)));
    }

    @GetMapping("/{dogNo}")
    public ResponseEntity<ResponseDto<List<WalkingInfoDto>>> getWalkingInfoByDog(@PathVariable Integer dogNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, walkingService.selectWalkingsByDogNo(dogNo)));
    }
}
