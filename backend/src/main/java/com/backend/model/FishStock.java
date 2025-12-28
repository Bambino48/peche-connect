package com.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "fish_stock")
public class FishStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private FishProduct fishProduct;

    private Double availableWeightKg;
    private Double unitPrice;
    private Double minimumOrderKg;
    private String availabilityStatus;
    private Integer freshnessDurationHours;
}
