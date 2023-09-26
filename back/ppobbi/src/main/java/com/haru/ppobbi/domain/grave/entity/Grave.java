package com.haru.ppobbi.domain.grave.entity;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "graves")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Grave extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grave_no")
    private Integer graveNo;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "dog_no")
    private Dog dog;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_no")
    private User user;

    @Builder
    public Grave(Dog dog, User user){
        this.dog = dog;
        this.user = user;
    }
}
