package com.haru.ppobbi.global.config.filter;

import static com.haru.ppobbi.global.util.jwt.constant.TokenSubject.ACCESS_TOKEN;
import static com.haru.ppobbi.global.util.jwt.constant.TokenSubject.REFRESH_TOKEN;
import static com.haru.ppobbi.global.util.oauth.constant.OAuth2ExceptionMessage.INVALID_TOKEN;
import static com.haru.ppobbi.global.util.oauth.constant.OAuth2ExceptionMessage.NOTFOUND_TOKEN;

import com.haru.ppobbi.global.error.TokenException;
import com.haru.ppobbi.global.util.jwt.JwtTokenHandler;
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
public class JWTFilter implements Filter {

    private final JwtTokenHandler jwtTokenHandler;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException, TokenException {
        try {
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            if (doNotNeedLogin(httpRequest)) { // 로그인 필요없는 경우 통과
                log.debug("gogosing");
                chain.doFilter(request, response);
                return;
            }

            String bearer = httpRequest.getHeader("Authorization");
            log.debug("filter - bearer: {}", bearer);
            String token = bearer.split(" ")[1];
            String tokenSubject = jwtTokenHandler.getTokenSubject(token);

            if (jwtTokenHandler.validateToken(token)) {
                log.debug("[JWTFilter - doFilter] validate 검증 완료!!");

                if (needRefresh(httpRequest)) { // access token 재발급 요청 시 해당 동작 수행
                    // JWT Token Subject 체크
                    if (tokenSubject.equals(ACCESS_TOKEN.message())) {
                        throw new TokenException(INVALID_TOKEN.message());
                    }
                } else {
                    // Refresh Token 일 경우 유효하지 않은 토큰
                    if (tokenSubject.equals(REFRESH_TOKEN.message())) {
                        throw new TokenException(INVALID_TOKEN.message());
                    }
                }

                Integer userNo = jwtTokenHandler.getUserNoFromToken(token);
                log.debug("filter - userNo: {}", userNo);
                request.setAttribute("userNo", userNo);
            }
            chain.doFilter(request, response);
        } catch (NullPointerException e) {
            throw new TokenException(NOTFOUND_TOKEN.message());
        }

    }

    private boolean doNotNeedLogin(HttpServletRequest httpServletRequest) {
        String url = httpServletRequest.getServletPath();
        String method = httpServletRequest.getMethod();
        if (url.matches("/api/grave(.*)") && !method.equals("POST")) {
            return true;
        } else if (url.equals("/api/user") && method.equals("POST")) {
            return true;
        } else if (url.equals("/api/walking") && method.equals("POST")){
            return true;
        }else if(url.matches("/api/flower(.*)")){
            return true;
        }

        return false;
    }

    private boolean needRefresh(HttpServletRequest httpServletRequest) {
        String url = httpServletRequest.getServletPath();
        return url.matches("/api/user/token");
    }
}
