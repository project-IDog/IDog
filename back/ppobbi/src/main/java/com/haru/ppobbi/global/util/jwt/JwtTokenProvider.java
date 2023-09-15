package com.haru.ppobbi.global.util.jwt;

import static com.haru.ppobbi.global.util.jwt.constant.JwtExceptionMessage.EXPIRED_TOKEN;
import static com.haru.ppobbi.global.util.jwt.constant.JwtExceptionMessage.INVALID_TOKEN;

import com.haru.ppobbi.global.error.TokenException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import org.springframework.beans.factory.annotation.Value;
import io.jsonwebtoken.io.Decoders;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    private final Key key;

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean validateToken(String accessToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJwt(accessToken);
            return true;
        } catch (MalformedJwtException | SecurityException | IllegalArgumentException e) {
            System.out.println(e.getStackTrace());
            throw new TokenException(INVALID_TOKEN.getMessage());
        } catch (ExpiredJwtException e) {
            throw new TokenException(EXPIRED_TOKEN.getMessage());
        }
    }

}
