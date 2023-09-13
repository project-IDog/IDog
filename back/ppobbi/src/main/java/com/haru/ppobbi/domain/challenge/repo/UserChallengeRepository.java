package com.haru.ppobbi.domain.challenge.repo;

import com.haru.ppobbi.domain.challenge.entity.UserChallenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserChallengeRepository extends JpaRepository<UserChallenge, Integer> {
    /**
     * userNo를 조건으로 하는 UserChallenge 조회
     * @author Geon
     * @param userNo User 기본 키
     * @param canceled 삭제 여부
     * @return {@code List<UserChallenge>}
     */
    public List<UserChallenge> findAllByUserNoaAndCanceled(Integer userNo, Integer canceled);

    /**
     * userChallengeNo를 조건으로 하는 UserChallenge 단일 조회
     * @author Geon
     * @param userChallengeNo UserChallenge 기본 킹
     * @param canceled 삭제 여부
     * @return UserChallenge
     */
    public UserChallenge findUserChallengeByUserChallengeNoAndCanceled(Integer userChallengeNo, Integer canceled);
}
