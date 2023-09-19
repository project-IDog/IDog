package com.haru.ppobbi.global.util.oauth;

import static com.haru.ppobbi.global.util.oauth.constant.OAuth2ExceptionMessage.EXPIRED_TOKEN;
import static com.haru.ppobbi.global.util.oauth.constant.OAuth2ExceptionMessage.INVALID_TOKEN;

import com.haru.ppobbi.global.error.TokenException;
import com.haru.ppobbi.global.util.oauth.OAuth2ResponseDto.OAuth2TokenInfo;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
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
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2TokenHandler {

    private final RestTemplate restTemplate;


    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectURI;


    public OAuth2TokenInfo getOAuthToken(String authorizationCode) {
        String accessToken = "";
        String refreshToken = "";

        Map<String, Object> userAttribute;

        // Header 생성
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        String googleAPI = "https://oauth2.googleapis.com/token";
        URI googleURI = UriComponentsBuilder
            .fromUriString(googleAPI)
            .encode(StandardCharsets.UTF_8)
            .build()
            .toUri();

        log.debug("[DEBUG/getOAuthToken] targetURL : {}", googleURI);

        MultiValueMap<String, String> requestMap = new LinkedMultiValueMap();
        requestMap.add("grant_type", "authorization_code");
        requestMap.add("client_id", clientId);
        requestMap.add("redirect_uri", redirectURI);
        requestMap.add("code", authorizationCode);

        ResponseEntity<HashMap> response;
        try {
            response = restTemplate.exchange(googleURI, HttpMethod.POST, entity,
                HashMap.class);
        } catch (HttpClientErrorException e) {
            e.printStackTrace();
            throw new TokenException(INVALID_TOKEN.message());
        }
        log.debug("[DEBUG/getOAuthToken] response : {}", response);

        return OAuth2TokenInfo.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
    }

    public String validateAccessTokenAndGetUserId(String accessToken) {
        // TODO : access token invalid -> refresh token 유효성 검증 -> 새로 access token 발급 구현
        // TODO : Refactoring
        String googleApiURL = "https://oauth2.googleapis.com/tokeninfo?access_token=" + accessToken;
        log.debug("[DEBUG/validateAccessToken] Google Api URL : {}", googleApiURL);
        ResponseEntity<String> response;
        try {
            response = restTemplate.getForEntity(googleApiURL, String.class);
            log.debug("[DEBUG/validateAccessToken] Response To Access Token : {}", response);
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonBody = (JSONObject) jsonParser.parse(response.getBody());

            return (String) jsonBody.get("email");
        } catch (HttpClientErrorException e) {
            String errorMessage = e.getMessage();
            log.debug("error: {}", errorMessage);
            if (errorMessage.contains("invalid_token")) {
                // TODO: refresh token으로 access token 받아오기
                if (validateRefreshToken()) {
                    accessToken = getAccessTokenFromRefreshToken();

                } else {
                    throw new TokenException(INVALID_TOKEN.message());
                }
                throw new TokenException(INVALID_TOKEN.message());
            } else if (errorMessage.contains("expired_token")) {
                throw new TokenException(EXPIRED_TOKEN.message());
            } else {
                throw new TokenException(INVALID_TOKEN.message());
            }
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    private String getAccessTokenFromRefreshToken() {
        return null;
    }

    private boolean validateRefreshToken() {
        return true;
    }
}
