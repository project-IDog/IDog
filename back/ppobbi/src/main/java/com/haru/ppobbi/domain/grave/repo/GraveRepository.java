package com.haru.ppobbi.domain.grave.repo;

import com.haru.ppobbi.domain.grave.entity.Grave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GraveRepository extends JpaRepository<Grave, Integer> {
    /**
     * graveNo를 조건으로 하는 Grave 조회
     * @author Geon
     * @param graveNo Grave 기본 키
     * @return Grave
     */
    public Grave findGraveByGraveNo(Integer graveNo);

    /**
     * userNo를 조건으로 하는 모든 Grave 조회
     * @author Geon
     * @param userNo User 기본 키
     * @return {@code List<Grave>}
     */
    public List<Grave> findAllByUserUserNo(Integer userNo);
}
