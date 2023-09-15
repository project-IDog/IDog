package com.haru.ppobbi.global.util.oauth;

import static org.springframework.security.oauth2.core.OAuth2ErrorCodes.INVALID_TOKEN;

import com.haru.ppobbi.global.error.TokenException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2TokenProvider {

    private final RestTemplate restTemplate;

    public boolean validateAccessToken(String accessToken) {
        String googleApiURL = "https://oauth2.googleapis.com/tokeninfo?access_token=" + accessToken;
        log.debug("[DEBUG/validateAccessToken] Google Api URL : {}", googleApiURL);
        ResponseEntity<String> response;
        try {
            response = restTemplate.getForEntity(googleApiURL, String.class);
            log.debug("[DEBUG/validateAccessToken] Response To Access Token : {}", response);
            return true;
        } catch (HttpClientErrorException e) {
            throw new TokenException(INVALID_TOKEN);
        }
    }
}
