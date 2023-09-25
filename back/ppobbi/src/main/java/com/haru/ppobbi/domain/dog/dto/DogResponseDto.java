package com.haru.ppobbi.domain.dog.dto;

import com.haru.ppobbi.domain.dog.entity.Dog;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

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
        private final String dogNft;
        private final String dogImg;

        public DogProfileResposeDto(Dog dog) {
            this.userNo = dog.getUserNo();
            this.dogNo = dog.getDogNo();
            this.dogName = dog.getDogName();
            this.dogBreed = dog.getDogBreed();
            this.dogBirthDate = dog.getDogBirthDate();
            this.dogSex = dog.getDogSex();
            this.dogNft = dog.getDogNft();
            this.dogImg = dog.getDogImg();
        }
    }
}
