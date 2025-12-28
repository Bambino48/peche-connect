package com.backend.controller;

import com.backend.model.Order;
import com.backend.model.enums.OrderStatus;
import com.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;

    @PostMapping
    public Order create(@RequestBody Order order) {
        return service.create(order);
    }

    @GetMapping("/{id}")
    public Order get(@PathVariable Long id) {
        return service.getByBuyer(id).get(0);
    }

    @GetMapping("/buyer/{buyerId}")
    public List<Order> byBuyer(@PathVariable Long buyerId) {
        return service.getByBuyer(buyerId);
    }

    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id,
                              @RequestParam OrderStatus status) {
        return service.updateStatus(id, status);
    }
}
