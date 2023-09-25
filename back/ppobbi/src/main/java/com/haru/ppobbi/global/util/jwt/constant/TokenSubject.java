package com.haru.ppobbi.global.util.jwt.constant;

public enum TokenSubject {
    ACCESS_TOKEN("Access Token"),
    REFRESH_TOKEN("Refresh Token");

    private String message;

    TokenSubject(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
