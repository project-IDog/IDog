package com.haru.ppobbi.domain.user.service;

import com.haru.ppobbi.domain.user.dto.UserRequestDto.SignUpRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientProperties;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private OAuth2ClientProperties clientProperties;

    @Override
    public void signUp(SignUpRequestDto signUpRequestDto) {
        OAuth2AuthenticationToken authToken = signUpRequestDto.getAuthToken();
        String accessToken = authToken.getPrincipal().getAttribute("access_token");
        String IDToken = authToken.getPrincipal().getAttribute("id_token");

        log.debug("[DEBUG/SIGNUP] user access token : {}", accessToken);
        log.debug("[DEBUG/SIGNUP] user id token : {}", IDToken);

        if(checkExistUser(accessToken)) { // TODO: 이미 존재하는 사용자이면 저장 X
            
        } else { // TODO: 존재하지 않는 사용자이면 저장

        }
    }

    private boolean checkExistUser(String accessToken) { // TODO: DB에 사용자 정보 존재하는지 체크


        return false;
    }
}
