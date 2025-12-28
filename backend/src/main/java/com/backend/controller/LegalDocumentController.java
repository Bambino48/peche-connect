package com.backend.controller;

import com.backend.model.LegalDocument;
import com.backend.service.LegalDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/legal")
@RequiredArgsConstructor
public class LegalDocumentController {

    private final LegalDocumentService service;

    @PostMapping
    public LegalDocument save(@RequestBody LegalDocument doc) {
        return service.save(doc);
    }

    @GetMapping("/{type}")
    public LegalDocument get(@PathVariable String type) {
        return service.getByType(type);
    }
}
