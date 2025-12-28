package com.backend.model;

import com.backend.model.enums.FishState;
import com.backend.model.enums.FishType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "fish_products")
public class FishProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameLocal;
    private String nameScientific;

    @Enumerated(EnumType.STRING)
    private FishType fishType;

    @Enumerated(EnumType.STRING)
    private FishState state;

    private String originType;
    private String fishingZone;
    private LocalDate fishingDate;

    private String averageSize;
    private String qualityGrade;
    private String conservationMethod;
    private String certifications;

    private Boolean halal;
    private String seasonality;

    @ManyToOne
    private Seller seller;
}
