package com.haru.ppobbi.global.util.oauth;

import static com.haru.ppobbi.global.util.oauth.constant.OAuth2ExceptionMessage.EXPIRED_TOKEN;
import static com.haru.ppobbi.global.util.oauth.constant.OAuth2ExceptionMessage.INVALID_TOKEN;

import com.haru.ppobbi.global.error.TokenException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2TokenHandler {

    private final RestTemplate restTemplate;

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
            if (errorMessage.contains("invalid_token")) {
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
}
