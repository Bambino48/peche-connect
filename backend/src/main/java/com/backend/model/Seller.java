package com.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sellers")
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    private String sellerType; // PECHEUR / COOPERATIVE
    private String logo;
    private String serviceHours;

    private Double totalSales;
    private Double averageRating;
    private Boolean verified;
}
