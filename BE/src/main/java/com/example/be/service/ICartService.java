package com.example.be.service;


import com.example.be.model.Carts;
import com.example.be.model.Customers;
import com.example.be.model.Products;

import java.util.List;

public interface ICartService {
    List<Carts> getAllByCustomer(Integer id);

    void setCart(Integer index, Integer id);

    void createCart(Customers customers, Products products, Integer quantity);

    void deleteById(Integer id);

    void deleteByCustomers(Customers customers);
}
