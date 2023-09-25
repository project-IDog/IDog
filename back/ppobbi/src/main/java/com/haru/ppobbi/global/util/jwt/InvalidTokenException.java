package com.haru.ppobbi.global.util.jwt;

import com.haru.ppobbi.global.error.TokenException;

public class InvalidTokenException extends TokenException {
    public InvalidTokenException() {}
    public InvalidTokenException(String message) {
        super(message);
    }
}
