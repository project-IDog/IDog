package com.haru.ppobbi.domain.user.entity;

import com.haru.ppobbi.domain.user.constant.UserRole;
import com.haru.ppobbi.global.entity.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
    private Integer userNo;

    private String userId;

    private String userName;

    private String userMessage;

    private String userProfileImg;

    @Enumerated(value = EnumType.STRING)
    private UserRole userRole;


    @Builder
    public User(Integer userNo, String userId, String userName,
        String userMessage, String userProfileImg, UserRole userRole) {
        this.userNo = userNo;
        this.userId = userId;
        this.userName = userName;
        this.userMessage = userMessage;
        this.userProfileImg = userProfileImg;
        this.userRole = userRole;
    }

    public void updateUserName(String userName) {
        this.userName = userName;
    }

    public void updateUserMessage(String userMessage) {
        this.userMessage = userMessage;
    }
}
