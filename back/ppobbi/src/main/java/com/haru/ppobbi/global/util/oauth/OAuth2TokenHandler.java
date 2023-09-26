package com.haru.ppobbi.global.util.oauth;

import static com.haru.ppobbi.domain.user.constant.UserRole.ROLE_USER;
import static com.haru.ppobbi.global.util.oauth.constant.OAuth2ExceptionMessage.INVALID_TOKEN;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.UserInfoRequestDto;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.global.error.TokenException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2TokenHandler {

    private final RestTemplate restTemplate;

    public UserInfoRequestDto validateTokenAndGetUserInfo(String token) {
        Map<String, Object> userAttribute = getUserAttribute(token);
        OAuth2UserInfo oAuth2UserInfo = new OAuth2UserInfo(userAttribute);
        return UserInfoRequestDto.builder()
            .userId(oAuth2UserInfo.getUserId())
            .userName(oAuth2UserInfo.getUserName())
            .userProfileImg(oAuth2UserInfo.getUserProfileImg())
            .userRole(ROLE_USER)
            .build();
    }

    private User convertOAuth2UserToUser(OAuth2UserInfo oAuth2UserInfo) {
        return User.builder()
            .userId(oAuth2UserInfo.getUserId())
            .userName(oAuth2UserInfo.getUserName())
            .userProfileImg(oAuth2UserInfo.getUserProfileImg())
            .userRole(ROLE_USER)
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
