package com.haru.ppobbi.domain.user.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.haru.ppobbi.domain.user.constant.UserRole;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.SignUpOrInRequestDto;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.repo.UserRepository;
import com.haru.ppobbi.global.util.jwt.JwtTokenProvider;
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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectURI;


    @Transactional
    @Override
    public void signUpOrIn(SignUpOrInRequestDto signUpOrInRequestDto)
        throws ParseException, JsonProcessingException {
        String idToken = signUpOrInRequestDto.getIdToken();
        Map<String, Object> userAttribute = getUserAttribute(idToken);

        User user = convertUserAttributeToUser(userAttribute);
        log.debug("[DEBUG/signUpOrIn] : user : {}", user);

        Optional<User> foundUser = userRepository.findByUserId(user.getUserId());
        if (foundUser.isEmpty()) {
            userRepository.save(user);
        }

        //TODO: access token 발급
        String accessToken = signUpOrInRequestDto.getAccessToken();
        log.debug("[DEBUG] Access Token : {}", accessToken);
        boolean validationCheck = jwtTokenProvider.validateToken(accessToken);
        log.debug("[DEBUG] Token Validation Check : {}", validationCheck);
    }

    // authorization code 검증
//    @Transactional
//    @Override
//    public void signUpOrIn(SignUpOrInRequestDto signUpOrInRequestDto)
//        throws ParseException, JsonProcessingException {
//        String authorizationCode = signUpOrInRequestDto.getAuthorizationCode();
//
//        HttpEntity<MultiValueMap<String, String>> tokenRequest = makeHttpRequest(authorizationCode);
//        String googleApiURL = "https://oauth2.googleapis.com/tokeninfo";
//
////        String targetURL = UriComponentsBuilder.fromHttpUrl(googleApiURL)
////            .queryParam("grant_type", "authorization_code")
////            .queryParam("client_id", clientId)
////            .queryParam("redirect_uri", redirectURI)
////            .queryParam("code", authorizationCode)
////            .queryParam("client_secret", clientSecret)
////            .build().toUriString();
////
////        HttpHeaders headers = new HttpHeaders();
////        HttpEntity<String> entity = new HttpEntity<>(headers);
//
//        ResponseEntity<String> response = restTemplate.exchange(googleApiURL,
//            HttpMethod.POST,
//            tokenRequest,
//            String.class);
//
//        log.debug("[DEBUG/signUpOrIn] response : {}", response);
//    }

    // authorization code 검증 용
    private HttpEntity<MultiValueMap<String, String>> makeHttpRequest(String authorizationCode) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectURI);
        params.add("code", authorizationCode);
        params.add("client_secret", clientSecret);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(params, headers);
        return tokenRequest;
    }

    private User convertUserAttributeToUser(Map<String, Object> userAttribute) {
        return User.builder()
            .userName((String) userAttribute.get("name"))
            .userId((String) userAttribute.get("email"))
            .userRole(UserRole.ROLE_USER)
            .build();
    }

    private Map<String, Object> getUserAttribute(String idToken)
        throws ParseException, JsonProcessingException {
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
        ResponseEntity<String> response = restTemplate.exchange(targetURL,
            HttpMethod.GET,
            entity,
            String.class);

        log.debug("[DEBUG/response] response : {}", response);

        // Response To Json 파싱
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonBody = (JSONObject) jsonParser.parse(response.getBody());

        userAttribute = new ObjectMapper().readValue(jsonBody.toString(), Map.class);
        return userAttribute;
    }
}
