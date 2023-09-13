package com.haru.ppobbi.global.error;

public class ForbiddenException extends RuntimeException{
    public ForbiddenException(){}
    public ForbiddenException(String msg){super(msg);}
}
