package com.haru.ppobbi.domain.user.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.SignUpOrInRequestDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import org.json.simple.parser.ParseException;

public interface UserService {

    void signUpOrIn(SignUpOrInRequestDto signUpRequestDto)
        throws ParseException, JsonProcessingException;

    UserInfoResponseDto getUserInfo(String accessToken);
}
