package com.haru.ppobbi.global.error;

public class ForbiddenException extends SecurityException {
    public ForbiddenException(){}
    public ForbiddenException(String msg){super(msg);}
}
