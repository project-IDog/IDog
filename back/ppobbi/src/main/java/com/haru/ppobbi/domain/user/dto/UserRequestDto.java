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
        private String idToken;
        private String authorizationCode;
        private String accessToken;
    }
}
