package com.haru.ppobbi.domain.dog.dto;

import lombok.*;

public class DogRequestDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class DogSaveRequestDto {

        private Integer userNo;

        private String dogName;


    }
}
