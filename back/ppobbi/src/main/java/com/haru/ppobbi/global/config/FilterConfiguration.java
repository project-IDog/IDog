package com.haru.ppobbi.global.config;

import com.haru.ppobbi.global.config.filter.ExceptionHandlerFilter;
import com.haru.ppobbi.global.config.filter.JWTFilter;
import com.haru.ppobbi.global.util.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfiguration {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Bean
    public FilterRegistrationBean<ExceptionHandlerFilter> ExceptionHandlerFilter() {
        FilterRegistrationBean<ExceptionHandlerFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new ExceptionHandlerFilter());
        registrationBean.setOrder(1);
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<JWTFilter> JWTFilter() {
        FilterRegistrationBean<JWTFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new JWTFilter(jwtTokenProvider));
        registrationBean.setOrder(2);
        return registrationBean;
    }
}
