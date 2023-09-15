package com.haru.ppobbi.domain.dog.repo;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.global.constant.BaseConstant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DogRepository extends JpaRepository<Dog, Integer> {

    List<Dog> findAllByUserNoAndCanceledOrderByDogName(Integer userNo, Integer isCanceled);

    Dog findDogByDogNoAndCanceled(Integer dogNo, Integer isCanceled);



}
