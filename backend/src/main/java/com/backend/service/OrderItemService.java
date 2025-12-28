package com.backend.service;

import com.backend.model.OrderItem;
import com.backend.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderItemService {

    private final OrderItemRepository repository;

    public OrderItem save(OrderItem item) {
        return repository.save(item);
    }
}
