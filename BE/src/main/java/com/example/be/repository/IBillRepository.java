package com.example.be.repository;

import com.example.be.model.Bills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface IBillRepository extends JpaRepository<Bills,Integer> {
//    List<Bills> findAllByCustomersIdOrOrderByCreateDateAsc(Integer id);
    List<Bills> findAllByCustomersIdOrderByCreateDateAsc(Integer id);
}

