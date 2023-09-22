package com.haru.ppobbi.domain.walking.service;

import static com.haru.ppobbi.domain.walking.constant.WalkingResponseMessage.*;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.dog.repo.DogRepository;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.repo.UserRepository;
import com.haru.ppobbi.domain.walking.dto.WalkingRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.walking.dto.WalkingResponseDto;
import com.haru.ppobbi.domain.walking.entity.Walking;
import com.haru.ppobbi.domain.walking.repo.WalkingRepository;
import com.haru.ppobbi.global.constant.BaseConstant;
import com.haru.ppobbi.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WalkingServiceImpl implements WalkingService{
    private final WalkingRepository walkingRepository;
    private final DogRepository dogRepository;
    private final UserRepository userRepository;

    @Override
    public Walking registOrUpdateWalking(String userId, RegistRequestDto registRequestDto) {
        Optional<Walking> optionalWalking = walkingRepository.findWalkingByDogDogNoAndWalkingStartDateEqualsAndCanceled(
                registRequestDto.getDogNo(), registRequestDto.getWalkingStartDate(), BaseConstant.NOTCANCELED
        );

        if(optionalWalking.isPresent()){ // 동일한 날, 동일한 강아지의 산책 기록이 존재하면 카운트와 총 산책시간만 업데이트
            Walking walking = optionalWalking.get();
            walking.addCountPlusOne();
            walking.addWalkingTime(registRequestDto.getWalkingTime());
            return walking;
        }else{ // 새로운 강아지 산책 기록 등록
            User user = userRepository.findUserByUserIdAndCanceled(userId, BaseConstant.NOTCANCELED)
                    .orElseThrow(() -> new NotFoundException(CREATE_FAIL_NO_USER.message()));
            Dog dog = dogRepository.findDogByDogNoAndCanceled(registRequestDto.getDogNo(), BaseConstant.NOTCANCELED)
                    .orElseThrow(() -> new NotFoundException(CREATE_FAIL_NO_DOG.message()));
            Walking walking = Walking.builder()
                    .userNo(user.getUserNo())
                    .walkingStartDate(registRequestDto.getWalkingStartDate())
                    .walkingTime(registRequestDto.getWalkingTime()).build();
            walking.setDog(dog);
            return walkingRepository.save(walking);
        }
    }

    @Override
    public List<WalkingResponseDto.WalkingInfoDto> selectWalkingsByUserId(String userId) {
        User user = userRepository.findUserByUserIdAndCanceled(userId, BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(CREATE_FAIL_NO_USER.message()));
        List<Walking> walkingList = walkingRepository.findAllByUserNoAndCanceled(user.getUserNo(), BaseConstant.NOTCANCELED);
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
