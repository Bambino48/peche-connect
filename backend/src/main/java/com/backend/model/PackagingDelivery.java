package com.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "packaging_delivery")
public class PackagingDelivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private FishProduct fishProduct;

    private String packagingType;
    private String deliveryZone;
    private String deliveryDelay;
    private Double deliveryFee;
    private Boolean pickupAvailable;
    private String delayPolicy;
}
