package com.haru.ppobbi.domain.photo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


public class PhotoRequestDto {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class RegistRequestDto{
        private Integer dogNo;
        private String photoUrl;
        private String photoComment;
        private Boolean photoIsGoat;
    }

}
