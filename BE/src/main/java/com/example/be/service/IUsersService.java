package com.example.be.service;


import com.example.be.model.Users;

public interface IUsersService {
    Users findByUsername(String username);

    Users findByEmail(String email);

    void editUser(Users users);

    Users findById(Integer id);

    void saveNewPassword(Users users);
}
