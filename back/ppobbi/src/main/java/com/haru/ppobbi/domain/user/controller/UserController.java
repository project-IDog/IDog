package com.haru.ppobbi.domain.user.controller;

import static com.haru.ppobbi.domain.user.constant.UserResponseMessage.SIGN_UP_SUCCESS;

import com.haru.ppobbi.domain.user.dto.UserRequestDto.SignUpRequestDto;
import com.haru.ppobbi.domain.user.service.UserService;
import com.haru.ppobbi.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<ResponseDto<?>> signUp(
        @RequestHeader("Authorization") SignUpRequestDto signUpRequestDto) {
        userService.signUp(signUpRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(
            ResponseDto.create(SIGN_UP_SUCCESS)
        );
    }
}
