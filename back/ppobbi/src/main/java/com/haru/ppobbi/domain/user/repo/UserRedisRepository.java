package com.haru.ppobbi.domain.user.repo;

import com.haru.ppobbi.domain.user.entity.UserInfo;
import org.springframework.data.repository.CrudRepository;

public interface UserRedisRepository extends CrudRepository<UserInfo, Integer> {

}
