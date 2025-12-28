package com.backend.repository;

import com.backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findBySellerId(Long sellerId);

    List<Review> findByFishProductId(Long fishProductId);
}
