package com.haru.ppobbi.domain.user.service;

import com.haru.ppobbi.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.entity.UserInfo;
import com.haru.ppobbi.domain.user.repo.UserRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserRedisServiceImpl implements UserRedisService {

    @Value("${spring.redis.ttls.user-info}")
    private Long USER_INFO_TTL;

    private final UserRedisRepository userRedisRepository;

    @Override
    public void insertUserInfoToRedis(User user) {
        String key = user.getUserNo() + ":user-info";
        log.debug("[userRedisService - insert] key : {}", key);
        userRedisRepository.save(UserInfo.builder()
            .userNo(user.getUserNo())
            .userId(user.getUserId())
            .userMessage(user.getUserMessage())
            .userPrivateKey(user.getUserPrivateKey())
            .userProfileImg(user.getUserProfileImg())
            .userWallet(user.getUserWallet())
            .ttl(USER_INFO_TTL)
            .build()
        );
    }

    @Override
    public UserInfoResponseDto readUserInfoFromRedis(Integer userNo) {
        return null;
    }

    @Override
    public void updateUserInfoToRedis(Integer userNo) {

    }

    @Override
    public void deleteUserInfoFromRedis(Integer userNo) {

    }
}
