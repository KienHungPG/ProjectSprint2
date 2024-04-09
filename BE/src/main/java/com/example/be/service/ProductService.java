package com.example.be.service;

import com.example.be.model.Products;
import com.example.be.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService implements IProductService{
    @Autowired
    private IProductRepository productRepository;
    @Override
    public Page<Products> getAll(String name, Pageable pageable) {
        if (name.equals("null")){
            return productRepository.getAll("",pageable);

        }else {
            return productRepository.getAll(name,pageable);
        }
    }

    @Override
    public Products getProduct(Integer id) {
        return productRepository.findById(id).orElse(null);
    }
}
