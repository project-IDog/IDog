package com.haru.ppobbi.domain.user.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum UserExceptionMessage implements ResponseMessage {
    USER_NOT_FOUND_EXCEPTION("사용자가 존재하지 않음");

    private final String message;

    UserExceptionMessage(String message) {
        this.message = message;
    }

    @Override
    public String message() {
        return this.message;
    }
}
