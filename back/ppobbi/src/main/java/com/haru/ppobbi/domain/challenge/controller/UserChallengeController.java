package com.haru.ppobbi.domain.challenge.controller;

import static com.haru.ppobbi.domain.challenge.constant.ChallengeResponseMessage.*;

import com.haru.ppobbi.domain.challenge.entity.UserChallenge;
import com.haru.ppobbi.domain.challenge.service.UserChallengeService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/userchallenge")
public class UserChallengeController {
    private final UserChallengeService userChallengeService;

    @GetMapping()
    public ResponseEntity<ResponseDto<List<UserChallenge>>> getAllUserChallenge(){
        Integer userNo = 1; // 로그인 구현 후 연결 !!
        List<UserChallenge> userChallengeList = userChallengeService.selectUserChallenges(userNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, userChallengeList));
    }

    @GetMapping("/{userChallengeNo}")
    public ResponseEntity<ResponseDto<UserChallenge>> getUserChallengeInfo(@PathVariable Integer userChallengeNo){
        UserChallenge userChallenge = userChallengeService.selectUserChallenge(userChallengeNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, userChallenge));
    }
}
