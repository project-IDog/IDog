package com.haru.ppobbi.domain.dog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

public class DogDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class DogInfoDto {
        private Integer userNo;
        private Integer dogNo;
        private String dogName;
        private String dogBreed;
        private LocalDate dogBirthDate;
        private Character dogSex;
        private Integer dogNft;
        private String dogImg;
        private String dogHash;
    }
}
