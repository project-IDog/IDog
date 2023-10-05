package com.haru.ppobbi.domain.dog.service;

import com.haru.ppobbi.domain.dog.dto.DogDto.DogInfoDto;
import com.haru.ppobbi.domain.dog.dto.DogRequestDto.DogOwnerUpdateRequestDto;
import com.haru.ppobbi.domain.dog.dto.DogRequestDto.DogSaveRequestDto;
import com.haru.ppobbi.domain.dog.dto.DogResponseDto.DogisDeadResponseDto;
import com.haru.ppobbi.domain.dog.dto.DogResponseDto.DogisAliveResponseDto;
import com.haru.ppobbi.domain.dog.dto.DogResponseDto.DogNftResponseDto;
import com.haru.ppobbi.domain.dog.dto.DogResponseDto.DogProfileResposeDto;
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

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.haru.ppobbi.domain.dog.constant.DogResponseMessage.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class DogServiceImpl implements DogService{

    private final DogRepository dogRepository;
    private final BreedRepository breedRepository;

    @Override
    public Dog registDog(Integer userNo, DogSaveRequestDto dogSaveRequestDto) {
        Dog dog = Dog.builder()
                .userNo(userNo)
                .dogName(dogSaveRequestDto.getDogName())
                .dogBreed(dogSaveRequestDto.getDogBreed())
                .dogBirthDate(dogSaveRequestDto.getDogBirthDate())
                .dogSex(dogSaveRequestDto.getDogSex())
                .dogIsDead(BaseConstant.NOTDEAD)
                .dogNft(dogSaveRequestDto.getDogNft())
                .dogImg(dogSaveRequestDto.getDogImg())
                .build();

        // 유저의 모든 강아지 조회
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
    public List<DogProfileResposeDto> selectDogsByUserNo(Integer userNo) {
        List<Dog> dogList = dogRepository.findAllByUserNoAndCanceledOrderByDogName(userNo, BaseConstant.NOTCANCELED);

        return  dogList.stream()
                .map(DogProfileResposeDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public DogProfileResposeDto selectDogByDogNo(Integer dogNo) {
        Dog dog = dogRepository.findDogByDogNoAndCanceled(dogNo, BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(DOG_NOT_FOUND_EXCEPTION.message()));
        return DogProfileResposeDto.builder()
                .userNo(dog.getUserNo())
                .dogNo(dog.getDogNo())
                .dogName(dog.getDogName())
                .dogBreed(dog.getDogBreed())
                .dogBirthDate(dog.getDogBirthDate())
                .dogSex(dog.getDogSex())
                .dogNft(dog.getDogNft())
                .dogImg(dog.getDogImg())
                .build();
    }

    @Override
    public List<Breed> selectAllBreeds() {
        List<Breed> breedList = breedRepository.findAll();
        return breedList;
    }

    @Override
    public List<Breed> selectAllBreedsByKeyword(String keyword) {
        List<Breed> breedList = breedRepository.findBreedsByBreedNameContaining(keyword);
        if(breedList.size() == 0){
            throw new NotFoundException(BREED_NOT_FOUND_EXCEPTION.message());
        }

        return breedList;
    }

    @Override
    public DogNftResponseDto selectDogNftByDogNo(Integer dogNo) {
        Dog dog = dogRepository.findDogByDogNoAndCanceled(dogNo, BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(DOG_NFT_NOT_FOUND_EXCEPTION.message()));
        DogNftResponseDto dogNftResponseDto = DogNftResponseDto.builder()
                                                .dogNo(dog.getDogNo())
                                                .dogNft(dog.getDogNft())
                                                .dogImg(dog.getDogImg())
                                                .build();
        return dogNftResponseDto;
    }

    @Override
    public List<DogNftResponseDto> selectDogNftsByUserNo(Integer userNo) {
        List<Dog> dogList = dogRepository.findAllByUserNoAndCanceledOrderByDogName(userNo, BaseConstant.NOTCANCELED);

        List<DogNftResponseDto> dogNftResponseDtoList = new ArrayList<>();
        for (int i=0; i<dogList.size(); i++){
            DogNftResponseDto dogNft = DogNftResponseDto.builder()
                    .dogNo(dogList.get(i).getDogNo())
                    .dogNft(dogList.get(i).getDogNft())
                    .dogImg(dogList.get(i).getDogImg())
                    .build();
            dogNftResponseDtoList.add(dogNft);
        }

        return dogNftResponseDtoList;
    }

    @Override
    public void updateDogOwner(DogOwnerUpdateRequestDto dogOwnerUpdateRequestDto) {
        Integer nowDogNo = dogOwnerUpdateRequestDto.getDogNo();
        Integer nowUserNo = dogOwnerUpdateRequestDto.getUserNo();
        Dog dog = dogRepository.findDogByDogNoAndCanceled(nowDogNo, BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(DOG_NOT_FOUND_EXCEPTION.message()));
        dog.updateDogOwner(nowUserNo);
    }

    @Override
    public List<DogisAliveResponseDto> selectAliveDogsByUserNo(Integer userNo) {
        List<Dog> dogList = dogRepository.findAllByUserNoAndDogIsDeadAndCanceled(userNo, BaseConstant.NOTDEAD, BaseConstant.NOTCANCELED);

        List<DogisAliveResponseDto> aliveResponseDtoList = new ArrayList<>();
        for (int i=0; i<dogList.size(); i++){
            DogisAliveResponseDto nowDog = DogisAliveResponseDto.builder()
                    .userNo(dogList.get(i).getUserNo())
                    .dogNo(dogList.get(i).getDogNo())
                    .dogName(dogList.get(i).getDogName())
                    .dogBreed(dogList.get(i).getDogBreed())
                    .dogBirthDate(dogList.get(i).getDogBirthDate())
                    .dogIsDead(dogList.get(i).getDogIsDead())
                    .dogSex(dogList.get(i).getDogSex())
                    .dogNft(dogList.get(i).getDogNft())
                    .dogImg(dogList.get(i).getDogImg())
                    .build();
            aliveResponseDtoList.add(nowDog);

        }
        return aliveResponseDtoList;
    }

    @Override
    public List<DogisDeadResponseDto> selectDeadDogsByUserNo(Integer userNo) {
        List<Dog> dogList = dogRepository.findAllByUserNoAndDogIsDeadAndCanceled(userNo, BaseConstant.DEAD, BaseConstant.NOTCANCELED);

        List<DogisDeadResponseDto> deadResponseDtoList = new ArrayList<>();
        for (int i=0; i<dogList.size(); i++){
            DogisDeadResponseDto nowDog = DogisDeadResponseDto.builder()
                    .userNo(dogList.get(i).getUserNo())
                    .dogNo(dogList.get(i).getDogNo())
                    .dogName(dogList.get(i).getDogName())
                    .dogBreed(dogList.get(i).getDogBreed())
                    .dogBirthDate(dogList.get(i).getDogBirthDate())
                    .dogIsDead(dogList.get(i).getDogIsDead())
                    .dogSex(dogList.get(i).getDogSex())
                    .dogNft(dogList.get(i).getDogNft())
                    .dogImg(dogList.get(i).getDogImg())
                    .build();
            deadResponseDtoList.add(nowDog);

        }
        return deadResponseDtoList;
    }



}
