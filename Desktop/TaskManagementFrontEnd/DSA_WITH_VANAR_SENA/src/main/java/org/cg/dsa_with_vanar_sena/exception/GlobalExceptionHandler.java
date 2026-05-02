package org.cg.dsa_with_vanar_sena.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.cg.dsa_with_vanar_sena.dto.ExceptionDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ExceptionDto notFoundExceptionHandler(NotFoundException exception, HttpServletRequest httpServletRequest){
        return new ExceptionDto(exception.getMessage(),httpServletRequest.getRequestURI(), HttpStatus.NOT_FOUND, LocalDateTime.now());
    }

    @ExceptionHandler(FoundException.class)
    public ExceptionDto foundExceptionHandler(FoundException exception, HttpServletRequest httpServletRequest){
        return new ExceptionDto(exception.getMessage(),httpServletRequest.getRequestURI(), HttpStatus.FOUND, LocalDateTime.now());
    }

    @ExceptionHandler(RuntimeException.class)
    public ExceptionDto runtimeExceptionHandler(RuntimeException exception,HttpServletRequest httpServletRequest){
        return new ExceptionDto(exception.getMessage(),httpServletRequest.getRequestURI(),HttpStatus.BAD_REQUEST,LocalDateTime.now());
    }

    @ExceptionHandler(InvalidOtpException.class)
    public ExceptionDto invalidOtpHandler(InvalidOtpException exception,HttpServletRequest httpServletRequest){
        return new ExceptionDto(exception.getMessage(),httpServletRequest.getRequestURI(),HttpStatus.EXPECTATION_FAILED,LocalDateTime.now());
    }
}
