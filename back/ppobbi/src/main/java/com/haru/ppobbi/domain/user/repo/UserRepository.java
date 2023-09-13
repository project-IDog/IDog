package com.haru.ppobbi.domain.user.repo;

import com.haru.ppobbi.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserId(String userId);
}
