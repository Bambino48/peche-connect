package com.backend.dto;

import com.backend.model.enums.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record FishProductResponse(
        Long id,
        FishType fishType,
        String otherFishName,
        Double quantityKg,
        Double pricePerKg,
        LocalDate fishingDate,
        FishingZone fishingZone,
        ConservationMethod conservationMethod,
        String photoUrl,
        ProductStatus status,
        LocalDateTime createdAt,

        // vendeur
        Long sellerId,
        String sellerType
) {}
