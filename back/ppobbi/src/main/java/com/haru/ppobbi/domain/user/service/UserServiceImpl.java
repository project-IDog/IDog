package com.haru.ppobbi.domain.user.service;


import static com.haru.ppobbi.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;
import static com.haru.ppobbi.domain.user.constant.UserResponseMessage.CHECK_USER_WALLET_PW_FAIL;
import static com.haru.ppobbi.domain.user.constant.UserResponseMessage.CHECK_USER_WALLET_PW_SUCCESS;
import static com.haru.ppobbi.global.constant.BaseConstant.CANCELED;
import static com.haru.ppobbi.global.constant.BaseConstant.NOTCANCELED;

import com.haru.ppobbi.domain.user.dto.TokenInfo;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UserAddressRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UserWalletPwRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UpdateUserInfoRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UpdateUserMessageRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UserInfoRequestDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.AccessTokenResponseDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.entity.UserInfo;
import com.haru.ppobbi.domain.user.repo.UserRepository;
import com.haru.ppobbi.global.error.NotFoundException;
import com.haru.ppobbi.global.util.jwt.JwtTokenHandler;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtTokenHandler jwtTokenHandler;
    private final UserRedisService userRedisService;

    // 솔트사이즈 고정
    private static final int SALT_SIZE = 16;


    @Override
    public TokenInfo signUpOrIn(UserInfoRequestDto userInfoRequestDto) {
        User user = insertUser(userInfoRequestDto.toUser());
        log.debug("[userServiceImpl - signUpOrIn] User : {}", user);

        userRedisService.insertUserInfoToRedis(user);

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
        try {
            // redis 에서 먼저 검색
            log.debug("[UserService] Get user info from redis !!");
            UserInfo userInfo = userRedisService.readUserInfoFromRedis(userNo);
            return UserInfoResponseDto.builder()
                .userId(userInfo.getUserId())
                .userName(userInfo.getUserName())
                .userMessage(userInfo.getUserMessage())
                .userProfileImg(userInfo.getUserProfileImg())
                .build();
        } catch (NotFoundException e) {
            // 없으면 DB 검색
            log.debug("[UserService] Get user info from DB !!");
            User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));
            
            // redis 에 저장
            userRedisService.insertUserInfoToRedis(user);

            return UserInfoResponseDto.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userMessage(user.getUserMessage())
                .userProfileImg(user.getUserProfileImg())
                .build();
        }
    }

    @Override
    @Transactional
    public void deleteUser(Integer userNo) {
        // Redis 에서 삭제
        userRedisService.deleteUserInfoFromRedis(userNo);
        
        // DB 에서 삭제
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

        user.updateUserMessage(updateUserMessageRequestDto.getUserMessage());
        userRepository.save(user);

        // redis 에 적용
        userRedisService.updateUserMessageToRedis(user);
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

        // redis 에 적용
        userRedisService.updateUserNameToRedis(user);
    }

    @Override
    @Transactional
    public void updateUserWalletPw(Integer userNo, UserWalletPwRequestDto userWalletPwRequestDto) {
        User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));
        String beforeHasingPw = userWalletPwRequestDto.getUserWalletPw();

        // 비밀번호 해싱
        String SALT = null;
        String hasingPw = null;
        try {
            SALT = getSALT();
            byte[] tmppw = beforeHasingPw.getBytes();
            hasingPw = Hashing(tmppw, SALT);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        user.updateUserWalletPw(hasingPw);
        user.updateUserWalletSalt(SALT);

        userRepository.save(user);

        //Redis적용은 아직 안한 상태
        userRedisService.updateUserWalletPwAndSaltToRedis(user);

    }

    @Override
    @Transactional
    public String checkUserWalletPw(Integer userNo, UserWalletPwRequestDto userWalletPwRequestDto) {
        try{
            // redis 에서 먼저 검색
            log.debug("[UserService] Get user info from redis !!");
            UserInfo userInfo = userRedisService.readUserInfoFromRedis(userNo);
            String userWalletSalt = userInfo.getUserWalletSalt();
            String userWalletPw = userWalletPwRequestDto.getUserWalletPw();
            byte[] bytepw = userWalletPw.getBytes();

            //사용자의 salt를 가지고 비밀번호 확인
            String tmp_pass = Hashing(bytepw, userWalletSalt);
            if(userInfo.getUserWalletPw().equals(tmp_pass)){
                return CHECK_USER_WALLET_PW_SUCCESS.message();
            }

        }catch (NotFoundException e) {
            // 없으면 DB 검색
            log.debug("[UserService] Get user info from DB !!");
            User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
                    .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));

            // redis 에 저장
            userRedisService.insertUserInfoToRedis(user);

            String userWalletSalt = user.getUserWalletSalt();
            String userWalletPw = userWalletPwRequestDto.getUserWalletPw();
            byte[] bytepw = userWalletPw.getBytes();

            //사용자의 salt를 가지고 비밀번호 확인
            String tmp_pass = null;
            try {
                tmp_pass = Hashing(bytepw, userWalletSalt);
            } catch (Exception ex) {
                throw new RuntimeException(ex);
            }
            if(user.getUserWalletPw().equals(tmp_pass)){
                return CHECK_USER_WALLET_PW_SUCCESS.message();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return CHECK_USER_WALLET_PW_FAIL.message();
    }

    @Override
    public void updateUserAddress(Integer userNo, UserAddressRequestDto userAddressRequestDto) {
        User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));
        log.debug("[userService/updateUserAddress] update user address : {}",
                userAddressRequestDto.getUserAddress());

        user.updateUserAddress(userAddressRequestDto.getUserAddress());
        userRepository.save(user);

        // redis 에 적용
        userRedisService.updateUserAddressToRedis(user);
    }

    // 비밀번호 해싱
    private String Hashing(byte[] password, String Salt) throws Exception {

        MessageDigest md = MessageDigest.getInstance("SHA-256"); // SHA-256 해시함수를 사용

        for (int i = 0; i < 10000; i++) {
            String temp = Byte_to_String(password) + Salt; // 패스워드와 Salt 를 합쳐 새로운 문자열 생성
            md.update(temp.getBytes()); // temp 의 문자열을 해싱하여 md 에 저장해둔다
            password = md.digest(); // md 객체의 다이제스트를 얻어 password 를 갱신한다
        }

        return Byte_to_String(password);
    }

    // SALT 값 생성
    private String getSALT() throws Exception {
        SecureRandom rnd = new SecureRandom();
        byte[] temp = new byte[SALT_SIZE];
        rnd.nextBytes(temp);

        return Byte_to_String(temp);

    }

    // 바이트 값을 16진수로 변경해준다
    private String Byte_to_String(byte[] temp) {
        StringBuilder sb = new StringBuilder();
        for (byte a : temp) {
            sb.append(String.format("%02x", a));
        }
        return sb.toString();
    }

}
