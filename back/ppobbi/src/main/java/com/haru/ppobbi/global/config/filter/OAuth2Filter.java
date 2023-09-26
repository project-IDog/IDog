package com.haru.ppobbi.global.config.filter;


import static com.haru.ppobbi.global.util.oauth.constant.OAuth2ExceptionMessage.NOTFOUND_TOKEN;

import com.haru.ppobbi.domain.user.dto.UserRequestDto.UserInfoRequestDto;
import com.haru.ppobbi.global.error.TokenException;
import com.haru.ppobbi.global.util.oauth.OAuth2TokenHandler;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2Filter implements Filter {

    private final OAuth2TokenHandler oAuth2TokenHandler;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
        try {
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            if (doNotNeedOAuth2(httpRequest)) { // 로그인 필요없는 경우 통과
                log.debug("do not need oauth2 !!!");
                chain.doFilter(request, response);
                return;
            }

            String bearer = httpRequest.getHeader("Authorization");
            log.debug("filter - bearer: {}", bearer);
            String idToken = bearer.split(" ")[1];
            UserInfoRequestDto userInfoRequestDto = oAuth2TokenHandler.validateTokenAndGetUserInfo(
                idToken);
            request.setAttribute("userInfo", userInfoRequestDto);
            chain.doFilter(request, response);
        } catch (NullPointerException e) {
            throw new TokenException(NOTFOUND_TOKEN.message());
        }
    }

    private boolean doNotNeedOAuth2(HttpServletRequest httpServletRequest) {
        String url = httpServletRequest.getServletPath();
        String method = httpServletRequest.getMethod();
        return !url.matches("/api/user") || !method.equals("POST");
    }
}
