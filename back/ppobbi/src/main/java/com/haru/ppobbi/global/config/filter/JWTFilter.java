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
        try{;
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            if(goGoSSing(httpRequest)){ // 로그인 필요없는 경우 통과
                log.debug("gogosing");
                chain.doFilter(request, response);
                return;
            }
            String bearer = httpRequest.getHeader("Authorization");
            log.debug("filter - bearer: {}", bearer);
            String accessToken = bearer.split(" ")[1];
            String userId = oAuth2TokenHandler.validateAccessTokenAndGetUserId(accessToken);
            log.debug("filter - userId: {}", userId);
            request.setAttribute("userId", userId);
            chain.doFilter(request, response);
        }catch (NullPointerException e){
            throw new TokenException(NOTFOUND_TOKEN.message());
        }

    }

    private boolean goGoSSing(HttpServletRequest httpServletRequest){
        String url = httpServletRequest.getServletPath();
        String method = httpServletRequest.getMethod();
        if(url.matches("/api/grave(.*)") && !method.equals("POST")){
            return true;
        }else if(url.equals("/api/user") && method.equals("POST")){
            return true;
        }

        return false;
    }
}
