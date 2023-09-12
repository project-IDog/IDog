package com.haru.ppobbi.domain.user.service;

import com.haru.ppobbi.domain.user.dto.UserRequestDto.SignUpRequestDto;

public interface UserService {
    void signUp(SignUpRequestDto signUpRequestDto);
}
