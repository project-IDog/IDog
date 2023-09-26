package com.haru.ppobbi.domain.user.service;

import com.haru.ppobbi.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import com.haru.ppobbi.domain.user.entity.User;

public interface UserRedisService {

    void insertUserInfoToRedis(User user);

    UserInfoResponseDto readUserInfoFromRedis(Integer userNo);

    void updateUserInfoToRedis(Integer userNo);

    void deleteUserInfoFromRedis(Integer userNo);
}
