package com.haru.ppobbi.domain.dog.repo;

import com.haru.ppobbi.domain.dog.entity.Breed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BreedRepository extends JpaRepository<Breed, Integer> {

    List<Breed> findBreedsByBreedNameContaining(String keyword);

}
