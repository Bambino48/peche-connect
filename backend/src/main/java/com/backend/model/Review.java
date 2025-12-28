package com.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Buyer buyer;

    @ManyToOne
    private Seller seller;

    @ManyToOne
    private FishProduct fishProduct;

    private Integer freshnessRating;
    private Integer deliveryRating;
    private Integer priceQualityRating;

    private String comment;
    private LocalDateTime createdAt = LocalDateTime.now();
}
