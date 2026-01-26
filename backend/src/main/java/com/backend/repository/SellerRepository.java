package com.backend.repository;

import com.backend.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller, Long> {

    List<Seller> findByVerifiedTrue();

    // ✅ CORRECTION IMPORTANTE
    Optional<Seller> findByUser_Id(Long userId);
}
