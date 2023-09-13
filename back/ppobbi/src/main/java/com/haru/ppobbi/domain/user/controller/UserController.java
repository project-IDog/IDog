package com.haru.ppobbi.domain.user.controller;

import static com.haru.ppobbi.domain.user.constant.UserResponseMessage.SIGN_IN_SUCCESS;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.SignUpOrInRequestDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.SignUpOrInResponseDto;
import com.haru.ppobbi.domain.user.service.UserService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<ResponseDto<?>> signUpOrIn(
        @RequestBody SignUpOrInRequestDto signUpRequestDto)
        throws ParseException, JsonProcessingException {
        log.debug("[DEBUG/signUpOrIn] Controller ");
        userService.signUpOrIn(signUpRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(
            ResponseDto.create(SIGN_IN_SUCCESS.getMessage(),
                SignUpOrInResponseDto.builder()
                    .build())
        );
    }
}
