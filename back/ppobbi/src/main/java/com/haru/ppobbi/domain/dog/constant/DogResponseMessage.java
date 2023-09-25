package com.haru.ppobbi.domain.dog.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum DogResponseMessage implements ResponseMessage {
    
    CREATE_DOG("강아지 프로필 등록 완료"),
    READ_ALL_DOG_BY_USER("사용자의 모든 강아지 목록 조회 완료"),
    READ_ONE_DOG("강아지 1마리 상세조회 완료"),
    READ_ALL_BREED("견종 전체 목록 조회 완료"),
    READ_ALL_BREED_BY_KEYWORD("키워드로 검색된 견종 목록 조회 완료"),
    DOG_NOT_FOUND_EXCEPTION("강아지 1마리 상세조회 실패"),
    DUPLICATED_DOG_EXCEPTION("이미 등록된 강아지임"),
    BREED_NOT_FOUND_EXCEPTION("견종 키워드 검색 실패");

    private final String message;

    DogResponseMessage(String message) {
        this.message = message;
    }

    @Override
    public String message() {
        return this.message;
    }
}
