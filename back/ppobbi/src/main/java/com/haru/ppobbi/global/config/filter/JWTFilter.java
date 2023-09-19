package com.haru.ppobbi.global.config.filter;

import static com.haru.ppobbi.global.util.oauth.constant.OAuth2ExceptionMessage.NOTFOUND_TOKEN;

import com.haru.ppobbi.global.error.TokenException;
import com.haru.ppobbi.global.util.jwt.JwtTokenProvider;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JWTFilter implements Filter {

    //    private final OAuth2TokenHandler oAuth2TokenHandler;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException, TokenException {
        try {
            ;
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            if (goGoSSing(httpRequest)) { // 로그인 필요없는 경우 통과
                log.debug("gogosing");
                chain.doFilter(request, response);
                return;
            }
            String bearer = httpRequest.getHeader("Authorization");
            log.debug("filter - bearer: {}", bearer);
            String accessToken = bearer.split(" ")[1];

            if (jwtTokenProvider.validateToken(accessToken)) {
                log.debug("[JWTFilter - doFilter] validate 검증 완료!!");
                String userId = jwtTokenProvider.getUserIdFromToken(accessToken);
                log.debug("filter - userId: {}", userId);
                request.setAttribute("userId", userId);
            }

            chain.doFilter(request, response);
        } catch (NullPointerException e) {
            throw new TokenException(NOTFOUND_TOKEN.message());
        }

    }

    private boolean goGoSSing(HttpServletRequest httpServletRequest) {
        String url = httpServletRequest.getServletPath();
        String method = httpServletRequest.getMethod();
        if (url.matches("/api/grave(.*)") && !method.equals("POST")) {
            return true;
        } else if (url.equals("/api/user") && method.equals("POST")) {
            return true;
        }

        return false;
    }
}
