package com.backend.service;

import com.backend.model.Order;
import com.backend.model.enums.OrderStatus;
import com.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository repository;

    public Order create(Order order) {
        order.setOrderStatus(OrderStatus.PENDING);
        return repository.save(order);
    }

    public List<Order> getByBuyer(Long buyerId) {
        return repository.findByBuyerId(buyerId);
    }

    public Order updateStatus(Long id, OrderStatus status) {
        Order order = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande introuvable"));
        order.setOrderStatus(status);
        return repository.save(order);
    }
}
