package com.haru.ppobbi.domain.user.service;

import com.haru.ppobbi.domain.user.dto.UserRequestDto;
import com.haru.ppobbi.domain.user.entity.User;
import java.util.Map;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class OAuthService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // OAuth 서비스명 (google..)
        String registrationId = userRequest.getClientRegistration()
            .getRegistrationId();

        // OAuth 로그인 시 PK 값
        String userNameAttribute = userRequest.getClientRegistration().getProviderDetails()
            .getUserInfoEndpoint().getUserNameAttributeName();

        // OAuth 서비스 유저 정보들
        Map<String, Object> attributes = oAuth2User.getAttributes();

        UserRequestDto
        return null;
    }
}
