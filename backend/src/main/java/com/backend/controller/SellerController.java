package com.backend.controller;

import com.backend.model.Seller;
import com.backend.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sellers")
@RequiredArgsConstructor
public class SellerController {

    private final SellerService service;

    @PostMapping
    public Seller create(@RequestBody Seller seller) {
        return service.create(seller);
    }

    @GetMapping
    public List<Seller> getVerified() {
        return service.getVerifiedSellers();
    }

    @GetMapping("/{id}")
    public Seller get(@PathVariable Long id) {
        return service.verifySeller(id);
    }

    @PutMapping("/{id}/verify")
    public Seller verify(@PathVariable Long id) {
        return service.verifySeller(id);
    }
}
