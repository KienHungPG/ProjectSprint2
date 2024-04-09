package com.example.be.service;

import com.example.be.model.Customers;

public interface ICustomerService {
    Customers getCustomer(String username);

    void createCustomer(Customers customers);
}
