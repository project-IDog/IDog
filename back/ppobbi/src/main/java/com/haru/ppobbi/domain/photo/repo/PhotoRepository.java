package com.haru.ppobbi.domain.photo.repo;

import com.haru.ppobbi.domain.photo.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Integer> {
    /**
     * userNo를 조건으로 하는 모든 Photo 조회
     * @author Geon
     * @param userNo User 기본 키
     * @param canceled 삭제 여부
     * @return {@code List<Photo>}
     */
    public List<Photo> findAllByUserNoAndCanceled(Integer userNo, Integer canceled);

    /**
     * photoNo를 조건으로 하는 Photo 단일 조회
     * @author Geon
     * @param photoNo Photo 기본 키
     * @param canceled 삭제 여부
     * @return Photo
     */
    public Photo findPhotoByPhotoNoAndCanceled(Integer photoNo, Integer canceled);

    /**
     * dogNo를 조건으로 하는 모든 Photo 조회
     * @author Geon
     * @param dogNo Dog 기본 키
     * @param canceled 삭제 여부
     * @return {@code List<Photo>}
     */
    public List<Photo> findAllByDogDogNoAndCanceled(Integer dogNo, Integer canceled);

}
