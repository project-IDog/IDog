package com.haru.ppobbi.domain.dog.repo;

import com.haru.ppobbi.domain.dog.entity.Dog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DogRepository extends JpaRepository<Dog, Integer> {

    List<Dog> findAllByUserNoOrderByDogName(Integer userNo);  //cancel은 어떻게 확인함..?

    Dog findDogByDogNo(Integer dogNo);

}
