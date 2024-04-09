package com.example.be.service;

import com.example.be.model.BillDetails;
import com.example.be.model.Bills;
import com.example.be.model.Carts;
import com.example.be.model.Customers;
import com.example.be.repository.IBillDetailRepository;
import com.example.be.repository.IBillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Random;

@Service
public class BillDetailService implements IBillDetailService{
    @Autowired
    private IBillDetailRepository billDetailRepository;

    @Autowired
    private IBillRepository billRepository;



    @Transactional
    @Override
    public ResponseEntity<?> createOrder(List<Carts> carts, Customers customers) {
        boolean check =false;
        for (int i = 0; i < carts.size(); i++) {
            if(carts.get(i).getQuantity() > carts.get(i).getProducts().getQuantity()){
                check= true;
            }
        }
        if (check ==true){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    "The number of products is not enough ! Please reduce the corresponding purchase amount !");
        }else {
            Bills bills = new Bills();
            bills.setCustomers(customers);
            bills.setTotalPrice(0.0);
            billRepository.save(bills);
            Double price =0.0;
            for (int i = 0; i < carts.size(); i++) {
                BillDetails billDetail =new BillDetails();
                billDetail.setBills(bills);
                billDetail.setProducts(carts.get(i).getProducts());
                billDetail.setQuantity(carts.get(i).getQuantity());
                billDetail.setPrice(carts.get(i).getPrice());
                billDetail.getProducts().setQuantity(billDetail.getProducts().getQuantity() - billDetail.getQuantity());
                billDetailRepository.save(billDetail);
                price += carts.get(i).getPrice();
            }
            List<Bills> list=billRepository.findAll();
            long code;
            Random random = new Random();
            long min = 10000;
            long max = 99999;
            boolean flag;
            String orderCode;
            do {
                flag = true;
                code = random.nextLong() % (max - min + 1) + min;
                orderCode = "OD-" + code;
                for (int i = 0; i < list.size(); i++) {
                    if (Objects.equals(list.get(i).getCode(), orderCode)) {
                        flag = false;
                    }
                }
            } while (!flag);
            bills.setCode(orderCode);
            bills.setTotalPrice(price);
            billRepository.save(bills);
            return new ResponseEntity<>(HttpStatus.OK);
        }

    }

    @Override
    public List<Bills> getHistory(Integer id) {
        return billRepository.findAllByCustomersIdOrderByCreateDateAsc(id);
    }

    @Override
    public List<BillDetails> getHistoryDetail(Integer id) {
        return billDetailRepository.findAllByBillsId(id);
    }
}
