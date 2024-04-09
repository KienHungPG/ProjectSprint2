package com.example.be.repository;

import com.example.be.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoleRepository extends JpaRepository<Roles, Integer> {
}
