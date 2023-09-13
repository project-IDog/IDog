package com.haru.ppobbi.domain.dog.service;

import com.haru.ppobbi.domain.dog.dto.DogRequestDto.DogSaveRequestDto;
import com.haru.ppobbi.domain.dog.entity.Breed;
import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.dog.repo.BreedRepository;
import com.haru.ppobbi.domain.dog.repo.DogRepository;
import com.haru.ppobbi.global.constant.BaseConstant;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DogServiceeImpl implements DogService{

    private final DogRepository dogRepository;
    private final BreedRepository breedRepository;

    @Override
    public Dog registDog(DogSaveRequestDto dogSaveRequestDto) {
        Dog dog = Dog.builder()
                    .userNo(dogSaveRequestDto.getUserNo())
                    .dogName(dogSaveRequestDto.getDogName())
                    .dogBreed(dogSaveRequestDto.getDogBreed())
                    .dogBriteDate(dogSaveRequestDto.getDogBirthDate())
                    .dogSex(dogSaveRequestDto.getDogSex())
                    .build();

        dogRepository.save(dog);
        return dog;
    }

    @Override
    public List<Dog> selectDogsByUserNo(Integer userNo) {
        List<Dog> dogList = dogRepository.findAllByUserNoAndCanceledOrderByDogName(userNo, BaseConstant.NOTCANCELED);
        return dogList;
    }

    @Override
    public Dog selectDogByDogNo(Integer dogNo) {
        Dog dog = dogRepository.findDogByDogNoAndCanceled(dogNo, BaseConstant.NOTCANCELED);
        return dog;
    }

    @Override
    public List<Breed> selectAllBreeds() {
        List<Breed> breedList = breedRepository.findAll();
        return breedList;
    }

    @Override
    public List<Breed> selectAllBreedsByKeyword(String keyword) {
        List<Breed> breedList = breedRepository.searchBreedsByBreedNameLikeOrderByBreedName(keyword);
        return breedList;
    }

}
