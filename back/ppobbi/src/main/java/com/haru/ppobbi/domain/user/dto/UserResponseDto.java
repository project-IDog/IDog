package com.haru.ppobbi.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class UserResponseDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class SignUpOrInResponseDto {
        private String grantType;
        private String accessToken;
        private String refreshToken;
    }
}
