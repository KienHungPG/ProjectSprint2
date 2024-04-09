package com.example.be.service;

import com.example.be.model.Customers;
import com.example.be.model.Roles;
import com.example.be.model.Users;
import com.example.be.repository.ICustomerRepository;
import com.example.be.repository.IRoleRepository;
import com.example.be.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomerService implements ICustomerService{
    @Autowired
    private ICustomerRepository customerRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IRoleRepository roleRepository;
    @Override
    public Customers getCustomer(String username) {
        return customerRepository.findByUsersUsername(username);
    }

    @Override
    public void createCustomer(Customers customers) {
        Roles roles = roleRepository.findById(2).orElse(null);
        Users users = new Users();
        users.setRoles(roles);
        String password = passwordEncoder.encode(customers.getUsers().getPassword());
        users.setPassword(password);
        users.setEmail(customers.getEmail());
        users.setUsername(customers.getUsers().getUsername());
        userRepository.save(users);
        customers.setUsers(users);
        customerRepository.save(customers);
    }
}
