package com.haru.ppobbi.domain.challenge.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum UserChallengeResponseMessage implements ResponseMessage {
    READ_SUCCESS("챌린지 조회 성공"),
    READ_FAIL("챌린지 조회 실패");

    private final String message;

    UserChallengeResponseMessage(String message){
        this.message = message;
    }

    @Override
    public String message(){
        return this.message;
    }
}
