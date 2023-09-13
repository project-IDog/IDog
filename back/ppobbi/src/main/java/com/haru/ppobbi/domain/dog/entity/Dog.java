package com.haru.ppobbi.domain.dog.entity;

import com.haru.ppobbi.domain.walking.entity.Walking;
import com.haru.ppobbi.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "dogs")
public class Dog extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dog_no")
    private Integer dogNo;

    @Column(name = "user_no")
    private Integer userNo;

    @Column(name = "dog_name")
    private String dogName;

    @Column(name = "dog_breed")
    private String dogBreed;

    @Column(name = "dog_brith_date")
    private LocalDateTime dogBriteDate;

    @Column(name = "dog_is_dead")
    private Integer dogIsDead;

    @Column(name = "dog_death_date")
    private LocalDateTime dogDeathDate;

    @Column(name = "dog_sex")
    private Character dogSex;

    @Column(name = "dog_nft")
    private String dogNft;

    @OneToMany(mappedBy = "dog")
    private List<Walking> walkings = new ArrayList<Walking>();

    public void addWalkings(Walking walking) {
        this.walkings.add(walking);

        //무한루프에 빠지지 않도록 체크
        if(walking.getDog() != this) {
            walking.setDog(this);
        }
    }

    @Builder
    public Dog(Integer userNo, String dogName, String dogBreed, LocalDateTime dogBriteDate, Character dogSex) {
        this.userNo = userNo;
        this.dogName = dogName;
        this.dogBreed = dogBreed;
        this.dogBriteDate = dogBriteDate;
        this.dogSex = dogSex;
    }

    //nft 업데이트



}
