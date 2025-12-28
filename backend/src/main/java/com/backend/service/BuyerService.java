package com.backend.service;

import com.backend.model.Buyer;
import com.backend.repository.BuyerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BuyerService {

    private final BuyerRepository buyerRepository;

    public Buyer create(Buyer buyer) {
        return buyerRepository.save(buyer);
    }

    public Buyer get(Long id) {
        return buyerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Acheteur introuvable"));
    }
}
