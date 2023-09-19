package com.haru.ppobbi.domain.grave.dto;

import com.haru.ppobbi.domain.grave.entity.Comment;
import com.haru.ppobbi.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class CommentResponseDto {
    @Getter
    @AllArgsConstructor
    @Builder
    public static class CommentInfoDto{
        private Integer commentNo;
        private Integer graveNo;
        private String commentContent;
        // User 관련 정보들
        private Integer userNo;
        private String userId;
        private String userName;

        public CommentInfoDto(Comment comment){
            this.commentNo = comment.getCommentNo();
            this.graveNo = comment.getGraveNo();
            this.commentContent = comment.getCommentContent();
            // User 정보 매핑
            User user = comment.getUser();
            this.userNo = user.getUserNo();
            this.userId = user.getUserId();
            this.userName = user.getUserName();
        }
    }
}
