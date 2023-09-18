package com.haru.ppobbi.domain.grave.service;

import com.haru.ppobbi.domain.dog.entity.Dog;
import com.haru.ppobbi.domain.dog.repo.DogRepository;
import com.haru.ppobbi.domain.grave.dto.GraveRequestDto;
import com.haru.ppobbi.domain.grave.entity.Grave;
import com.haru.ppobbi.domain.grave.repo.GraveRepository;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.repo.UserRepository;
import com.haru.ppobbi.global.constant.BaseConstant;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GraveServiceImpl implements GraveService{
    private final GraveRepository graveRepository;
    private final DogRepository dogRepository;
    private final UserRepository userRepository;
    @Override
    public Grave registGrave(String userId, GraveRequestDto graveRequestDto) {
        // 죽은 강아지 가져오기
        Dog deadDog = dogRepository.findDogByDogNoAndCanceled(graveRequestDto.getDogNo(), BaseConstant.NOTCANCELED);
        // 그 강아지의 주인 가져오기
        
        // 새 grave 객체 생성
        Grave grave = Grave.builder()
                .user(null)
                .dog(deadDog)
                .build();
        return graveRepository.save(grave);
    }

    @Override
    public Grave selectGrave(Integer graveNo) {

        return graveRepository.findGraveByGraveNo(graveNo);
    }

    @Override
    public List<Grave> selectGraves() {
        return graveRepository.findAll();
    }

    @Override
    public List<Grave> selectGravesByUserNo(Integer userNo) {
        return graveRepository.findAllByUserUserNo(userNo);
    }
}
