package com.backend.service;

import com.backend.model.FishProduct;
import com.backend.repository.FishProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FishProductService {

    private final FishProductRepository repository;

    public FishProduct create(FishProduct product) {
        return repository.save(product);
    }

    public FishProduct get(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));
    }

    public List<FishProduct> getAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
