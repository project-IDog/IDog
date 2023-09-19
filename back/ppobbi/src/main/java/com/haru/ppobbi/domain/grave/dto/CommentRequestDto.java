package com.haru.ppobbi.domain.grave.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class CommentRequestDto {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class RegistRequestDto{
        private Integer graveNo;
        private Integer userNo;
        private String commentContent;
    }

}
