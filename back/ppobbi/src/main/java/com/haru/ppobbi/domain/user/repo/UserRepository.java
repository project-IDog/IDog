package com.haru.ppobbi.domain.user.repo;

import com.haru.ppobbi.domain.user.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findUserByUserIdAndCanceled(String userId, Integer canceled);

    Optional<User> findUserByUserNoAndCanceled(Integer userNo, Integer canceled);

}
