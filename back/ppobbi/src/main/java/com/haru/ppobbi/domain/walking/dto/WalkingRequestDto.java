package com.haru.ppobbi.domain.walking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class WalkingRequestDto {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RegistRequestDto{
        private Integer dogNo;
        private LocalDate walkingStartDate;
        private Integer walkingTime;
    }
}
