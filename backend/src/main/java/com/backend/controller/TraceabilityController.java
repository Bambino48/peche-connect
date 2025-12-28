package com.backend.controller;

import com.backend.model.Traceability;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/traceability")
@RequiredArgsConstructor
public class TraceabilityController {

    @PostMapping
    public Traceability save(@RequestBody Traceability traceability) {
        return traceability;
    }
}
