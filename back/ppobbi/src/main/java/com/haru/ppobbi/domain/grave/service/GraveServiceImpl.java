package com.haru.ppobbi.domain.grave.service;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.dog.repo.DogRepository;
import com.haru.ppobbi.domain.grave.constant.GraveResponseMessage;
import com.haru.ppobbi.domain.grave.dto.GraveRequestDto.RegistRequestDto;
import com.haru.ppobbi.domain.grave.dto.GraveResponseDto.*;
import com.haru.ppobbi.domain.grave.entity.Grave;
import com.haru.ppobbi.domain.grave.repo.GraveRepository;
import com.haru.ppobbi.domain.photo.repo.PhotoRepository;
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
import java.util.Optional;
import java.util.stream.Collectors;

import static com.haru.ppobbi.domain.dog.constant.DogResponseMessage.DOG_NOT_FOUND_EXCEPTION;

@Service
@RequiredArgsConstructor
public class GraveServiceImpl implements GraveService{
    private final GraveRepository graveRepository;
    private final DogRepository dogRepository;
    private final UserRepository userRepository;
    private final PhotoRepository photoRepository;
    @Override
    public Grave registGrave(Integer userNo, RegistRequestDto registRequestDto) {
        // 그 강아지의 주인 가져오기
        Optional<User> user = userRepository.findUserByUserNoAndCanceled(userNo, BaseConstant.NOTCANCELED);
        if(user.isEmpty()){ //조회된 사용자가 없을 경우
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
        // 사망 일자 저장
        deadDog.setDogDeathDate(registRequestDto.getDogDeathDate());

        // 새 grave 객체 생성
        Grave grave = Grave.builder()
                .user(user.get())
                .dog(deadDog)
                .build();
        return graveRepository.save(grave);
    }

    @Override
    public GraveInfoDto selectGrave(Integer graveNo) {
        Grave grave = graveRepository.findGraveByGraveNo(graveNo)
                .orElseThrow(() -> new NotFoundException(GraveResponseMessage.READ_FAIL.message()));
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
                .dogImg(dog.getDogImg())
                .build();
    }

    @Override
    public List<GraveListDto> selectGraves() {
        List<GraveListDto> graveListDtoList = graveRepository.findAll().stream()
                .map(GraveListDto::new).collect(Collectors.toList());
        graveListDtoList.forEach(e -> e.setTopAlbums(photoRepository.findTop3ByDogDogNoAndCanceledOrderByPhotoIsGoatDescCreateDateDesc(e.getDogNo(), BaseConstant.NOTCANCELED)));
        return graveListDtoList;
    }

    @Override
    public List<GraveListDto> selectGravesByUserNo(Integer userNo) {
        List<GraveListDto> graveListDtoList = graveRepository.findAllByUserUserNo(userNo).stream()
                .map(GraveListDto::new).collect(Collectors.toList());
        graveListDtoList.forEach(e -> e.setTopAlbums(photoRepository.findTop3ByDogDogNoAndCanceledOrderByPhotoIsGoatDescCreateDateDesc(e.getDogNo(), BaseConstant.NOTCANCELED)));
        return graveListDtoList;
    }
}
