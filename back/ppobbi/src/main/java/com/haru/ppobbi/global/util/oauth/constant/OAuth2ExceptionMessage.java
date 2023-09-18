package com.haru.ppobbi.global.util.oauth.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum OAuth2ExceptionMessage implements ResponseMessage {
    INVALID_TOKEN("유효하지 않은 토큰"), EXPIRED_TOKEN("만료된 토큰"), NOTFOUND_TOKEN("토큰 없음");

    private String message;

    OAuth2ExceptionMessage(String message) {
        this.message = message;
    }


    @Override
    public String message() {
        return this.message;
    }
}
