package com.example.be.repository;

import com.example.be.model.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductRepository extends JpaRepository<Products, Integer> {
    @Query(value = "select p.id,p.product_name,p.price,p.quantity,p.descrip ,p.image_thumb ,p.category,p.create_date,p.update_date,p.is_delete from products as p join category as c on c.id = p.category where c.name like concat('%',:name,'%') and  p.is_delete =false", nativeQuery = true)
    Page<Products> getAll(@Param("name") String name, Pageable pageable);
}
