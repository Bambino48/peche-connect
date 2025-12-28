package com.backend.repository;


import com.backend.model.Order;
import com.backend.model.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByBuyerId(Long buyerId);

    List<Order> findByOrderStatus(OrderStatus status);
}
