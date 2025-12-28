package com.backend.service;

import com.backend.model.Seller;
import com.backend.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerService {

    private final SellerRepository sellerRepository;

    public Seller create(Seller seller) {
        seller.setVerified(false);
        seller.setAverageRating(0.0);
        seller.setTotalSales(0.0);
        return sellerRepository.save(seller);
    }

    public List<Seller> getVerifiedSellers() {
        return sellerRepository.findByVerifiedTrue();
    }

    public Seller verifySeller(Long id) {
        Seller seller = sellerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendeur introuvable"));
        seller.setVerified(true);
        return sellerRepository.save(seller);
    }
}
