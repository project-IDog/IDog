package com.haru.ppobbi.domain.user.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.haru.ppobbi.domain.user.dto.UserRequestDto.SignUpOrInRequestDto;
import com.haru.ppobbi.domain.user.entity.User;
import com.haru.ppobbi.domain.user.repo.UserRepository;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    @Transactional
    @Override
    public void signUpOrIn(SignUpOrInRequestDto signUpOrInRequestDto)
        throws ParseException, JsonProcessingException {
        String idToken = signUpOrInRequestDto.getIdToken();
        Map<String, Object> userAttribute = getUserAttribute(idToken);

        User user = convertUserAttributeToUser(userAttribute);
        User foundUser = userRepository.findByUserId(user.getUserId());

        log.debug("[DEBUG/signUpOrIn] : user : {}", user);

        if (foundUser == null) {
            userRepository.save(user);
        }

        //TODO: access token 발급
    }

    private User convertUserAttributeToUser(Map<String, Object> userAttribute) {
        return User.builder()
            .userName((String) userAttribute.get("name"))
            .userId((String) userAttribute.get("email"))
            .build();
    }

    private Map<String, Object> getUserAttribute(String idToken)
        throws ParseException, JsonProcessingException {
        log.debug("[DEBUG/getUserAttribute] idToken : {}", idToken);

        Map<String, Object> userAttribute;
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);
        String googleApi = "https://oauth2.googleapis.com/tokeninfo";
        String targetURL = UriComponentsBuilder.fromHttpUrl(googleApi)
            .queryParam("id_token", idToken).build().toUriString();
        log.debug("[DEBUG/getUserAttribute] targetURL : {}", targetURL);

        ResponseEntity<String> response = restTemplate.exchange(targetURL,
            HttpMethod.GET,
            entity,
            String.class);

        log.debug("[DEBUG/response] response : {}", response);

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonBody = (JSONObject) jsonParser.parse(response.getBody());

        userAttribute = new ObjectMapper().readValue(jsonBody.toString(), Map.class);
        return userAttribute;
    }
}
