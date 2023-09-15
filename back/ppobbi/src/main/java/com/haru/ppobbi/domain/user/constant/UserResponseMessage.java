package com.haru.ppobbi.domain.user.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum UserResponseMessage implements ResponseMessage {
    SIGN_IN_SUCCESS("로그인 완료"),
    GET_USER_INFO_SUCCESS("사용자 정보 조회 성공");

    private final String message;

    UserResponseMessage(String message) {
        this.message = message;
    }

    @Override
    public String message() {
        return this.message;
    }
}
