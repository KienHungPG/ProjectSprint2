package com.example.be.controller;

import com.example.be.config.JwtUserDetails;
import com.example.be.model.Customers;
import com.example.be.service.EmailService;
import com.example.be.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@CrossOrigin("*")
@RequestMapping("/api/customer")
@RestController
public class CustomerRestController {
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private EmailService emailService;



    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CUSTOMER')")
    @GetMapping("")
    public ResponseEntity<Customers> getCustomers(){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            JwtUserDetails jwtUserDetails = (JwtUserDetails) authentication.getPrincipal();
            Customers customers = customerService.getCustomer(jwtUserDetails.getUsername());
            return new ResponseEntity<>(customers, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/createCustomer")
    public ResponseEntity<Customers> createCustomer(@RequestBody Customers customers) {

        try {
            customerService.createCustomer(customers);
            LocalDate date = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy");
            String formattedDate = date.format(formatter);
            Context context = new Context();
            context.setVariable("name", customers.getName());
            context.setVariable("date", formattedDate);
            context.setVariable("username", customers.getUsers().getUsername());
            context.setVariable("loginLink", "localhost:3000/login");
            context.setVariable("year", date.getYear());
            emailService.sendEmailWithHtmlTemplate(customers.getEmail(),"Create account successful","confirm",context);
            return new ResponseEntity<>(customers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
