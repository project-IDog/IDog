package com.haru.ppobbi.domain.user.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum UserResponseMessage implements ResponseMessage {
    SIGN_IN_SUCCESS("로그인 완료"),
    GET_USER_INFO_SUCCESS("회원 정보 조회 완료"),
    DELETE_USER_SUCCESS("회원 탈퇴 완료"),
    UPDATE_USER_MESSAGE_SUCCESS("회원 상태 메시지 수정 완료"),
    REISSUE_ACCESS_TOKEN__SUCCESS("액세스 토큰 발급 완료")
    ;

    private final String message;

    UserResponseMessage(String message) {
        this.message = message;
    }

    @Override
    public String message() {
        return this.message;
    }
}
