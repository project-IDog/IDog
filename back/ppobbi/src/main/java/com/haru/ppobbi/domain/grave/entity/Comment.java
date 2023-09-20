package com.haru.ppobbi.domain.grave.entity;

import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.global.entity.BaseEntity;

import javax.persistence.*;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentNo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_no")
    private User user;

    @Column(name = "grave_no")
    private Integer graveNo;

    @Column(name = "comment_content")
    private String commentContent;

    @Builder
    public Comment(User user, Integer graveNo, String commentContent){
        this.user = user;
        this.graveNo = graveNo;
        this.commentContent = commentContent;
    }
}
