package com.example.be.repository;

import com.example.be.model.Carts;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ICartRepository extends JpaRepository<Carts,Integer> {
    List<Carts> findAllByCustomersId(Integer id);
    @Query(value = "select * from carts where product_id = :idProduct and customer_id = :idCustomer",nativeQuery = true)
    Carts getCartToCreate(Integer idProduct,Integer idCustomer );
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM carts WHERE customer_id = :id", nativeQuery = true)
    void deleteByCustomers(@Param("id") Integer id);
}
