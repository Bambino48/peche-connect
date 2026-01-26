package com.backend.repository;

import com.backend.model.FishProduct;
import com.backend.model.enums.FishType;
import com.backend.model.enums.ProductStatus;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FishProductRepository extends JpaRepository<FishProduct, Long> {

    /* 🐟 Filtrer par type de poisson */
    List<FishProduct> findByFishType(FishType fishType);

    /* 🟢 Produits actifs */
    List<FishProduct> findByStatus(ProductStatus status);

    /* 👤 Produits d’un vendeur */
    List<FishProduct> findBySellerId(Long sellerId);

    /* ===============================
       🔥 FETCH JOIN (ANTI LAZY)
       =============================== */

    @Query("""
        select fp
        from FishProduct fp
        join fetch fp.seller s
    """)
    List<FishProduct> findAllWithSeller();

    @Query("""
        select fp
        from FishProduct fp
        join fetch fp.seller s
        where fp.id = :id
    """)
    Optional<FishProduct> findByIdWithSeller(@Param("id") Long id);
}
