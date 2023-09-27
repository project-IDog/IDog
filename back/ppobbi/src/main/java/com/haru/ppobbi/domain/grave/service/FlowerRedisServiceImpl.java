package com.haru.ppobbi.domain.grave.service;

import com.haru.ppobbi.domain.grave.dto.FlowerRequestDto;
import com.haru.ppobbi.domain.grave.dto.FlowerResponseDto.FlowerInfoDto;
import com.haru.ppobbi.domain.grave.entity.Flower;
import com.haru.ppobbi.domain.grave.repo.FlowerRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FlowerRedisServiceImpl implements FlowerRedisService {
    @Value("${spring.redis.ttls.flower}")
    private Long FLOWER_TTL;

    private final FlowerRedisRepository flowerRedisRepository;

    @Override
    public void HoldXToPayRespects(FlowerRequestDto.RegistRequestDto registRequestDto) {
        Optional<Flower> optionalFlower = flowerRedisRepository.findById(registRequestDto.getGraveNo());
        List<LocalDateTime> flowers;
        if(optionalFlower.isPresent()){ // 이미 존재하면 시든 꽃 처내고 꽃 추가
            flowers = arrangeFlowers(optionalFlower.get(), true);
        }else{ // 꽃 추가 후 새로 만들기
            flowers = new ArrayList<>(){{
               add(LocalDateTime.now());
            }};
        }
        updateFlower(registRequestDto.getGraveNo(), flowers);
    }

    @Override
    public FlowerInfoDto countFlowers(Integer graveNo) {
        Optional<Flower> optionalFlower = flowerRedisRepository.findById(graveNo);
        Integer count;
        if(optionalFlower.isPresent()){// 이미 존재하면 시든 꽃 쳐내고 개수 세기
            List<LocalDateTime> flowers = arrangeFlowers(optionalFlower.get(), false);
            count = Math.min(flowers.size(), 30);
            updateFlower(graveNo, flowers);
        }else{
            count = 0;
        }

        return FlowerInfoDto.builder()
                .count(count)
                .build();
    }

    private List<LocalDateTime> arrangeFlowers(Flower flower, boolean isUpdated){
        List<LocalDateTime> flowers = flower.getFlowers();
        // 시든 꽃 쳐내기
        List<LocalDateTime> fresh = flowers.stream()
                .filter(f -> !f.isBefore(LocalDateTime.now().minusHours(1)))
                .collect(Collectors.toList());
        
        // 현재 꽃 더한 후 반환
        if(isUpdated){
            fresh.add(LocalDateTime.now());
        }

        return fresh;
    }

    private void updateFlower(Integer graveNo, List<LocalDateTime> flowers){
        flowerRedisRepository.deleteById(graveNo);
        flowerRedisRepository.save(Flower.builder()
                .graveNo(graveNo)
                .flowers(flowers)
                .ttl(FLOWER_TTL)
                .build()
        );
    }
}
