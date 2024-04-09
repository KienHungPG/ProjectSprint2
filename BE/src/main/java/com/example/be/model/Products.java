package com.example.be.model;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "product_name", nullable = false)
    private String name;
    @Column(name = "price", nullable = false)
    private Double price;
    @Column(name = "quantity", nullable = false)
    private Integer quantity;
    @Column(name = "isDelete", nullable = false)
    private boolean isDelete;
    @Column(columnDefinition = "DATETIME DEFAULT now()")
    @CreationTimestamp
    private LocalDateTime createDate;
    @Column(columnDefinition = "DATETIME DEFAULT now()")
    @UpdateTimestamp
    private LocalDateTime updateDate;
    @Column(name = "descrip",length = 1000)
    private String description;
    @ManyToOne
    @JoinColumn(name = "category")
    private Category category;

    private String imageThumb;

    @OneToMany(mappedBy = "products",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Images> images;
}
