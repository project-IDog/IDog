package com.haru.ppobbi.domain.grave.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum GraveResponseMessage implements ResponseMessage {
    CREATE_SUCCESS("무덤 생성 완료"),
    CREATE_FAIL_NO_DOG("강아지 조회 실패"),
    CREATE_FAIL_NO_USER("사용자 조회 실패"),
    CREATE_FAIL_ALREADY_DEAD("장례식은 한번이면 충분해요"),
    READ_SUCCESSS("무덤 조회 성공"),
    READ_FAIL("무덤 조회 실패");

    private final String message;

    GraveResponseMessage(String message) {
        this.message = message;
    }

    @Override
    public String message() {
        return this.message;
    }
}
