package org.cg.dsa_with_vanar_sena.dto;

import org.cg.dsa_with_vanar_sena.enums.Status;

public class UserResponseDto {
    private String username;
    private String name;
    private Status status;

    public UserResponseDto(){}

    public UserResponseDto(String username, String name, Status status) {
        this.username = username;
        this.name = name;
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
