package org.cg.dsa_with_vanar_sena.exception;

public class NotFoundException extends RuntimeException{
    private String message;
    public NotFoundException(String msg){
        this.message = msg;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
