package com.haru.ppobbi.global.util.oauth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class OAuth2ResponseDto {

    @Builder
    @Getter
    @AllArgsConstructor
    public static class OAuth2TokenInfo {
        private String accessToken;
        private String refreshToken;
    }

}
