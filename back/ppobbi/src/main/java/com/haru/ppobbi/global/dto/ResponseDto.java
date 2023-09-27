package com.haru.ppobbi.global.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ResponseDto<T> {

    private String message;
    private T data;

    public static <T> ResponseDto<T> create(ResponseMessage rm){
        return new ResponseDto<>(rm.message(), null);
    }

    public static <T> ResponseDto<T> create(ResponseMessage rm, T data){
        return new ResponseDto<>(rm.message(), data);
    }

    // 예외 처리 용 -> super(string) 이어서
    public static <T> ResponseDto<T> create(String msg){
        return new ResponseDto<>(msg, null);
    }
}
