package com.haru.ppobbi.global.error;

public class TokenException extends IllegalArgumentException {

    public TokenException() {
    }

    public TokenException(String msg) {
        super(msg);
    }
}
