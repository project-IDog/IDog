package com.haru.ppobbi.domain.challenge.constant;

public enum ChallengeResponseMessage {
    READ_SUCCESS("챌린지 조회 성공"),
    READ_FAIL("챌린지 조회 실패"),
    UNAUTHORIZED("인증 실패");

    private final String message;

    ChallengeResponseMessage(String message){
        this.message = message;
    }

    public String message(){
        return this.message;
    }
}
