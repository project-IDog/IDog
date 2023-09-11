package com.haru.ppobbi.domain.grave.entity;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.global.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "graves")
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Grave extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grave_no")
    private Integer graveNo;
    @OneToOne
    @JoinColumn(name = "dog_no")
    private Dog dog;
    @ManyToOne
    @JoinColumn(name = "user_no")
    private User user;
}
