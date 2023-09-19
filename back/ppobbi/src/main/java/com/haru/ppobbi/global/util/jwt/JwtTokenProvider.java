package com.haru.ppobbi.global.util.jwt;

import static com.haru.ppobbi.global.util.oauth.constant.OAuth2ExceptionMessage.EXPIRED_TOKEN;
import static com.haru.ppobbi.global.util.oauth.constant.OAuth2ExceptionMessage.INVALID_TOKEN;

import com.haru.ppobbi.domain.user.dto.TokenInfo;
import com.haru.ppobbi.global.error.TokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtTokenProvider {

    private final Key key;

    @Value("${jwt.access-expired-in}")
    private long ACCESS_TOKEN_EXPIRED_IN;

    @Value("${jwt.refresh-expired-in}")
    private long REFRESH_TOKEN_EXPIRED_IN;

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64URL.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public TokenInfo generateToken(Integer userNo) {

        long currentTime = (new Date()).getTime();

        Date accessTokenExpiresIn = new Date(currentTime + ACCESS_TOKEN_EXPIRED_IN);
        String accessToken = Jwts.builder()
            .setSubject(String.valueOf(userNo)) // 토큰 제목 -> user no 들어가는게 맞는지..
            .claim("user-no", userNo)
            .setExpiration(accessTokenExpiresIn)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();

        Date refreshTokenExpiresIn = new Date(currentTime + REFRESH_TOKEN_EXPIRED_IN);
        String refreshToken = Jwts.builder()
            .setSubject(String.valueOf(userNo))
            .claim("user-no", userNo)
            .setExpiration(refreshTokenExpiresIn)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();

        return TokenInfo.builder()
            .grantType("Bearer")
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJwt(token);
            return true;
        } catch (SecurityException | MalformedJwtException | UnsupportedJwtException |
                 IllegalArgumentException e) {
            throw new TokenException(INVALID_TOKEN.message());
        } catch (ExpiredJwtException e) {
            throw new TokenException(EXPIRED_TOKEN.message());
        }
    }

    public Integer getUserNoFromToken(String accessToken) {
        Claims claims = parseClaims(accessToken);

        if(claims.get("user-no") == null) {
            throw new TokenException(INVALID_TOKEN.message());
        }

        log.debug("[DEBUG/getUserNoFromToken] claims : {}", claims);
        return null;
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(accessToken)
                .getBody();
        } catch (ExpiredJwtException e) {
            throw new TokenException(EXPIRED_TOKEN.message());
        }
    }
}
