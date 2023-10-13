package com.haru.ppobbi.domain.user.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum UserResponseMessage implements ResponseMessage {
    SIGN_IN_SUCCESS("로그인 완료"),
    GET_USER_INFO_SUCCESS("회원 정보 조회 완료"),
    DELETE_USER_SUCCESS("회원 탈퇴 완료"),
    UPDATE_USER_MESSAGE_SUCCESS("회원 상태 메시지 수정 완료"),
    UPDATE_USER_NAME_SUCCESS("회원 이름 수정 완료"),
    REISSUE_ACCESS_TOKEN__SUCCESS("액세스 토큰 발급 완료"),

    UPDATE_USER_WALLET_PW_SUCCESS("회원 디지털지갑 비밀번호 저장 완료"),
    CHECK_USER_WALLET_PW_SUCCESS("회원 디지털지답 비밀번호 확인 성공"),
    CHECK_USER_WALLET_PW_FAIL("회원 디지털지답 비밀번호 확인 실패"),
    UPDATE_USER_ADDRESS_SUCCESS("회원 디지털 지갑 주소 저장 완료")
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
