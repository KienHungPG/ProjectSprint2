package com.example.be.repository;

import com.example.be.model.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICustomerRepository extends JpaRepository<Customers, Integer> {
    Customers findByUsersUsername(String username);
}
