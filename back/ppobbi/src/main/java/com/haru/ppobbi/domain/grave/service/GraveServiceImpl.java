package com.haru.ppobbi.domain.grave.service;

import com.haru.ppobbi.domain.grave.dto.GraveRequestDto;
import com.haru.ppobbi.domain.grave.entity.Grave;
import com.haru.ppobbi.domain.grave.repo.GraveRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GraveServiceImpl implements GraveService{
    private final GraveRepository graveRepository;
    @Override
    public Grave registGrave(GraveRequestDto graveRequestDto) {
        // dog 가져오기
        // user 가져오기
        // 새 grave 객체 생성
        return null; // 생성된 grvae 객체 반환
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
