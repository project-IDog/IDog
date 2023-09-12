package com.haru.ppobbi.domain.dog.dto;

import lombok.*;

import java.time.LocalDateTime;

public class DogRequestDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class DogSaveRequestDto {

        private Integer userNo;
        private String dogName;
        private String dogBreed;
        private LocalDateTime dogBirthDate;
        private Character dogSex;
        private String dogNft;



    }
}
