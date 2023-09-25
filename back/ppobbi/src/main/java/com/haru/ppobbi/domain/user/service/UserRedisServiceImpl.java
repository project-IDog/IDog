package com.haru.ppobbi.domain.user.service;

import com.haru.ppobbi.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserRedisServiceImpl implements UserRedisService{

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void insertUserInfoToRedis(User user) {

    }

    @Override
    public User readUserInfoFromRedis(Integer userNo) {
        return null;
    }

    @Override
    public void updateUserInfoToRedis(Integer userNo) {

    }

    @Override
    public void deleteUserInfoFromRedis(Integer userNo) {

    }
}
