package com.haru.ppobbi.domain.photo.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum PhotoResponseMessage implements ResponseMessage {
    CREATE_SUCCESS("사진 등록 완료"),
    CREATE_FAIL_NO_DOG("사진 등록 실패: 강아지 정보 없음"),
    READ_SUCCESS("사진 조회 성공"),
    READ_FAIL("사진 조회 실패"),
    UPDATE_SUCCESS("사진 수정 완료"),
    UPDATE_FAIL("사진 수정 실패"),
    DELETE_SUCCESS("사진 삭제 성공"),
    DELETE_FAIL("사진 삭제 실패"),
    UNAUTHORIZED("인증 실패");

    private final String message;

    PhotoResponseMessage(String message){
        this.message = message;
    }

    @Override
    public String message(){
        return this.message;
    }
}
