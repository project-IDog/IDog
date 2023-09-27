package com.haru.ppobbi.domain.grave.repo;

import com.haru.ppobbi.domain.grave.entity.Flower;
import org.springframework.data.repository.CrudRepository;

public interface FlowerRedisRepository extends CrudRepository<Flower, Integer> {
}
