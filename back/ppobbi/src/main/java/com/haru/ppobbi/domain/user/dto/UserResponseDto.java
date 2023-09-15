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

    @Getter
    @AllArgsConstructor
    @Builder
    public static class UserInfoResponseDto {

        private String userId;
        private String userName;
        private String userWallet;
        private String userMessage;
        private String userProfileImg;
        private String userPrivateKey;
    }
}
