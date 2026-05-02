package org.cg.dsa_with_vanar_sena.dto;

import org.cg.dsa_with_vanar_sena.enums.Status;

public class UserRequestDto {
    private String username;
    private String password;
    private String name;
    private Status status;

    public UserRequestDto(){}

    public UserRequestDto(String username, String password, String name, Status status) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
