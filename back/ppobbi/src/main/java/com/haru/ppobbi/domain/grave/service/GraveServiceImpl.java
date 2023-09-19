package com.haru.ppobbi.domain.grave.service;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.dog.repo.DogRepository;
import com.haru.ppobbi.domain.grave.constant.GraveResponseMessage;
import com.haru.ppobbi.domain.grave.dto.GraveRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.grave.dto.GraveResponseDto.GraveInfoDto;
import com.haru.ppobbi.domain.grave.entity.Grave;
import com.haru.ppobbi.domain.grave.repo.GraveRepository;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.repo.UserRepository;
import com.haru.ppobbi.global.constant.BaseConstant;
import com.haru.ppobbi.global.error.DuplicatedException;
import com.haru.ppobbi.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.haru.ppobbi.domain.dog.constant.DogResponseMessage.DOG_NOT_FOUND_EXCEPTION;

@Service
@RequiredArgsConstructor
public class GraveServiceImpl implements GraveService{
    private final GraveRepository graveRepository;
    private final DogRepository dogRepository;
    private final UserRepository userRepository;
    @Override
    public Grave registGrave(String userId, RegistRequestDto registRequestDto) {
        // 그 강아지의 주인 가져오기
        User user = userRepository.findUserByUserIdAndCanceled(userId, BaseConstant.NOTCANCELED);
        if(user == null){ //조회된 사용자가 없을 경우
            throw new NotFoundException(GraveResponseMessage.CREATE_FAIL_NO_USER.message());
        }

        // 죽은 강아지 가져오기
        Dog deadDog = dogRepository.findDogByDogNoAndCanceled(registRequestDto.getDogNo(), BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(DOG_NOT_FOUND_EXCEPTION.message()));
        if(deadDog == null){ // 조회된 강아지가 없을 경우
            throw new NotFoundException(GraveResponseMessage.CREATE_FAIL_NO_DOG.message());
        }else if(Objects.equals(deadDog.getDogIsDead(), BaseConstant.DEAD)){ // 강아지가 이미 죽었을 경우
            throw new DuplicatedException(GraveResponseMessage.CREATE_FAIL_ALREADY_DEAD.message());
        }
        // 강아지 사망 판정
        deadDog.setDogIsDead(BaseConstant.DEAD);

        // 새 grave 객체 생성
        Grave grave = Grave.builder()
                .user(user)
                .dog(deadDog)
                .build();
        return graveRepository.save(grave);
    }

    @Override
    public GraveInfoDto selectGrave(Integer graveNo) {
        Grave grave = graveRepository.findGraveByGraveNo(graveNo);
        if(grave == null){
            throw new NotFoundException(GraveResponseMessage.READ_FAIL.message());
        }
        User user = grave.getUser();
        Dog dog = grave.getDog();
        return GraveInfoDto.builder()
                .graveNo(grave.getGraveNo())
                .userNo(user.getUserNo())
                .userName(user.getUserName())
                .dogNo(dog.getDogNo())
                .dogName(dog.getDogName())
                .dogBirthDate(dog.getDogBirthDate())
                .dogDeathDate(dog.getDogDeathDate())
                .dogBreed(dog.getDogBreed())
                .dogSex(dog.getDogSex())
                .dogNft(dog.getDogNft())
                .build();
    }

    @Override
    public List<GraveInfoDto> selectGraves() {
        List<Grave> graveList = graveRepository.findAll();
        return graveList.stream()
                .map(GraveInfoDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<Grave> selectGravesByUserNo(Integer userNo) {
        return graveRepository.findAllByUserUserNo(userNo);
    }
}
