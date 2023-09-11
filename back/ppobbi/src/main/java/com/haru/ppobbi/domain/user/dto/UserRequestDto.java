package com.haru.ppobbi.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

public class UserRequestDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SignUpRequestDto {

        private OAuth2AuthenticationToken authToken;
    }
}
