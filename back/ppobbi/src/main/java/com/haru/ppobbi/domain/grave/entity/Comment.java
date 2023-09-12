package com.haru.ppobbi.domain.grave.entity;

import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.global.entity.BaseEntity;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grave_no")
    private Grave grave;

    private String commentContent;

    @Builder
    public Comment(Integer commentNo, User user, Grave grave, String commentContent) {
        this.commentNo = commentNo;
        this.user = user;
        this.grave = grave;
        this.commentContent = commentContent;
    }
}
