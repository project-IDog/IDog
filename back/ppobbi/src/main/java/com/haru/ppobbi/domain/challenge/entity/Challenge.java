package com.haru.ppobbi.domain.challenge.entity;

import com.haru.ppobbi.global.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "challenges")
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Challenge extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "challenge_no")
    private Integer challengeNo;
    @ManyToOne
    @JoinColumn(name = "challenge_type_no")
    private ChallengeType challengeType;
    @Column(name = "challeng_name")
    private String challengeName;
    @Column(name = "challenge_desc")
    private String challengeDesc;
    @Column(name = "challenge_complete_cnt")
    private Integer challengeCompleteCnt;
    @Column(name = "challenge_complete_time")
    private LocalDateTime challengeCompleteTime;
    @Column(name = "challenge_image_url")
    private String challengeImageUrl;
}
