package org.cg.dsa_with_vanar_sena.dto;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class ExceptionDto {
    private String message;
    private String apiPath;
    private HttpStatus errorCode;
    private LocalDateTime errorTime;

    public ExceptionDto(String message, String apiPath, HttpStatus errorCode, LocalDateTime errorTime) {
        this.message = message;
        this.apiPath = apiPath;
        this.errorCode = errorCode;
        this.errorTime = errorTime;
    }

    public ExceptionDto(){}
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getApiPath() {
        return apiPath;
    }

    public void setApiPath(String apiPath) {
        this.apiPath = apiPath;
    }

    public HttpStatus getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(HttpStatus errorCode) {
        this.errorCode = errorCode;
    }

    public LocalDateTime getErrorTime() {
        return errorTime;
    }

    public void setErrorTime(LocalDateTime errorTime) {
        this.errorTime = errorTime;
    }
}
