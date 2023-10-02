package com.haru.ppobbi.domain.walking.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum WalkingResponseMessage implements ResponseMessage {

    UPDATE_SUCCESS("산책 기록 수정 성공"),
    CREATE_SUCCESS("산책 기록 등록 성공"),
    CREATE_FAIL_NO_DOG("산책 기록 등록 실패: 노 독"),
    CREATE_FAIL_NO_USER("산책 기록 등록 실패: 사용자 없음"),
    READ_SUCCESS("산책 기록 조회 성공"),
    READ_FAIL("산책 기록 조회 실패");

    private final String message;

    WalkingResponseMessage(String message){this.message = message;}
    @Override
    public String message() {
        return this.message;
    }
}
