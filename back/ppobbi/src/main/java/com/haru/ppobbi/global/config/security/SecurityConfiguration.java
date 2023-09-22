package com.haru.ppobbi.global.config.security;

import com.haru.ppobbi.global.config.filter.ExceptionHandlerFilter;
import com.haru.ppobbi.global.config.filter.JWTFilter;
import com.haru.ppobbi.global.config.filter.OAuth2Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfiguration {

    private final ExceptionHandlerFilter exceptionHandlerFilter;
    private final JWTFilter jwtFilter;
    private final OAuth2Filter oAuth2Filter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            // 모든 request 허용
            .authorizeRequests()
            .antMatchers("/**")
            .permitAll()
            .anyRequest()
            .authenticated()
            .and()
            .addFilterBefore(exceptionHandlerFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(oAuth2Filter, UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        ;

        return http.build();
    }
}
