package com.haru.ppobbi.domain.photo.constant;

public enum PhotoResponseMessage {
    CREATE_SUCCESS("사진 등록 완료"),
    CREATE_FAIL("사진 등록 실패"),
    READ_SUCCESS("사진 조회 성공"),
    READ_FAIL("사진 조회 실패"),
    DELETE_SUCCESS("사진 삭제 성공"),
    DELETE_FAIL("사진 삭제 실패"),
    UNAUTHORIZED("인증 실패");

    private final String message;

    PhotoResponseMessage(String message){
        this.message = message;
    }

    public String message(){
        return this.message;
    }
}
