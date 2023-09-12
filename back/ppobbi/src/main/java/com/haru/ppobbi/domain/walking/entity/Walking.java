package com.haru.ppobbi.domain.walking.entity;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.global.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    @Column(name = "dog_no")
    private Integer dogNo;

    @Column(name = "walking_starttime")
    private Integer walkingStarttime;

    @Column(name = "walking_endtime")
    private Integer walkingEndtime;

    @Column(name = "walking_time")
    private Integer walkingTime;

    @ManyToOne
    @JoinColumn(name = "dog_no")
    private Dog dog;

    public void setDog(Dog dog) {
        this.dog = dog;

        //무한루프에 빠지지 않도록 체크
        if(!dog.getWalkings().contains(this)){
            dog.getWalkings().add(this);
        }

    }


}
