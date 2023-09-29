package com.haru.ppobbi.domain.admin.dto;

import com.haru.ppobbi.domain.admin.entity.Challenge;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class ChallengeResponseDto {
    @Getter
    @AllArgsConstructor
    @Builder
    public static class ChallengeInfoDto{
        private Integer challengeNo;
        private Integer challengeTypeName;
        private String challengeName;
        private String challengeDesc;
        private Integer challengeCompleteCnt;
        private String challengeImageUrl;
        private String challengeTriggerName;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class ChallengeListDto{
        private Integer challengeNo;
        private String challengeName;
        private String challengeImageUrl;

        public ChallengeListDto(Challenge challenge){
            this.challengeNo = challenge.getChallengeNo();
            this.challengeName = challenge.getChallengeName();
            this.challengeImageUrl = challenge.getChallengeImageUrl();
        }
    }
}
