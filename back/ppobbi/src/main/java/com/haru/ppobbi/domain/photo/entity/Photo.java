package com.haru.ppobbi.domain.photo.entity;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.global.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "photos")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Photo extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer photoNo;
    @ManyToOne
    @JoinColumn(name = "dog_no")
    private Dog dog;
    @Column(name = "user_no")
    private Integer userNo;
    @Column(name = "photo_url")
    private String photoUrl;
    @Column(name = "photo_comment")
    private String photoComment;

    @Builder
    public Photo(Dog dog, Integer userNo, String photoUrl, String photoComment){
        this.dog = dog;
        this.userNo = userNo;
        this.photoUrl = photoUrl;
        this.photoComment = photoComment;
    }
}
