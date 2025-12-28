package com.backend.service;

import com.backend.model.PackagingDelivery;
import com.backend.repository.PackagingDeliveryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PackagingDeliveryService {

    private final PackagingDeliveryRepository repository;

    public PackagingDelivery save(PackagingDelivery data) {
        return repository.save(data);
    }
}
