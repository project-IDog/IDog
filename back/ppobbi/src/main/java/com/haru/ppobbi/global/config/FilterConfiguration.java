//package com.haru.ppobbi.global.config;
//
//import com.haru.ppobbi.global.config.filter.ExceptionHandlerFilter;
//import com.haru.ppobbi.global.config.filter.JWTFilter;
//import com.haru.ppobbi.global.config.filter.OAuth2Filter;
//import com.haru.ppobbi.global.util.jwt.JwtTokenHandler;
//import com.haru.ppobbi.global.util.oauth.OAuth2TokenHandler;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//@RequiredArgsConstructor
//public class FilterConfiguration {
//
//    private final JwtTokenHandler jwtTokenHandler;
//    private final OAuth2TokenHandler oAuth2TokenHandler;
//
//    @Bean
//    public FilterRegistrationBean<ExceptionHandlerFilter> ExceptionHandlerFilter() {
//        FilterRegistrationBean<ExceptionHandlerFilter> registrationBean = new FilterRegistrationBean<>();
//        registrationBean.setFilter(new ExceptionHandlerFilter());
//        registrationBean.setOrder(1);
//        return registrationBean;
//    }
//
//    @Bean
//    public FilterRegistrationBean<JWTFilter> JWTFilter() {
//        FilterRegistrationBean<JWTFilter> registrationBean = new FilterRegistrationBean<>();
//        registrationBean.setFilter(new JWTFilter(jwtTokenHandler));
//        registrationBean.setOrder(2);
//        return registrationBean;
//    }
//
//    @Bean
//    public FilterRegistrationBean<OAuth2Filter> OAuth2Filter() {
//        FilterRegistrationBean<OAuth2Filter> registrationBean = new FilterRegistrationBean<>();
//        registrationBean.setFilter(new OAuth2Filter(oAuth2TokenHandler));
//        registrationBean.setOrder(3);
//        return registrationBean;
//    }
//}
