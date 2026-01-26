package com.backend.controller;

import com.backend.dto.FishProductResponse;
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
    public FishProductResponse create(@RequestBody FishProduct product) {
        return service.createAndReturnDto(product);
    }

    @GetMapping
    public List<FishProductResponse> getAll() {
        return service.getAllDtos();
    }

    @GetMapping("/{id}")
    public FishProductResponse get(@PathVariable Long id) {
        return service.getDto(id);
    }

    @PutMapping("/{id}")
    public FishProductResponse update(
            @PathVariable Long id,
            @RequestBody FishProduct data
    ) {
        return service.updateAndReturnDto(id, data);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
