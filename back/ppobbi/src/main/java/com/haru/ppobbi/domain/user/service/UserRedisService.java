package com.haru.ppobbi.domain.user.service;

import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.entity.UserInfo;

public interface UserRedisService {

    void insertUserInfoToRedis(User user);

    UserInfo readUserInfoFromRedis(Integer userNo);

    void updateUserMessageToRedis(User user);

    void deleteUserInfoFromRedis(Integer userNo);

    void updateUserNameToRedis(User user);
}
