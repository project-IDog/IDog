package com.haru.ppobbi.domain.admin.entity;

import com.haru.ppobbi.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;

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
    @Column(name = "challenge_name")
    private String challengeName;
    @Column(name = "challenge_desc")
    private String challengeDesc;
    @Column(name = "challenge_complete_cnt")
    private Integer challengeCompleteCnt;
    @Column(name = "challenge_image_url")
    private String challengeImageUrl;
    @Column(name = "challenge_trigger_name")
    private String challengeTriggerName;

    @Builder
    public Challenge(ChallengeType challengeType, String challengeName, String challengeDesc,
                     Integer challengeCompleteCnt, String challengeImageUrl, String challengeTriggerName){
        this.challengeType = challengeType;
        this.challengeName = challengeName;
        this.challengeDesc = challengeDesc;
        this.challengeCompleteCnt = challengeCompleteCnt;
        this.challengeImageUrl = challengeImageUrl;
        this.challengeTriggerName = challengeTriggerName;
    }
}
