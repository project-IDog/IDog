package com.haru.ppobbi.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ChallengeRequestDto {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class RegistRequestDto{
        private String challengeTypeName;
        private String challengeName;
        private String challengeDesc;
        private String challengeImageUrl;
        private String challengeTriggerName;
    }
}
