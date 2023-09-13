package com.haru.ppobbi.domain.photo.service;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.dog.repo.DogRepository;
import com.haru.ppobbi.domain.photo.dto.PhotoRequestDto;
import com.haru.ppobbi.domain.photo.entity.Photo;
import com.haru.ppobbi.domain.photo.repo.PhotoRepository;
import com.haru.ppobbi.global.constant.BaseConstant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService{
    private final PhotoRepository photoRepository;
    private final DogRepository dogRepository;
    @Override
    public Photo registPhoto(PhotoRequestDto photoRequestDto) {
        // 개 가져오기
        Dog dog = dogRepository.findDogByDogNoAndCanceled(photoRequestDto.getDogNo(), BaseConstant.NOTCANCELED);
        Photo photo = Photo.builder()
                .dog(dog)
                .userNo(photoRequestDto.getUserNo())
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
        Optional<Photo> photo = photoRepository.findById(photoNo);
        if(photo.isPresent()){
            Photo entity = photo.get();
            entity.setCanceled(BaseConstant.CANCELED);
            photoRepository.save(entity);
        }
    }
}
