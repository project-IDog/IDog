package com.haru.ppobbi.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class TokenInfo {

    private String grantType;
    private String accessToken;
    private String refreshToken;

}
