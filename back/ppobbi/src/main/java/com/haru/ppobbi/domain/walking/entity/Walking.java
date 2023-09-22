package com.haru.ppobbi.domain.walking.entity;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "walkings")
public class Walking extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "walking_no")
    private Integer walkingNo;

    @Column(name = "user_no")
    private Integer userNo;

    @Column(name = "walking_startdate")
    private LocalDate walkingStartDate;

    @Column(name = "walking_count")
    private Integer walkingCount;

    @Column(name = "walking_time")
    private Integer walkingTime;

    @ManyToOne
    @JoinColumn(name = "dog_no")
    private Dog dog;

    @Builder
    public Walking(Integer userNo, LocalDate walkingStartDate, Integer walkingCount, Integer walkingTime){
        this.userNo = userNo;
        this.walkingStartDate = walkingStartDate;
        this.walkingTime = walkingTime;
    }

    public void addCountPlusOne(){
        this.walkingCount++;
    }

    public void addWalkingTime(Integer walkingTime){
        this.walkingTime += walkingTime;
    }

    public void setDog(Dog dog) {
        this.dog = dog;

        //무한루프에 빠지지 않도록 체크
        if(!dog.getWalkings().contains(this)){
            dog.getWalkings().add(this);
        }

    }


}
