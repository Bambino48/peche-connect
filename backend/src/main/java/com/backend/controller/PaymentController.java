package com.backend.controller;

import com.backend.model.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    @PostMapping
    public Payment pay(@RequestBody Payment payment) {
        return payment;
    }
}
