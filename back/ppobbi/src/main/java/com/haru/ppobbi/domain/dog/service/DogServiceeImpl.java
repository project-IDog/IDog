package com.haru.ppobbi.domain.dog.service;

import com.haru.ppobbi.domain.dog.dto.DogRequestDto.DogSaveRequestDto;
import com.haru.ppobbi.domain.dog.entity.Breed;
import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.dog.repo.BreedRepository;
import com.haru.ppobbi.domain.dog.repo.DogRepository;
import com.haru.ppobbi.global.constant.BaseConstant;
import com.haru.ppobbi.global.error.DuplicatedException;
import com.haru.ppobbi.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.haru.ppobbi.domain.dog.constant.DogResponseMessage.DOG_NOT_FOUND_EXCEPTION;
import static com.haru.ppobbi.domain.dog.constant.DogResponseMessage.DUPLICATED_DOG_EXCEPTION;

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
                .dogIsDead(BaseConstant.NOTDEAD)
                .build();

        // 유저의 모든 강아지 조회
        Integer userNo = dogSaveRequestDto.getUserNo();
        List<Dog> dogList = dogRepository.findAllByUserNoAndCanceledOrderByDogName(userNo, BaseConstant.NOTCANCELED);
        // 이미 같은 정보로 저장된 강아지가 있는지 체크
        for (int i=0; i<dogList.size(); i++){
            if(dogList.get(i).equals(dog)) {
                throw new DuplicatedException(DUPLICATED_DOG_EXCEPTION.message());
            }
        }
        //신규 강아지 등록
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
        Dog dog = dogRepository.findDogByDogNoAndCanceled(dogNo, BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(DOG_NOT_FOUND_EXCEPTION.message()));
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
