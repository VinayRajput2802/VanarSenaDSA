package org.cg.dsa_with_vanar_sena.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.cg.dsa_with_vanar_sena.dto.ExceptionDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ExceptionDto> notFoundExceptionHandler(NotFoundException exception, HttpServletRequest httpServletRequest){
        return new ResponseEntity<>(new ExceptionDto(exception.getMessage(),httpServletRequest.getRequestURI(), HttpStatus.NOT_FOUND, LocalDateTime.now()),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FoundException.class)
    public ResponseEntity<ExceptionDto> foundExceptionHandler(FoundException exception, HttpServletRequest httpServletRequest){
        return new ResponseEntity<>(new ExceptionDto(exception.getMessage(),httpServletRequest.getRequestURI(), HttpStatus.FOUND, LocalDateTime.now()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ExceptionDto> runtimeExceptionHandler(RuntimeException exception,HttpServletRequest httpServletRequest){
        return new ResponseEntity<>(new ExceptionDto(exception.getMessage(),httpServletRequest.getRequestURI(),HttpStatus.BAD_REQUEST,LocalDateTime.now()),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidOtpException.class)
    public ResponseEntity<ExceptionDto> invalidOtpHandler(InvalidOtpException exception,HttpServletRequest httpServletRequest){
        return new ResponseEntity<>(new ExceptionDto(exception.getMessage(),httpServletRequest.getRequestURI(),HttpStatus.EXPECTATION_FAILED,LocalDateTime.now()),HttpStatus.EXPECTATION_FAILED);
    }
}
