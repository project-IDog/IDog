package com.haru.ppobbi.domain.dog.repo;

import com.haru.ppobbi.domain.dog.entity.Dog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DogRepository extends JpaRepository<Dog, Integer> {

    List<Dog> findAllByUserNoAndCanceledOrderByDogName(Integer userNo, Integer isCanceled);

    Optional<Dog> findDogByDogNoAndCanceled(Integer dogNo, Integer isCanceled);

    List<Dog> findAllByUserNoAndDogIsDeadAndCanceled(Integer userNo, Integer isDead, Integer isCanceled);


}
