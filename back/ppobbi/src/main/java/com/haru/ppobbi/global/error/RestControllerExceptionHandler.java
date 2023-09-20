package com.haru.ppobbi.global.error;

import com.haru.ppobbi.global.dto.ResponseDto;
import com.haru.ppobbi.global.error.mmlog.MatterMostSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpServerErrorException;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

@RestControllerAdvice(annotations = RestController.class)
public class RestControllerExceptionHandler {
    @Autowired
    private MatterMostSender matterMostSender;
    @ExceptionHandler(DuplicatedException.class)
    public ResponseEntity<ResponseDto<String>> handleDuplicatedException(DuplicatedException duplicatedException) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
            ResponseDto.create(duplicatedException.getMessage())
        );
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ResponseDto<String>> handleForbiddenException(ForbiddenException forbiddenException) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
            ResponseDto.create(forbiddenException.getMessage())
        );
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ResponseDto<String>> handleNotFoundException(NotFoundException notFoundException) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
            ResponseDto.create(notFoundException.getMessage())
        );
    }

    @ExceptionHandler(TokenException.class)
    public ResponseEntity<ResponseDto<String>> handleTokenException(TokenException tokenException) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
            ResponseDto.create(tokenException.getMessage())
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseDto<String>> handleAllUncaughtException(Exception exception, HttpServletRequest httpServletRequest){
        matterMostSender.sendMessage(exception, httpServletRequest.getRequestURL().toString(), getParams(httpServletRequest));
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ResponseDto.create(exception.getMessage()));
    }

    private String getParams(HttpServletRequest httpServletRequest){
        StringBuilder sb = new StringBuilder();
        Enumeration<String> keys = httpServletRequest.getParameterNames();
        while(keys.hasMoreElements()){
            String key = keys.nextElement();
            sb.append("- ").append(key).append(" : ").append(httpServletRequest.getParameter(key)).append("/n");
        }
        return sb.toString();
    }
}
