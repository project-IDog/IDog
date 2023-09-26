package com.haru.ppobbi.global.error;

public class DuplicatedException extends IllegalArgumentException{
    public DuplicatedException(){}
    public DuplicatedException(String msg){super(msg);}
}
