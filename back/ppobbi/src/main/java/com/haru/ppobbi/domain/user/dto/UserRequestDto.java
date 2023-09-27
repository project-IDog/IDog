package com.haru.ppobbi.domain.user.dto;

import com.haru.ppobbi.domain.user.constant.UserRole;
import com.haru.ppobbi.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class UserRequestDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserInfoRequestDto {

        private String userId;
        private String userName;
        private String userProfileImg;
        private UserRole userRole;

        public User toUser() {
            return User.builder()
                .userId(userId)
                .userName(userName)
                .userProfileImg(userProfileImg)
                .userRole(userRole)
                .build();
        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateUserInfoRequestDto {

        private String userName;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateUserRefreshTokenDto {

        private String refreshToken;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateUserWalletInfoRequestDto {

        private String userWallet;
        private String userPrivateKey;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateUserMessageRequestDto {

        private String userMessage;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateUserNameRequestDto {

        private String userName;
    }

}
