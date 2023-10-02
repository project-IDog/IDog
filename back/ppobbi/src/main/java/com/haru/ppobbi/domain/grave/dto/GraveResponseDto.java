package com.haru.ppobbi.domain.grave.dto;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.grave.entity.Grave;
import com.haru.ppobbi.domain.photo.entity.Photo;
import com.haru.ppobbi.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class GraveResponseDto {
    @Getter
    @AllArgsConstructor
    @Builder
    public static class GraveInfoDto{
        private Integer graveNo;
        // User 관련 정보들
        private Integer userNo;
        private String userName;
        // Dog 관련 정보들
        private Integer dogNo;
        private String dogName;
        private LocalDate dogBirthDate;
        private String dogBreed;
        private LocalDate dogDeathDate;
        private Character dogSex;
        private Integer dogNft;
        private String dogImg;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class GraveListDto{
        private Integer graveNo;
        // User 관련 정보들
        private Integer userNo;
        private String userName;
        // Dog 관련 정보들
        private Integer dogNo;
        private String dogName;
        private LocalDate dogBirthDate;
        private String dogBreed;
        private LocalDate dogDeathDate;
        private Character dogSex;
        private Integer dogNft;
        private String dogImg;
        // 앨범 Top 3 정보들
        private List<String> topAlbums;

        public GraveListDto(Grave grave){
            this.graveNo = grave.getGraveNo();
            // User 정보 매핑
            User user = grave.getUser();
            this.userNo = user.getUserNo();
            this.userName = user.getUserName();
            // Dog 정보 매핑
            Dog dog = grave.getDog();
            this.dogNo = dog.getDogNo();
            this.dogName = dog.getDogName();
            this.dogBirthDate = dog.getDogBirthDate();
            this.dogBreed = dog.getDogBreed();
            this.dogDeathDate = dog.getDogDeathDate();
            this.dogSex = dog.getDogSex();
            this.dogNft = dog.getDogNft();
            this.dogImg = dog.getDogImg();
        }

        public void setTopAlbums(List<Photo> topAlbums) {
            this.topAlbums = topAlbums.stream()
                    .map(Photo::getPhotoUrl)
                    .collect(Collectors.toList());
        }
    }
}
