package com.haru.ppobbi.domain.grave.entity;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Table(name = "graves")
public class Grave extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int graveNo;
    private Dog dog;

    private User user;
}
