package org.cg.dsa_with_vanar_sena.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import org.cg.dsa_with_vanar_sena.enums.Status;

@Entity
public class User {
    @Id
    private String username;
    @Email(message="Email Should be Valid")
    @Column(unique = true)
    private String email;
    private String password;
    private String name;
    @Enumerated(EnumType.STRING)
    private Status status;

    public User(){}

    public User(String username, String email, String password, String name, Status status) {
        this.username = username;
        this.email = email;
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

    public Status getActive() {
        return status;
    }

    public void setActive(Status status) {
        this.status = status;
    }
}
