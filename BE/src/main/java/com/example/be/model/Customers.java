package com.example.be.model;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "customers")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Customers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String birthday;
    @Column(nullable = false)
    private int gender;
    @Column(nullable = false,unique = true,length = 10)
    private String phoneNumber;
    @Column(nullable = false,unique = true,length = 50)
    private String email;
    @Column(nullable = false)
    private String address;
    private String image;
    @Column(name = "create_date", columnDefinition = "DATETIME DEFAULT now()", updatable = false)
    private LocalDateTime createDate;
    @Column(name = "update_date", columnDefinition = "DATETIME DEFAULT now()", updatable = true)
    private LocalDateTime updateDate;
    @Column(columnDefinition = "BIT DEFAULT 0", updatable = true)
    private boolean isDelete;
    @OneToOne
    @JoinColumn(name = "user_id")
    private Users users;
}
