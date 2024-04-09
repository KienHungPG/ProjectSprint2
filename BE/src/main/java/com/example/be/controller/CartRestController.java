package com.example.be.controller;

import com.example.be.config.JwtUserDetails;
import com.example.be.model.Carts;
import com.example.be.model.Customers;
import com.example.be.model.Products;
import com.example.be.service.ICartService;
import com.example.be.service.ICustomerService;
import com.example.be.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("/api/shopping")
@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, allowedHeaders = "*", allowCredentials = "true")
public class CartRestController {
    @Autowired
    private ICartService cartService;
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private IProductService productService;

    @GetMapping("")
    public ResponseEntity<List<Carts>> getCart(HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession();
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication.getPrincipal().equals("anonymousUser")) {
                List<Carts> carts = (List<Carts>) session.getAttribute("cart");
                return new ResponseEntity<>(carts, HttpStatus.OK);
            }
            JwtUserDetails jwtUserDetails = (JwtUserDetails) authentication.getPrincipal();
            Customers customers = customerService.getCustomer(jwtUserDetails.getUsername());
            return new ResponseEntity<>(cartService.getAllByCustomer(customers.getId()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> saveCartSession(@RequestBody Carts carts, HttpServletRequest httpServletRequest) {
        List<Carts> cartsList = new ArrayList<>();
        HttpSession httpSession = httpServletRequest.getSession();
        if (httpSession.getAttribute("cart") != null) {
            cartsList = (List<Carts>) httpSession.getAttribute("cart");
            int count = 0;
            for (int i = 0; i < cartsList.size(); i++) {
                if (carts.getProducts().getId() == cartsList.get(i).getProducts().getId()) {
                    cartsList.get(i).setPrice((cartsList.get(i).getQuantity() + carts.getQuantity())*cartsList.get(i).getProducts().getPrice());
                    cartsList.get(i).setQuantity(cartsList.get(i).getQuantity() + carts.getQuantity());
                    count++;
                }
            }
            if (count == 0) {
                carts.setPrice(carts.getProducts().getPrice()*carts.getQuantity());
                cartsList.add(carts);
            }
        } else {
            carts.setPrice(carts.getProducts().getPrice()*carts.getQuantity());
            cartsList.add(carts);
            httpSession.setAttribute("cart", cartsList);

        }
        httpSession.setAttribute("cart", cartsList);
        return new ResponseEntity<>(httpSession.getAttribute("cart"), HttpStatus.OK);
    }

    @PostMapping("/{index}/{id}")
    public ResponseEntity<?> setCart(@PathVariable Integer index, @PathVariable Integer id,HttpServletRequest httpServletRequest) {
        List<Carts> cartsList = new ArrayList<>();
        HttpSession httpSession = httpServletRequest.getSession();
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication.getPrincipal().equals("anonymousUser")) {
                cartsList = (List<Carts>) httpSession.getAttribute("cart");
                if (cartsList != null){
                    for (int i = 0; i < cartsList.size(); i++) {
                        if (cartsList.get(i).getProducts().getId() == id){
                            if (index==0){
                                cartsList.get(i).setPrice(cartsList.get(i).getProducts().getPrice()*(cartsList.get(i).getQuantity()-1));
                                cartsList.get(i).setQuantity(cartsList.get(i).getQuantity()-1);
                            }else {
                                cartsList.get(i).setPrice(cartsList.get(i).getProducts().getPrice()*(cartsList.get(i).getQuantity()+1));
                                cartsList.get(i).setQuantity(cartsList.get(i).getQuantity()+1);
                            }
                        }
                    }
                }
                httpSession.setAttribute("cart", cartsList);
                return new ResponseEntity<>(HttpStatus.OK);
            }
            cartService.setCart(index, id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CUSTOMER')")
    @PostMapping("/create/{id}/{quantity}")
    public ResponseEntity<?> createCart( @PathVariable Integer id, @PathVariable Integer quantity) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            JwtUserDetails jwtUserDetails = (JwtUserDetails) authentication.getPrincipal();
            Products products = productService.getProduct(id);
            Customers customers = customerService.getCustomer(jwtUserDetails.getUsername());
            cartService.createCart(customers, products, quantity);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CUSTOMER')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCart(@PathVariable Integer id) {
        try {
            cartService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deleteSession/{id}")
    public ResponseEntity<?> deleteCartToSession(@PathVariable Integer id,HttpServletRequest httpServletRequest) {
        List<Carts> cartsList = new ArrayList<>();
        HttpSession httpSession = httpServletRequest.getSession();
        if (httpSession.getAttribute("cart") != null) {
            cartsList = (List<Carts>) httpSession.getAttribute("cart");
            for (int i = 0; i < cartsList.size(); i++) {
                if (id == cartsList.get(i).getProducts().getId()) {
                    cartsList.remove(i);
                }
            }
            httpSession.setAttribute("cart", cartsList);
            return new  ResponseEntity<>(HttpStatus.OK);
        }
        return new  ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }
}
