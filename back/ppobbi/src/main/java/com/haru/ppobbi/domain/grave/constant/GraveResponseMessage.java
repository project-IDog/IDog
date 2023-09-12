package com.haru.ppobbi.domain.grave.constant;

public enum GraveResponseMessage {
    OK("무덤 조회 완료"),
    CREATED("무덤 생성 완료"),
    UNAUTHORIZED("인증 실패");

    private final String message;

    GraveResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
