package com.backend.controller;

import com.backend.model.FishStock;
import com.backend.service.FishStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stocks")
@RequiredArgsConstructor
public class FishStockController {

    private final FishStockService service;

    @PostMapping
    public FishStock save(@RequestBody FishStock stock) {
        return service.save(stock);
    }

    @GetMapping("/product/{productId}")
    public FishStock getByProduct(@PathVariable Long productId) {
        return service.getByProduct(productId);
    }
}
