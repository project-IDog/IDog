package com.haru.ppobbi.global.config.filter;

import static com.haru.ppobbi.global.util.oauth.constant.OAuth2ExceptionMessage.*;

import com.haru.ppobbi.global.error.TokenException;
import com.haru.ppobbi.global.util.oauth.OAuth2TokenHandler;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JWTFilter implements Filter {
    private final OAuth2TokenHandler oAuth2TokenHandler;
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException, TokenException {
        try{
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            String bearer = httpRequest.getHeader("Authorization");
            log.debug("filter - bearer: {}", bearer);
            String accessToken = bearer.split(" ")[1];
            String userEmail = oAuth2TokenHandler.validateAccessTokenAndGetUserId(accessToken);
            log.debug("filter - userEmail: {}", userEmail);
            request.setAttribute("userEmail", userEmail);
            chain.doFilter(request, response);
        }catch (NullPointerException e){
            throw new TokenException(NOTFOUND_TOKEN.message());
        }

    }
}
