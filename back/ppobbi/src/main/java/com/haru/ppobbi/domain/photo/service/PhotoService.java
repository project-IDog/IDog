package com.haru.ppobbi.domain.photo.service;

import com.haru.ppobbi.domain.photo.dto.PhotoRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.photo.dto.PhotoResponseDto.PhotoInfoDto;
import com.haru.ppobbi.domain.photo.entity.Photo;

import java.util.List;

public interface PhotoService {
    /**
     * photoRequestDto 객체를 받아 등록
     * @author Geon
     * @param userNo 관련된 User 기본 키
     * @param registRequestDto 등록할 registRequestDto 객체
     * @return Photo
     */
    public Photo registPhoto(Integer userNo, RegistRequestDto registRequestDto);

    /**
     * photoNo를 받아 Photo 조회
     * @author Geon
     * @param photoNo 조회할 Photo 기본 키
     * @return PhotoInfoDto
     */
    public PhotoInfoDto selectPhoto(Integer photoNo);

    /**
     * userNo를 받아 모든 Photo 조회
     * @author Geon
     * @param userNO 조회할 User 기본 키
     * @return {@code List<PhotoInfoDto>}
     */
    public List<PhotoInfoDto> selectPhotosByUserNo(Integer userNO);

    /**
     * dogNo를 받아 모든 Photo 조회
     * @author Geon
     * @param dogNo 조회할 Dog 기본 키
     * @return {@code List<PhotoInfoDto>}
     */
    public List<PhotoInfoDto> selectPhotosByDogNo(Integer dogNo);

    /**
     * photoNo를 받아 Photo 삭제
     * @author Geon
     * @param photoNo 삭제할 Photo 기본 키
     */
    public void deletePhoto(Integer photoNo);

    /**
     * photoNo를 받아 goat 설정 값을 반대로 설정
     * @author Geon
     * @param photoNo goat 설정할 Photo 기본 키
     * @return Photo
     */
    public Photo setGoatPhoto(Integer photoNo);
}
