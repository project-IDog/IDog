package com.haru.ppobbi.domain.user.constant;

public enum UserResponseMessage {
    SIGN_IN_SUCCESS("로그인 완료");

    private final String message;

    UserResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
