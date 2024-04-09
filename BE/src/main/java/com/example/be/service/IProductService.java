package com.example.be.service;


import com.example.be.model.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductService {
    Page<Products> getAll(String name, Pageable pageable);

    Products getProduct(Integer id);
}
