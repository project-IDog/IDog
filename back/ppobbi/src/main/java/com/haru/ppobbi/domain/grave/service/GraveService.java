package com.haru.ppobbi.domain.grave.service;

import com.haru.ppobbi.domain.grave.dto.GraveRequestDto;
import com.haru.ppobbi.domain.grave.entity.Grave;

import java.util.List;

public interface GraveService{
    /**
     * GraveRequestDto 객체를 받아 등록
     * @author Geon
     * @param userId 관련된 User 기본 키
     * @param graveRequestDto 등록할 graveRequestDto 객체
     * @return Grave
     */
    public Grave registGrave(String userId, GraveRequestDto graveRequestDto);
    /**
     * graveNo를 받아 Grave 조회
     * @author Geon
     * @param graveNo 조회할 Grave 기본 키
     * @return Grave
     */
    public Grave selectGrave(Integer graveNo);
    /**
     * 모든 Grave 조회
     * @author Geon
     * @return {@code List<Grave>}
     */
    public List<Grave> selectGraves();
    /**
     * userNo를 받아 모든 Grave 조회
     * @author Geon
     * @param userNo - User 기본 키
     * @return {@code List<Grave>}
     */
    public List<Grave> selectGravesByUserNo(Integer userNo);
}
