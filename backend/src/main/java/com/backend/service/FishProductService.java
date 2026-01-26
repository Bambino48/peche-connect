package com.backend.service;

import com.backend.dto.FishProductResponse;
import com.backend.model.FishProduct;
import com.backend.model.Seller;
import com.backend.model.User;
import com.backend.model.enums.FishType;
import com.backend.model.enums.ProductStatus;
import com.backend.repository.FishProductRepository;
import com.backend.repository.SellerRepository;
import com.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FishProductService {

    private final FishProductRepository repository;
    private final SellerRepository sellerRepository;

    /* =========================
       CRÉATION
       ========================= */
    public FishProductResponse createAndReturnDto(FishProduct product) {
        return toDto(create(product));
    }

    private FishProduct create(FishProduct product) {

        if (product.getFishType() == null) {
            throw new IllegalArgumentException("Le type de poisson est obligatoire.");
        }

        if (product.getFishType() == FishType.AUTRE &&
                (product.getOtherFishName() == null || product.getOtherFishName().isBlank())) {
            throw new IllegalArgumentException("Veuillez préciser le type de poisson.");
        }

        if (product.getQuantityKg() == null || product.getQuantityKg() <= 0) {
            throw new IllegalArgumentException("La quantité doit être supérieure à 0.");
        }

        if (product.getFishingDate() == null) {
            throw new IllegalArgumentException("La date de pêche est obligatoire.");
        }

        if (product.getFishingZone() == null) {
            throw new IllegalArgumentException("La zone de pêche est obligatoire.");
        }

        if (product.getPhotoUrl() == null || product.getPhotoUrl().isBlank()) {
            throw new IllegalArgumentException("La photo du produit est obligatoire.");
        }

        if (product.getStatus() == null) {
            product.setStatus(ProductStatus.ACTIF);
        }

        if (product.getSeller() == null) {
            product.setSeller(resolveAuthenticatedSeller());
        }

        return repository.save(product);
    }

    /* =========================
       LECTURE (ANTI LAZY)
       ========================= */
    public List<FishProductResponse> getAllDtos() {
        return repository.findAllWithSeller()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public FishProductResponse getDto(Long id) {
        return repository.findByIdWithSeller(id)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));
    }

    /* =========================
       MISE À JOUR
       ========================= */
    public FishProductResponse updateAndReturnDto(Long id, FishProduct data) {

        FishProduct product = repository.findByIdWithSeller(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        product.setFishType(data.getFishType());
        product.setOtherFishName(data.getOtherFishName());
        product.setQuantityKg(data.getQuantityKg());
        product.setPricePerKg(data.getPricePerKg());
        product.setFishingDate(data.getFishingDate());
        product.setFishingZone(data.getFishingZone());
        product.setConservationMethod(data.getConservationMethod());
        product.setPhotoUrl(data.getPhotoUrl());
        product.setStatus(data.getStatus());

        return toDto(repository.save(product));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    /* =========================
       RÉSOLUTION DU VENDEUR
       ========================= */
    private Seller resolveAuthenticatedSeller() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Utilisateur non authentifié");
        }

        Object principal = authentication.getPrincipal();
        Long userId;

        if (principal instanceof CustomUserDetails cud) {
            userId = cud.getUser().getId();
        } else if (principal instanceof User user) {
            userId = user.getId();
        } else {
            throw new RuntimeException("Principal non supporté");
        }

        return sellerRepository.findByUser_Id(userId)
                .orElseThrow(() ->
                        new RuntimeException("Aucun vendeur associé à cet utilisateur")
                );
    }

    /* =========================
       DTO (SAFE)
       ========================= */
    private FishProductResponse toDto(FishProduct product) {

        Seller seller = product.getSeller(); // déjà chargé

        return new FishProductResponse(
                product.getId(),
                product.getFishType(),
                product.getOtherFishName(),
                product.getQuantityKg(),
                product.getPricePerKg(),
                product.getFishingDate(),
                product.getFishingZone(),
                product.getConservationMethod(),
                product.getPhotoUrl(),
                product.getStatus(),
                product.getCreatedAt(),
                seller.getId(),
                seller.getSellerType()
        );
    }
}
