package com.haru.ppobbi.global.util.jwt;

import com.haru.ppobbi.global.error.TokenException;

public class ExpiredTokenException extends TokenException {
    public ExpiredTokenException() {}
    public ExpiredTokenException(String message) {
        super(message);
    }
}
