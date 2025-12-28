package com.backend.service;

import com.backend.model.FishStock;
import com.backend.repository.FishStockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FishStockService {

    private final FishStockRepository repository;

    public FishStock save(FishStock stock) {
        return repository.save(stock);
    }

    public FishStock getByProduct(Long productId) {
        return repository.findByFishProductId(productId)
                .orElseThrow(() -> new RuntimeException("Stock introuvable"));
    }
}
