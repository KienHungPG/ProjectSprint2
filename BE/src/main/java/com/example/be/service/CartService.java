package com.example.be.service;

import com.example.be.model.Carts;
import com.example.be.model.Customers;
import com.example.be.model.Products;
import com.example.be.repository.ICartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService implements ICartService{
    @Autowired
    private ICartRepository cartRepository;

    @Override
    public List<Carts> getAllByCustomer(Integer id) {
        return cartRepository.findAllByCustomersId(id);
    }

    @Override
    public void setCart(Integer index, Integer id) {
        Carts carts = cartRepository.findById(id).orElse(null);
        if (index == 0){
            carts.setPrice(carts.getProducts().getPrice()*(carts.getQuantity()-1));
            carts.setQuantity(carts.getQuantity()-1);
            cartRepository.save(carts);
        }else {
            carts.setPrice(carts.getProducts().getPrice()*(carts.getQuantity()+1));
            carts.setQuantity(carts.getQuantity()+1);
            cartRepository.save(carts);
        }

    }

    @Override
    public void createCart(Customers customers, Products products, Integer quantity) {
        Carts carts = cartRepository.getCartToCreate(products.getId(),customers.getId());
        if (carts == null){
            Carts newCarts = new Carts();
            newCarts.setPrice(products.getPrice()*quantity);
            newCarts.setQuantity(quantity);
            newCarts.setCustomers(customers);
            newCarts.setProducts(products);
            cartRepository.save(newCarts);
        }else {
            carts.setPrice(carts.getProducts().getPrice()*(carts.getQuantity()+quantity));
            carts.setQuantity(carts.getQuantity()+quantity);
            cartRepository.save(carts);
        }
    }

    @Override
    public void deleteById(Integer id) {
        cartRepository.deleteById(id);
    }

    @Override
    public void deleteByCustomers(Customers customers) {
        cartRepository.deleteByCustomers(customers.getId());
    }
}
