package com.haru.ppobbi.domain.challenge.controller;

import static com.haru.ppobbi.domain.challenge.constant.ChallengeResponseMessage.*;

import com.haru.ppobbi.domain.challenge.dto.UserChallengeResponseDto.*;
import com.haru.ppobbi.domain.challenge.entity.UserChallenge;
import com.haru.ppobbi.domain.challenge.service.UserChallengeService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/challenge")
public class UserChallengeController {
    private final UserChallengeService userChallengeService;

    @GetMapping()
    public ResponseEntity<ResponseDto<List<UserChallengeListDto>>> getAllUserChallenge(@RequestAttribute("userNo") Integer userNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, userChallengeService.selectUserChallenges(userNo)));
    }

    @GetMapping("/{userChallengeNo}")
    public ResponseEntity<ResponseDto<UserChallengeInfoDto>> getUserChallengeInfo(@PathVariable Integer userChallengeNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, userChallengeService.selectUserChallenge(userChallengeNo)));
    }
}
