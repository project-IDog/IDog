package com.haru.ppobbi.domain.user.service;

import com.haru.ppobbi.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.entity.UserInfo;

public interface UserRedisService {

    void insertUserInfoToRedis(User user);

    UserInfo readUserInfoFromRedis(Integer userNo);

    void updateUserInfoToRedis(User user);

    void deleteUserInfoFromRedis(Integer userNo);
}
