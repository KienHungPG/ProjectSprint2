package com.example.be.repository;

import com.example.be.model.BillDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface IBillDetailRepository extends JpaRepository<BillDetails, Integer> {
    List<BillDetails> findAllByBillsId(Integer id);
}
