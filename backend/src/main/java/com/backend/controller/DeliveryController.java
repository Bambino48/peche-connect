package com.backend.controller;

import com.backend.model.Delivery;
import com.backend.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/deliveries")
@RequiredArgsConstructor
public class DeliveryController {

    private final DeliveryService service;

    @PostMapping
    public Delivery start(@RequestBody Delivery delivery) {
        return service.start(delivery);
    }
}
