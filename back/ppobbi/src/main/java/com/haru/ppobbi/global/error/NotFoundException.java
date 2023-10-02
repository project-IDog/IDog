package com.haru.ppobbi.global.error;

public class NotFoundException extends IllegalArgumentException {

    public NotFoundException() {
    }

    public NotFoundException(String msg) {
        super(msg);
    }
}
