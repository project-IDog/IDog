package com.haru.ppobbi.domain.walking.service;

import static com.haru.ppobbi.domain.walking.constant.WalkingResponseMessage.*;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.dog.repo.DogRepository;
import com.haru.ppobbi.domain.walking.dto.WalkingRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.walking.dto.WalkingResponseDto;
import com.haru.ppobbi.domain.walking.entity.Walking;
import com.haru.ppobbi.domain.walking.repo.WalkingRepository;
import com.haru.ppobbi.global.constant.BaseConstant;
import com.haru.ppobbi.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WalkingServiceImpl implements WalkingService{
    private final WalkingRepository walkingRepository;
    private final DogRepository dogRepository;

    @Override
    public Walking registWalking(Integer userNo, RegistRequestDto registRequestDto) {
        Dog dog = dogRepository.findDogByDogNoAndCanceled(registRequestDto.getDogNo(), BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(CREATE_FAIL_NO_DOG.message()));
        Walking walking = Walking.builder()
                .userNo(userNo)
                .walkingStarttime(registRequestDto.getWalkingStartTime())
                .walkingEndtime(registRequestDto.getWalkingEndTime())
                .walkingTime(registRequestDto.getWalkingTime()).build();
        walking.setDog(dog);
        return walkingRepository.save(walking);
    }

    @Override
    public List<WalkingResponseDto.WalkingInfoDto> selectWalkingsByUserNo(Integer userNo) {
        List<Walking> walkingList = walkingRepository.findAllByUserNoAndCanceled(userNo, BaseConstant.NOTCANCELED);
        return walkingList.stream()
                .map(WalkingResponseDto.WalkingInfoDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<WalkingResponseDto.WalkingInfoDto> selectWalkingsByDogNo(Integer dogNo) {
        List<Walking> walkingList = walkingRepository.findAllByDogDogNoAndCanceled(dogNo, BaseConstant.NOTCANCELED);
        return walkingList.stream()
                .map(WalkingResponseDto.WalkingInfoDto::new)
                .collect(Collectors.toList());
    }
}
