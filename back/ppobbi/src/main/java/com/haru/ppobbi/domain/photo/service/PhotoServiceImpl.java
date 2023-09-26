package com.haru.ppobbi.domain.photo.service;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.dog.repo.DogRepository;
import com.haru.ppobbi.domain.photo.constant.PhotoResponseMessage;
import com.haru.ppobbi.domain.photo.dto.PhotoRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.photo.dto.PhotoResponseDto.PhotoInfoDto;
import com.haru.ppobbi.domain.photo.entity.Photo;
import com.haru.ppobbi.domain.photo.repo.PhotoRepository;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.repo.UserRepository;
import com.haru.ppobbi.global.constant.BaseConstant;
import com.haru.ppobbi.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.haru.ppobbi.domain.dog.constant.DogResponseMessage.DOG_NOT_FOUND_EXCEPTION;

@Service
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService{
    private final PhotoRepository photoRepository;
    private final DogRepository dogRepository;
    private final UserRepository userRepository;
    @Override
    public Photo registPhoto(Integer userNo, RegistRequestDto registRequestDto) {
        // 개 가져오기
        Dog dog = dogRepository.findDogByDogNoAndCanceled(registRequestDto.getDogNo(), BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(DOG_NOT_FOUND_EXCEPTION.message()));
        Photo photo = Photo.builder()
                .dog(dog)
                .userNo(dog.getUserNo())
                .photoUrl(registRequestDto.getPhotoUrl())
                .photoComment(registRequestDto.getPhotoComment())
                .photoIsGoat(registRequestDto.getPhotoIsGoat())
                .build();
        return photoRepository.save(photo);
    }

    @Override
    public PhotoInfoDto selectPhoto(Integer photoNo) {
        Photo photo = photoRepository.findPhotoByPhotoNoAndCanceled(photoNo, BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(PhotoResponseMessage.READ_FAIL.message()));
        Dog dog = photo.getDog();
        return PhotoInfoDto.builder()
                .photoNo(photo.getPhotoNo())
                .userNo(photo.getUserNo())
                .photoUrl(photo.getPhotoUrl())
                .photoComment(photo.getPhotoComment())
                .photoIsGoat(photo.getPhotoIsGoat())
                .createDate(photo.getCreateDate())
                .dogNo(dog.getDogNo())
                .dogName(dog.getDogName())
                .build();
    }

    @Override
    public List<PhotoInfoDto> selectPhotosByUserNo(Integer userNO) {
        List<Photo> photoList = photoRepository.findAllByUserNoAndCanceled(userNO, BaseConstant.NOTCANCELED);
        return photoList.stream()
                .map(PhotoInfoDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<PhotoInfoDto> selectPhotosByDogNo(Integer dogNo) {
        List<Photo> photoList = photoRepository.findAllByDogDogNoAndCanceled(dogNo, BaseConstant.NOTCANCELED);
        return photoList.stream()
                .map(PhotoInfoDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public void deletePhoto(Integer photoNo) {
        Photo photo =photoRepository.findPhotoByPhotoNoAndCanceled(photoNo, BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(PhotoResponseMessage.DELETE_FAIL.message()));
        photo.setCanceled(BaseConstant.CANCELED);
        photoRepository.save(photo);
    }

    @Override
    public Photo setGoatPhoto(Integer photoNo) {
        Photo photo = photoRepository.findPhotoByPhotoNoAndCanceled(photoNo, BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(PhotoResponseMessage.UPDATE_FAIL.message()));

        if(photo.getPhotoIsGoat().equals(BaseConstant.GOAT)){
            photo.setPhotoIsGoat(BaseConstant.NOTGOAT);
        }else{
            photo.setPhotoIsGoat(BaseConstant.GOAT);
        }

        return photoRepository.save(photo);
    }
}
