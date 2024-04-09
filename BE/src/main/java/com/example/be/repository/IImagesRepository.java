package com.example.be.repository;

import com.example.be.model.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IImagesRepository extends JpaRepository<Images, Integer> {
    List<Images> findAllByProductsId(Integer id);

    @Query(nativeQuery = true,value = "select i.* from images_product as i join products as p on p.id = i.product_id where p.id = :id ")
    List<Images> findALlImage(@Param("id") Integer id);
}
