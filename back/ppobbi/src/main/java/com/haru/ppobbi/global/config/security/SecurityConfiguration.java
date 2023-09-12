package com.haru.ppobbi.global.config.security;

import com.haru.ppobbi.domain.user.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfiguration {

    private final OAuthService oAuthService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            // 모든 request 허용
            .authorizeRequests()
            .anyRequest().authenticated()

            // OAuth 적용, 로그인 시
            .and()
            .oauth2Login() // OAuth2 로그인 설정 진입점
            .userInfoEndpoint() // OAuth2 로그인 성공 이후 사용자 정보 가져옴
            .userService(oAuthService); // 가져온 정보를 토대로 파싱

        return http.build();
    }


}
