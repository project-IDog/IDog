package com.haru.ppobbi.domain.photo.dto;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.photo.entity.Photo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import net.bytebuddy.asm.Advice;

import java.time.LocalDateTime;

public class PhotoResponseDto {
    @Getter
    @AllArgsConstructor
    @Builder
    public static class PhotoInfoDto{
        private Integer photoNo;
        private Integer userNo;
        private String photoUrl;
        private String photoComment;
        private Integer photoIsGoat;
        private LocalDateTime createDate;
        // Dog 관련 정보들
        private Integer dogNo;
        private String dogName;

        public PhotoInfoDto(Photo photo){
            this.photoNo = photo.getPhotoNo();
            this.userNo = photo.getUserNo();
            this.photoUrl = photo.getPhotoUrl();
            this.photoComment = photo.getPhotoComment();
            this.photoIsGoat = photo.getPhotoIsGoat();
            this.createDate = photo.getCreateDate();
            // Dog 정보 매핑
            Dog dog = photo.getDog();
            this.dogNo = dog.getDogNo();
            this.dogName = dog.getDogName();
        }
    }
}
