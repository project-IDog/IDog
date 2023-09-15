package com.haru.ppobbi.global.error;

public class DuplicatedException extends RuntimeException{
    public DuplicatedException(){}
    public DuplicatedException(String msg){super(msg);}
}
