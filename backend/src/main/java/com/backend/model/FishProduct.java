package com.backend.model;

import com.backend.model.enums.ConservationMethod;
import com.backend.model.enums.FishType;
import com.backend.model.enums.FishingZone;
import com.backend.model.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "fish_products")
public class FishProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* 🐟 Type de poisson */
    @Enumerated(EnumType.STRING)
    @Column(name = "fish_type", nullable = false, length = 30)
    private FishType fishType;

    /* Autre poisson (obligatoire si fishType = AUTRE) */
    @Column(name = "other_fish_name", length = 100)
    private String otherFishName;

    /* ⚖️ Quantité (kg) */
    @Column(name = "quantity_kg", nullable = false)
    private Double quantityKg;

    /* 💰 Prix par kg */
    @Column(name = "price_per_kg")
    private Double pricePerKg;

    /* 📅 Date de pêche */
    @Column(name = "fishing_date", nullable = false)
    private LocalDate fishingDate;

    /* 🌊 Zone de pêche */
    @Enumerated(EnumType.STRING)
    @Column(name = "fishing_zone", nullable = false, length = 30)
    private FishingZone fishingZone;

    /* ❄️ Méthode de conservation */
    @Enumerated(EnumType.STRING)
    @Column(name = "conservation_method", length = 30)
    private ConservationMethod conservationMethod;

    /* 📷 Photo (base64 ou URL longue) */
    @Lob
    @Column(name = "photo_url", nullable = false, columnDefinition = "LONGTEXT")
    private String photoUrl;

    /* 🟢 Statut */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ProductStatus status;

    /* ⏱️ Date de création */
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /* 👤 Vendeur */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "seller_id", nullable = false)
    private Seller seller;

    /* Initialisation automatique */
    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
