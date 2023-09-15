package com.haru.ppobbi.domain.dog.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class DogResponseDto {
    @Getter
    public static class DogProfileResposeDto {
        private final Integer userNo;
        private final String dogName;
        private final String dogBreed;
        private final LocalDateTime dogBirthDate;
        private final Character dogSex;
        private final String dogNft;

        @Builder
        public DogProfileResposeDto(Integer userNo, String dogName, String dogBreed, LocalDateTime dogBirthDate, Character dogSex, String dogNft) {
            this.userNo = userNo;
            this.dogName = dogName;
            this.dogBreed = dogBreed;
            this.dogBirthDate = dogBirthDate;
            this.dogSex = dogSex;
            this.dogNft = dogNft;
        }
    }
}
