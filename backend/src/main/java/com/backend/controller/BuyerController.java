package com.backend.controller;

import com.backend.model.Buyer;
import com.backend.service.BuyerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buyers")
@RequiredArgsConstructor
public class BuyerController {

    private final BuyerService service;

    @PostMapping
    public Buyer create(@RequestBody Buyer buyer) {
        return service.create(buyer);
    }

    @GetMapping("/{id}")
    public Buyer get(@PathVariable Long id) {
        return service.get(id);
    }
}
