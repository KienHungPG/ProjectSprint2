package com.example.be.service;

import com.example.be.model.BillDetails;
import com.example.be.model.Bills;
import com.example.be.model.Carts;
import com.example.be.model.Customers;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IBillDetailService {
    ResponseEntity<?> createOrder(List<Carts> carts, Customers customers);

    List<Bills> getHistory(Integer id);

    List<BillDetails> getHistoryDetail(Integer id);
}
