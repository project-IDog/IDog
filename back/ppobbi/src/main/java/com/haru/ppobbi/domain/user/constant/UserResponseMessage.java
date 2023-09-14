package com.haru.ppobbi.domain.user.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum UserResponseMessage implements ResponseMessage {
    SIGN_UP_SUCCESS("회원가입 완료");

    private final String message;

    UserResponseMessage(String message) {
        this.message = message;
    }

    @Override
    public String message() {
        return this.message;
    }
}
