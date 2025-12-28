package com.backend.controller;

import com.backend.model.FishProduct;
import com.backend.service.FishProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class FishProductController {

    private final FishProductService service;

    @PostMapping
    public FishProduct create(@RequestBody FishProduct product) {
        return service.create(product);
    }

    @GetMapping
    public List<FishProduct> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public FishProduct get(@PathVariable Long id) {
        return service.get(id);
    }

    @PutMapping("/{id}")
    public FishProduct update(@PathVariable Long id, @RequestBody FishProduct data) {
        FishProduct product = service.get(id);
        product.setNameLocal(data.getNameLocal());
        product.setState(data.getState());
        product.setFishType(data.getFishType());
        return service.create(product);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
