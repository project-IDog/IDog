package com.haru.ppobbi.domain.user.constant;

public enum UserResponseMessage {
    SIGN_UP_SUCCESS("회원가입 완료");

    private final String message;

    UserResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
