package com.haru.ppobbi.global.config.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.haru.ppobbi.global.error.TokenException;
import lombok.Data;
import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ExceptionHandlerFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            filterChain.doFilter(request, response);
        }catch(NullPointerException | TokenException e){
            setErrorResponse(response, e);
        }
    }

    private void setErrorResponse(HttpServletResponse response, Exception error){
         ObjectMapper objectMapper = new ObjectMapper();
         response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
         response.setContentType(MediaType.APPLICATION_JSON_VALUE);
         ErrorResponse errorResponse = new ErrorResponse(error.getMessage());
         try{
             response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
         }catch (IOException e){
             e.printStackTrace();
         }
    }

    @Data
    private static class ErrorResponse{
        private final String message;
    }
}
