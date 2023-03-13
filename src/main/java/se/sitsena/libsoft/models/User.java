package se.sitsena.libsoft.models;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import jakarta.persistence.*;

@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // By default enabled, but I do not trust them xD
    private Long id;
    @Column(name = "username", unique = true)
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "token")
    private String token;

    public User() {
    }

    public User(String username, String password, String token) {
        this.username = username;
        this.password = password;
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public String getHashPassword() {
        return password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}


