package com.haru.ppobbi.domain.user.service;


import static com.haru.ppobbi.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;
import static com.haru.ppobbi.global.util.oauth.constant.OAuth2ExceptionMessage.INVALID_TOKEN;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.haru.ppobbi.domain.user.constant.UserRole;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.SignUpOrInRequestDto;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UpdateUserMessageRequestDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.SignUpOrInResponseDto;
import com.haru.ppobbi.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.repo.UserRepository;
import com.haru.ppobbi.global.error.NotFoundException;
import com.haru.ppobbi.global.error.TokenException;
import com.haru.ppobbi.global.util.oauth.OAuth2TokenHandler;
import com.haru.ppobbi.global.util.oauth.OAuth2UserInfo;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;
    private final OAuth2TokenHandler oauthTokenProvider;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectURI;


    @Transactional
    @Override
    public SignUpOrInResponseDto signUpOrIn(SignUpOrInRequestDto signUpOrInRequestDto) {
        String idToken = signUpOrInRequestDto.getIdToken();
        String accessToken = signUpOrInRequestDto.getAccessToken();
        String refreshToken = signUpOrInRequestDto.getRefreshToken();
        Map<String, Object> userAttribute = getUserAttribute(idToken);

        User user = convertUserAttributeToUser(userAttribute, refreshToken);
        log.debug("### [DEBUG/UserService] 회원가입 user : {}", user);

        // DB에 정보 없을 경우 회원가입, 있을 경우 프로필 사진/이름 업데이트
        Optional<User> optionalUser = userRepository.findByUserId(user.getUserId());
        if (optionalUser.isEmpty()) {
            userRepository.save(user);
        } else {
            User foundUser = optionalUser.get();
            foundUser.updateUserInfo(user.getUserName(), user.getUserProfileImg());
            foundUser.updateUserRefreshToken(refreshToken);
            userRepository.save(foundUser);
        }
        return SignUpOrInResponseDto.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
    }

    @Override
    public UserInfoResponseDto getUserInfo(String userId) {
        User user = userRepository.findByUserId(userId)
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

    @Transactional
    @Override
    public void deleteUser(String userId) {
        User user = userRepository.findByUserId(userId)
            .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));

        userRepository.delete(user);
    }

    @Override
    @Transactional
    public void updateUserMessage(String userId,
        UpdateUserMessageRequestDto updateUserMessageRequestDto) {
        User user = userRepository.findByUserId(userId)
            .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));

        String message = updateUserMessageRequestDto.getUserMessage();
        user.updateUserMessage(message);
    }

    private User convertUserAttributeToUser(Map<String, Object> userAttribute,
        String refreshToken) {
        OAuth2UserInfo oAuth2UserInfo = new OAuth2UserInfo(userAttribute);

        return User.builder()
            .userId(oAuth2UserInfo.getUserId())
            .userName(oAuth2UserInfo.getUserName())
            .userProfileImg(oAuth2UserInfo.getUserProfileImg())
            .userRole(UserRole.ROLE_USER)
            .userRefreshToken(refreshToken)
            .build();
    }

    private Map<String, Object> getUserAttribute(String idToken) {
        log.debug("[DEBUG/getUserAttribute] idToken : {}", idToken);

        Map<String, Object> userAttribute;

        // Header 생성
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // URL 생성
        String googleApi = "https://oauth2.googleapis.com/tokeninfo";
        String targetURL = UriComponentsBuilder.fromHttpUrl(googleApi)
            .queryParam("id_token", idToken).build().toUriString();
        log.debug("[DEBUG/getUserAttribute] targetURL : {}", targetURL);

        // Response 받아오기
        ResponseEntity<String> response;
        try {
            response = restTemplate.exchange(targetURL,
                HttpMethod.GET,
                entity,
                String.class);
        } catch (HttpClientErrorException e) {
            throw new TokenException(INVALID_TOKEN.message());
        }
        log.debug("[DEBUG/response] response : {}", response);

        // Response To Json 파싱
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonBody;
        try {
            jsonBody = (JSONObject) jsonParser.parse(response.getBody());
            userAttribute = new ObjectMapper().readValue(jsonBody.toString(), Map.class);
        } catch (ParseException | JsonProcessingException e) {
            throw new TokenException(INVALID_TOKEN.message());
        }
        return userAttribute;
    }
}
