package com.haru.ppobbi.domain.admin.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum ChallengeResponseMessage implements ResponseMessage {
    CREATE_SUCCESS("챌린지 등록 완료"),
    CREATE_FAIL("챌린지 등록 실패"),
    READ_SUCCESS("챌린지 조회 성공"),
    READ_FAIL_NO_CHALLENGE("챌린지 조회 실패: 해당 챌린진 없음");

    private final String message;

    ChallengeResponseMessage(String message){
        this.message = message;
    }
    @Override
    public String message() {
        return this.message;
    }
}
