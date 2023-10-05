package com.haru.ppobbi.domain.dog.dto;

import com.haru.ppobbi.domain.dog.entity.Dog;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class DogResponseDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class DogProfileResposeDto {

        private final Integer userNo;
        private final Integer dogNo;
        private final String dogName;
        private final String dogBreed;
        private final LocalDate dogBirthDate;
        private final Character dogSex;
        private final Integer dogNft;
        private final String dogImg;
        private final LocalDateTime createDate;

        public DogProfileResposeDto(Dog dog) {
            this.userNo = dog.getUserNo();
            this.dogNo = dog.getDogNo();
            this.dogName = dog.getDogName();
            this.dogBreed = dog.getDogBreed();
            this.dogBirthDate = dog.getDogBirthDate();
            this.dogSex = dog.getDogSex();
            this.dogNft = dog.getDogNft();
            this.dogImg = dog.getDogImg();
            this.createDate = dog.getCreateDate();

        }

    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class DogNftResponseDto {

        private Integer dogNo;
        private Integer dogNft;
        private String dogImg;

    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class DogisAliveResponseDto {

        private Integer userNo;
        private Integer dogNo;
        private String dogName;
        private String dogBreed;
        private LocalDate dogBirthDate;
        private Integer dogIsDead;
        private Character dogSex;
        private Integer dogNft;
        private String dogImg;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class DogisDeadResponseDto {
        private Integer userNo;
        private Integer dogNo;
        private String dogName;
        private String dogBreed;
        private LocalDate dogBirthDate;
        private Integer dogIsDead;
        private Character dogSex;
        private Integer dogNft;
        private String dogImg;
    }


}
