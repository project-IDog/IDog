package com.haru.ppobbi.domain.user.service;

import com.haru.ppobbi.domain.user.dto.TokenInfo;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.SignUpOrInRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UpdateUserMessageRequestDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.AccessTokenResponseDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.UserInfoResponseDto;

public interface UserService {

    TokenInfo signUpOrIn(SignUpOrInRequestDto signUpRequestDto);

    UserInfoResponseDto getUserInfo(Integer userNo);

    void deleteUser(Integer userNo);

    void updateUserMessage(Integer userNo,
        UpdateUserMessageRequestDto updateUserMessageRequestDto);

    AccessTokenResponseDto reissueAccessToken(Integer userNo);
}
