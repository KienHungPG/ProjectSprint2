package com.example.be.controller;


import com.example.be.config.JwtUserDetails;
import com.example.be.model.BillDetails;
import com.example.be.model.Bills;
import com.example.be.model.Carts;
import com.example.be.model.Customers;
import com.example.be.service.IBillDetailService;
import com.example.be.service.ICartService;
import com.example.be.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/order")
@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, allowedHeaders = "*", allowCredentials = "true")
public class OrderRestController {
    @Autowired
    private IBillDetailService billDetailService;
    @Autowired
    private ICartService cartService;
    @Autowired
    private ICustomerService customerService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CUSTOMER')")
    @PostMapping("")
    public ResponseEntity<?> createOrder() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        JwtUserDetails jwtUserDetails = (JwtUserDetails) authentication.getPrincipal();
        Customers customers = customerService.getCustomer(jwtUserDetails.getUsername());
        List<Carts> carts =cartService.getAllByCustomer(customers.getId());
        try {
            ResponseEntity<?> re=billDetailService.createOrder(carts,customers);
            if (re.getStatusCode()== HttpStatus.OK){
                cartService.deleteByCustomers(customers);
            }
            return re;
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CUSTOMER')")
    @GetMapping("")
    public ResponseEntity<List<Bills>> getHistory() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            JwtUserDetails jwtUserDetails = (JwtUserDetails) authentication.getPrincipal();
            Customers customers = customerService.getCustomer(jwtUserDetails.getUsername());
            List<Bills> list =billDetailService.getHistory(customers.getId());
            return new ResponseEntity<>(list,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CUSTOMER')")
    @GetMapping("/detail")
    public ResponseEntity<List<BillDetails>> getHistoryDetail(@RequestParam("id") Integer id) {
        try {
            List<BillDetails> list =billDetailService.getHistoryDetail(id);
            if (list.isEmpty()){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(list,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
