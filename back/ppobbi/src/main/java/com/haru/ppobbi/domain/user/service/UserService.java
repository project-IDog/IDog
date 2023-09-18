package com.haru.ppobbi.domain.user.service;

import com.haru.ppobbi.domain.user.dto.UserRequestDto.SignUpOrInRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UpdateUserMessageRequestDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.SignUpOrInResponseDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.UserInfoResponseDto;

public interface UserService {

    SignUpOrInResponseDto signUpOrIn(SignUpOrInRequestDto signUpRequestDto);

    UserInfoResponseDto getUserInfo(String userId);

    void deleteUser(String userId);

    void updateUserMessage(String userId,
        UpdateUserMessageRequestDto updateUserMessageRequestDto);
}
