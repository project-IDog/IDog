package com.haru.ppobbi.domain.admin.repo;

import com.haru.ppobbi.domain.admin.entity.ChallengeType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChallengeTypeRepository extends JpaRepository<ChallengeType, Integer> {
    public Optional<ChallengeType> findChallengeTypeByChallengeTypeNoAndCanceled(Integer challengeTypeNo, Integer canceled);

    public Optional<ChallengeType> findChallengeTypeByChallengeTypeNameAndCanceled(String challengeTypeName, Integer canceled);

    public List<ChallengeType> findAllByCanceled(Integer canceled);
}
