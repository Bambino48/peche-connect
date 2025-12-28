package com.backend.service;

import com.backend.model.Delivery;
import com.backend.repository.DeliveryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeliveryService {

    private final DeliveryRepository repository;

    public Delivery start(Delivery delivery) {
        delivery.setDeliveryStatus("IN_PROGRESS");
        return repository.save(delivery);
    }
}
