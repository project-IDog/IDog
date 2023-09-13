package com.haru.ppobbi.domain.dog.service;

import com.haru.ppobbi.domain.dog.dto.DogRequestDto.DogSaveRequestDto;
import com.haru.ppobbi.domain.dog.entity.Breed;
import com.haru.ppobbi.domain.dog.entity.Dog;

import java.util.List;

public interface DogService {

    /**
     * DogSaveRequestDto 객체를 받아 등록
     * @author Sunhee
     * @param dogSaveRequestDto 등록할 DogSaveRequestDto 객체
     * @return Dog
     */
    Dog registDog(DogSaveRequestDto dogSaveRequestDto);

    /**
     * userNo를 받아 모든 Dog 조회
     * @author Sunhee
     * @param userNo - User 기본 키
     * @return {@code List<Dog>}
     */
    List<Dog> selectDogsByUserNo(Integer userNo);

    /**
     * dogNo를 받아 특정 Dog 1개 조회
     * @author Sunhee
     * @param dogNo - Dog 기본 키
     * @return {@code Dog}
     */
    Dog selectDogByDogNo(Integer dogNo);

    /**
     * 모든 견종 목록 조회
     * @author Sunhee
     * @return {@code List<Breed>}
     */
    List<Breed> selectAllBreeds();

    /**
     * keyword 받아 검색조건에 해당하는 모든 견종 조회
     * @author Sunhee
     * @param keyword - 클라이언트로부터 받은 String
     * @return {@code List<Breed>}
     */
    List<Breed> selectAllBreedsByKeyword(String keyword);


}
