package com.haru.ppobbi.domain.user.service;


import static com.haru.ppobbi.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;
import static com.haru.ppobbi.global.constant.BaseConstant.CANCELED;
import static com.haru.ppobbi.global.constant.BaseConstant.NOTCANCELED;

import com.haru.ppobbi.domain.user.dto.TokenInfo;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UpdateUserInfoRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UpdateUserMessageRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UserInfoRequestDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.AccessTokenResponseDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.repo.UserRepository;
import com.haru.ppobbi.global.error.NotFoundException;
import com.haru.ppobbi.global.util.jwt.JwtTokenHandler;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;
    private final JwtTokenHandler jwtTokenHandler;


    @Override
    public TokenInfo signUpOrIn(UserInfoRequestDto userInfoRequestDto) {
        User user = insertUser(userInfoRequestDto.toUser());
        log.debug("[userServiceImpl - signUpOrIn] User : {}", user);

        // 토큰 발급 후, 정보 반환
        return jwtTokenHandler.generateToken(user.getUserNo());
    }

    @Transactional
    public User insertUser(User user) {
        log.debug("### [DEBUG/UserService] 회원가입 user : {}", user);

        // DB에 정보 없을 경우 회원가입, 있을 경우 프로필 사진/이름 업데이트
        Optional<User> optionalUser = userRepository.findUserByUserIdAndCanceled(user.getUserId(),
            NOTCANCELED);
        if (optionalUser.isEmpty()) {
            userRepository.save(user);
        }
        return userRepository.findUserByUserIdAndCanceled(user.getUserId(),
            NOTCANCELED).get();
    }

    @Override
    public UserInfoResponseDto getUserInfo(Integer userNo) {
        User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
            .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));

        return UserInfoResponseDto.builder()
            .userId(user.getUserId())
            .userName(user.getUserName())
            .userWallet(user.getUserWallet())
            .userMessage(user.getUserMessage())
            .userProfileImg(user.getUserProfileImg())
            .userPrivateKey(user.getUserPrivateKey())
            .build();
    }

    @Override
    @Transactional
    public void deleteUser(Integer userNo) {
        User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
            .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));

        user.setCanceled(CANCELED);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void updateUserMessage(Integer userNo,
        UpdateUserMessageRequestDto updateUserMessageRequestDto) {
        User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
            .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));

        String message = updateUserMessageRequestDto.getUserMessage();
        user.updateUserMessage(message);
    }

    @Override
    public AccessTokenResponseDto reissueAccessToken(Integer userNo) {
        String accessToken = jwtTokenHandler.generateToken(userNo).getAccessToken();

        return AccessTokenResponseDto.builder()
            .accessToken(accessToken)
            .build();
    }

    @Override
    @Transactional
    public void updateUserName(Integer userNo, UpdateUserInfoRequestDto updateUserInfoRequestDto) {
        User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
            .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));
        log.debug("[userService/updateUserName] update user name : {}",
            updateUserInfoRequestDto.getUserName());
        user.updateUserName(updateUserInfoRequestDto.getUserName());
        userRepository.save(user);
    }
}
