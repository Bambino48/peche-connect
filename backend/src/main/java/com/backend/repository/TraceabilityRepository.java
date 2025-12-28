package com.backend.repository;

import com.backend.model.Traceability;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TraceabilityRepository extends JpaRepository<Traceability, Long> {

    Optional<Traceability> findByFishProductId(Long fishProductId);
}
