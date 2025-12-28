package com.backend.repository;

import com.backend.model.FishStock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FishStockRepository extends JpaRepository<FishStock, Long> {

    Optional<FishStock> findByFishProductId(Long fishProductId);
}
