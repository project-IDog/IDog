package com.haru.ppobbi.global.util.jwt.constant;

public enum JwtExceptionMessage {
    INVALID_TOKEN("유효하지 않은 토큰"), EXPIRED_TOKEN("만료된 토큰");

    private String message;
    JwtExceptionMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
