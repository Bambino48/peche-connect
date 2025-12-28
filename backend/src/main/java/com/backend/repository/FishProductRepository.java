package com.backend.repository;


import com.backend.model.FishProduct;
import com.backend.model.enums.FishState;
import com.backend.model.enums.FishType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FishProductRepository extends JpaRepository<FishProduct, Long> {

    List<FishProduct> findByFishType(FishType fishType);

    List<FishProduct> findByState(FishState state);

    List<FishProduct> findBySellerId(Long sellerId);

    List<FishProduct> findByQualityGrade(String qualityGrade);

    List<FishProduct> findByHalalTrue();
}
