package com.haru.ppobbi.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class UserRequestDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SignUpOrInRequestDto {
        private String authorizationCode;
        private String idToken;
        private String accessToken;
        private String refreshToken;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateUserInfoRequestDto {
        private String userName;
        private String userProfileImg;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateUserRefreshTokenDto {
        private String refreshToken;
    }

}
