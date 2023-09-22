package com.haru.ppobbi.domain.walking.dto;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.walking.entity.Walking;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class WalkingResponseDto {
    @Getter
    @AllArgsConstructor
    @Builder
    private static class WalkingInfoDto{
        private Integer walkingNo;
        private Integer dogNo;
        private String dogName;
        private LocalDateTime walkingStartTime;
        private LocalDateTime walkingEndTime;
        private Integer walkingTime;

        public WalkingInfoDto(Walking walking){
            this.walkingNo = walking.getWalkingNo();
            this.dogNo = walking.getDog().getDogNo();
            this.dogName = walking.getDog().getDogName();
            this.walkingStartTime = walking.getWalkingStarttime();
            this.walkingEndTime = walking.getWalkingEndtime();
            this.walkingTime = walking.getWalkingTime();
        }
    }
}
