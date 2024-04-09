package com.example.be.controller;

import com.example.be.model.Products;
import com.example.be.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = {"http://localhost:3000"}, allowedHeaders = "*", allowCredentials = "true")
public class ProductRestController {
    @Autowired
    private IProductService productService;

    @GetMapping("")
    public ResponseEntity<Page<Products>> getProducts(@RequestParam(value = "name",defaultValue = "null")String name,
                                                      @RequestParam(value = "page",defaultValue = "0")Integer page){
        Pageable pageable = PageRequest.of(page,9);
        try {
            return new ResponseEntity<>(productService.getAll(name,pageable), HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/detail/{id}")
    public ResponseEntity<Products> getDetailProduct(@PathVariable("id") Integer id){
        try {
            return new ResponseEntity<>(productService.getProduct(id),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
