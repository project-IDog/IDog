package com.haru.ppobbi.domain.photo.service;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.dog.repo.DogRepository;
import com.haru.ppobbi.domain.photo.dto.PhotoRequestDto;
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

import static com.haru.ppobbi.domain.dog.constant.DogResponseMessage.DOG_NOT_FOUND_EXCEPTION;

@Service
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService{
    private final PhotoRepository photoRepository;
    private final DogRepository dogRepository;
    private final UserRepository userRepository;
    @Override
    public Photo registPhoto(String userId, PhotoRequestDto photoRequestDto) {
        // 개 가져오기
        Dog dog = dogRepository.findDogByDogNoAndCanceled(photoRequestDto.getDogNo(), BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(DOG_NOT_FOUND_EXCEPTION.message()));
        User user = userRepository.findUserByUserIdAndCanceled(userId, BaseConstant.NOTCANCELED);
        Photo photo = Photo.builder()
                .dog(dog)
                .userNo(user.getUserNo())
                .photoUrl(photoRequestDto.getPhotoUrl())
                .photoComment(photoRequestDto.getPhotoComment()).build();
        return photoRepository.save(photo);
    }

    @Override
    public Photo selectPhoto(Integer photoNo) {
        return photoRepository.findPhotoByPhotoNoAndCanceled(photoNo, BaseConstant.NOTCANCELED);
    }

    @Override
    public List<Photo> selectPhotosByUserNo(Integer userNO) {
        return photoRepository.findAllByUserNoAndCanceled(userNO, BaseConstant.NOTCANCELED);
    }

    @Override
    public List<Photo> selectPhotosByDogNo(Integer dogNo) {
        return photoRepository.findAllByDogDogNoAndCanceled(dogNo, BaseConstant.NOTCANCELED);
    }

    @Override
    public void deletePhoto(Integer photoNo) {
        Photo photo =photoRepository.findPhotoByPhotoNoAndCanceled(photoNo, BaseConstant.NOTCANCELED);
        if(photo != null){
            photo.setCanceled(BaseConstant.CANCELED);
            photoRepository.save(photo);
        }
    }

    @Override
    public Photo setGoatPhoto(Integer photoNo) {
        Photo photo = photoRepository.findPhotoByPhotoNoAndCanceled(photoNo, BaseConstant.NOTCANCELED);
        if(photo.getPhotoIsGoat().equals(BaseConstant.GOAT)){
            photo.setPhotoIsGoat(BaseConstant.NOTGOAT);
        }else{
            photo.setPhotoIsGoat(BaseConstant.GOAT);
        }
        return photoRepository.save(photo);
    }
}
