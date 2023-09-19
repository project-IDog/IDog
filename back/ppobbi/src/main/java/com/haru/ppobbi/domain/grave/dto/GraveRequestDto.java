package com.haru.ppobbi.domain.grave.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class GraveRequestDto {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RegistRequestDto{
        private Integer dogNo;
    }
}
