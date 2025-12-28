package com.backend.controller;

import com.backend.model.Review;
import com.backend.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService service;

    @PostMapping
    public Review add(@RequestBody Review review) {
        return service.add(review);
    }
}
