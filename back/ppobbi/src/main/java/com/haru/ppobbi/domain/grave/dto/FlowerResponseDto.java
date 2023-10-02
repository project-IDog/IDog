package com.haru.ppobbi.domain.grave.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class FlowerResponseDto {
    @Getter
    @AllArgsConstructor
    @Builder
    public static class FlowerInfoDto{
        private Integer count;
    }
}
