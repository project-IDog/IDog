package com.haru.ppobbi.domain.dog.entity;

import javax.persistence.*;

@Entity
public class Dog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dog_no")
    private Integer dogNo;
}
