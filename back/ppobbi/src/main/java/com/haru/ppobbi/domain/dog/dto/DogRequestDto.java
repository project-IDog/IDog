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

    //수정은 음 생각해봐야함 -> 수정이된다면 NFT도 수정이 되야하기 때문에


}
