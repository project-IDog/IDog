package com.haru.ppobbi.domain.user.service;

import static com.haru.ppobbi.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;

import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.entity.UserInfo;
import com.haru.ppobbi.domain.user.repo.UserRedisRepository;
import com.haru.ppobbi.global.error.NotFoundException;
import java.util.Optional;
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
            .userName(user.getUserName())
            .userMessage(user.getUserMessage())
            .userProfileImg(user.getUserProfileImg())
            .userWalletPw(user.getUserWalletPw())
            .userWalletSalt(user.getUserWalletSalt())
            .ttl(USER_INFO_TTL)
            .build()
        );
    }

    @Override
    public UserInfo readUserInfoFromRedis(Integer userNo) {
        return userRedisRepository.findById(userNo).orElseThrow(
            () -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message())
        );
    }

    @Override
    public void updateUserMessageToRedis(User user) {
        Optional<UserInfo> userInfoOptional = userRedisRepository.findById(user.getUserNo());
        if (userInfoOptional.isPresent()) {
            UserInfo userInfo = userInfoOptional.get();
            userInfo.updateUserInfoMessage(user.getUserMessage());
            userRedisRepository.save(userInfo);
        } else {
            userRedisRepository.save(UserInfo.builder()
                .userNo(user.getUserNo())
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userMessage(user.getUserMessage())
                .userProfileImg(user.getUserProfileImg())
                .userWalletPw(user.getUserWalletPw())
                .userWalletSalt(user.getUserWalletSalt())
                .build()
            );
        }
    }

    @Override
    public void deleteUserInfoFromRedis(Integer userNo) {
        userRedisRepository.deleteById(userNo);
    }

    @Override
    public void updateUserNameToRedis(User user) {
        Optional<UserInfo> userInfoOptional = userRedisRepository.findById(user.getUserNo());
        if (userInfoOptional.isPresent()) {
            UserInfo userInfo = userInfoOptional.get();
            userInfo.updateUserNameMessage(user.getUserName());
            userRedisRepository.save(userInfo);
        } else {
            userRedisRepository.save(UserInfo.builder()
                .userNo(user.getUserNo())
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userMessage(user.getUserMessage())
                .userProfileImg(user.getUserProfileImg())
                .userWalletPw(user.getUserWalletPw())
                .userWalletSalt(user.getUserWalletSalt())
                .build()
            );
        }
    }

    @Override
    public void updateUserWalletPwAndSaltToRedis(User user) {
        Optional<UserInfo> userInfoOptional = userRedisRepository.findById(user.getUserNo());
        if (userInfoOptional.isPresent()) {
            UserInfo userInfo = userInfoOptional.get();
            userInfo.updateUserWalletPw(user.getUserWalletPw());
            userInfo.updateUserWalletSalt(user.getUserWalletSalt());
            userRedisRepository.save(userInfo);
        } else {
            userRedisRepository.save(UserInfo.builder()
                    .userNo(user.getUserNo())
                    .userId(user.getUserId())
                    .userName(user.getUserName())
                    .userMessage(user.getUserMessage())
                    .userProfileImg(user.getUserProfileImg())
                    .userWalletPw(user.getUserWalletPw())
                    .userWalletSalt(user.getUserWalletSalt())
                    .build()
            );
        }
    }
}
