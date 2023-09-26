package com.haru.ppobbi.domain.dog.dto;

import lombok.*;

import java.time.LocalDate;

public class DogRequestDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class DogSaveRequestDto {
        private Integer userNo;
        private String dogName;
        private String dogBreed;
        private LocalDate dogBirthDate;
        private Character dogSex;
        private String dogNft;
        private String dogImg;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class DogOwnerUpdateRequestDto {
        private Integer userNo;
        private Integer dogNo;
    }


}
