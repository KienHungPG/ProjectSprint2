package com.example.be.model;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "username", nullable = false, unique = true, length = 20)
    private String username;

    @Column(name = "password", nullable = false, columnDefinition = "TEXT")
    private String password;
    @Column(name = "verification_code")
    private Integer verificationCode;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Roles roles;
    @Column(length = 50)
    private String email;
}
