package com.haru.ppobbi.global.config;

import com.haru.ppobbi.global.config.filter.JWTFilter;
import com.haru.ppobbi.global.util.oauth.OAuth2TokenHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfiguration {
    @Autowired
    private OAuth2TokenHandler oAuth2TokenHandler;

    @Bean
    public FilterRegistrationBean<JWTFilter> JWTFilter(){
        FilterRegistrationBean<JWTFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new JWTFilter(oAuth2TokenHandler));
        registrationBean.addUrlPatterns("/api/grave");
        return registrationBean;
    }
}
