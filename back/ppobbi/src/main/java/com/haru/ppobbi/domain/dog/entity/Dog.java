package com.haru.ppobbi.domain.dog.entity;

import com.haru.ppobbi.domain.walking.entity.Walking;
import com.haru.ppobbi.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    @Column(name = "dog_birth_date")
    private LocalDate dogBirthDate;

    @Column(name = "dog_is_dead")
    private Integer dogIsDead;

    @Column(name = "dog_death_date")
    private LocalDate dogDeathDate;

    @Column(name = "dog_sex")
    private Character dogSex;

    @Column(name = "dog_nft")
    private String dogNft;

    @Column(name = "dog_img")
    private  String dogImg;

    @OneToMany(mappedBy = "dog")
    private List<Walking> walkings = new ArrayList<Walking>();

    public void addWalkings(Walking walking) {
        this.walkings.add(walking);

        //무한루프에 빠지지 않도록 체크
        if(walking.getDog() != this) {
            walking.setDog(this);
        }
    }

    public void setDogIsDead(Integer dogIsDead){
        this.dogIsDead = dogIsDead;
    }

    public void setDogDeathDate(LocalDate dogDeathDate){
        this.dogDeathDate = dogDeathDate;
    }

    public void updateDogOwner(Integer userNo) {
        this.userNo = userNo;
    }

    @Builder
    public Dog(Integer userNo, String dogName, String dogBreed, LocalDate dogBirthDate, Character dogSex, Integer dogIsDead, String dogNft, String dogImg) {
        this.userNo = userNo;
        this.dogName = dogName;
        this.dogBreed = dogBreed;
        this.dogBirthDate = dogBirthDate;
        this.dogSex = dogSex;
        this.dogIsDead = dogIsDead;
        this.dogNft = dogNft;
        this.dogImg = dogImg;
    }

    @Override
    public boolean equals(Object anotherDog) {
        if (this == anotherDog) return true;
        if (!(anotherDog instanceof Dog)) return false;
        Dog dog = (Dog) anotherDog;
        return Objects.equals(userNo, dog.userNo) && Objects.equals(dogName, dog.dogName) && Objects.equals(dogBreed, dog.dogBreed) && Objects.equals(dogBirthDate, dog.dogBirthDate) && Objects.equals(dogSex, dog.dogSex);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userNo, dogName, dogBreed, dogBirthDate, dogSex);
    }
}
