package com.haru.ppobbi.domain.challenge.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

public class UserChallengeResponseDto {
    @Getter
    @AllArgsConstructor
    @Builder
    public static class UserChallengeInfoDto{
        private Integer userChallengeNo;
        private String challengeName;
        private String challengeDesc;
        private Integer challengeCompleteCnt;
        private String challengeImageUrl;
        private boolean userChallengeIsComplete;
        private LocalDate completedDate;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class UserChallengeListDto{

    }
}
