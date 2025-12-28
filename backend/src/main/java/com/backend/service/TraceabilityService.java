package com.backend.service;

import com.backend.model.Traceability;
import com.backend.repository.TraceabilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TraceabilityService {

    private final TraceabilityRepository repository;

    public Traceability save(Traceability traceability) {
        return repository.save(traceability);
    }
}
