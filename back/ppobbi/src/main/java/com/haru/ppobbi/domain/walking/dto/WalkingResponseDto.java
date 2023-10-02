package com.haru.ppobbi.domain.walking.dto;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.walking.entity.Walking;
import com.haru.ppobbi.domain.walking.entity.WalkingSummary;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class WalkingResponseDto {
    @Getter
    @AllArgsConstructor
    @Builder
    public static class WalkingInfoDto{
        private Integer walkingNo;
        private Integer dogNo;
        private String dogName;
        private LocalDate walkingStartDate;
        private Integer walkingCount;
        private Integer walkingTime;

        public WalkingInfoDto(Walking walking){
            this.walkingNo = walking.getWalkingNo();
            this.dogNo = walking.getDog().getDogNo();
            this.dogName = walking.getDog().getDogName();
            this.walkingStartDate = walking.getWalkingStartDate().toLocalDate();
            this.walkingCount = walking.getWalkingCount();
            this.walkingTime = walking.getWalkingTime();
        }
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class WalkingSummaryDto{
        private LocalDate walkingStartDate;
        private Integer countSum;
        private Integer timeSum;

        public WalkingSummaryDto(WalkingSummary walkingSummary){
            this.walkingStartDate = walkingSummary.getWalkingStartDate().toLocalDate();
            this.countSum = walkingSummary.getCountSum();
            this.timeSum = walkingSummary.getTimeSum();
        }
    }
}
