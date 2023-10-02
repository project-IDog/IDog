package com.haru.ppobbi.domain.admin.controller;

import static com.haru.ppobbi.domain.admin.constant.ChallengeResponseMessage.*;
import com.haru.ppobbi.domain.admin.dto.ChallengeRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.admin.dto.ChallengeResponseDto.*;
import com.haru.ppobbi.domain.admin.entity.Challenge;
import com.haru.ppobbi.domain.admin.service.ChallengeService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/challenge")
public class ChallengeController {
    private final ChallengeService challengeService;

    @PostMapping()
    public ResponseEntity<ResponseDto<String>> registChallenge(@RequestBody RegistRequestDto registRequestDto){
        Challenge challenge = challengeService.registChallenge(registRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseDto.create(CREATE_SUCCESS));
    }

    @GetMapping()
    public ResponseEntity<ResponseDto<List<ChallengeListDto>>> getChallenges(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, challengeService.selectChallenges()));
    }

    @GetMapping("/{challengeNo}")
    public ResponseEntity<ResponseDto<ChallengeInfoDto>> getChallenge(@PathVariable("challengeNo") Integer challengeNo){
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(READ_SUCCESS, challengeService.selectChallengeInfo(challengeNo)));
    }
}
