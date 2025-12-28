package com.backend.service;

import com.backend.model.LegalDocument;
import com.backend.repository.LegalDocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LegalDocumentService {

    private final LegalDocumentRepository repository;

    public LegalDocument save(LegalDocument document) {
        return repository.save(document);
    }

    public LegalDocument getByType(String type) {
        return repository.findByDocumentType(type)
                .orElseThrow(() -> new RuntimeException("Document introuvable"));
    }
}
