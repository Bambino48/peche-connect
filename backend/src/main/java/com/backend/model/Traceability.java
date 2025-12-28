package com.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "traceability")
public class Traceability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private FishProduct fishProduct;

    private String harvestMethod;
    private String storageConditions;
    private Boolean sanitaryCompliance;
    private String trackingCode;
}
