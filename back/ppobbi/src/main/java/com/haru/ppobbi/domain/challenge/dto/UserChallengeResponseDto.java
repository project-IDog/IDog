package com.haru.ppobbi.domain.challenge.dto;

import com.haru.ppobbi.domain.challenge.entity.UserChallenge;
import com.haru.ppobbi.global.constant.BaseConstant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Objects;

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
        private Integer userChallengeNo;
        private String challengeName;
        private String challengeImageUrl;
        private boolean userChallengeIsComplete;

        public UserChallengeListDto(UserChallenge userChallenge){
            this.userChallengeNo = userChallenge.getUserChallengeNo();
            this.challengeName = userChallenge.getChallenge().getChallengeName();
            this.challengeImageUrl = userChallenge.getChallenge().getChallengeImageUrl();
            this.userChallengeIsComplete = Objects.equals(userChallenge.getUserChallengeIscomplete(), BaseConstant.COMPLETED);
        }
    }
}
