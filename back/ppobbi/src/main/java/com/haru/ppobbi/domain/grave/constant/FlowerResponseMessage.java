package com.haru.ppobbi.domain.grave.constant;

import com.haru.ppobbi.global.dto.ResponseMessage;

public enum FlowerResponseMessage implements ResponseMessage {
    CREATE_SUCCESS("헌화 등록 성공"),
    READ_SUCCESS("헌화 조회 성공");

    private final String message;

    FlowerResponseMessage(String message){
        this.message = message;
    }

    @Override
    public String message() {
        return this.message;
    }
}
