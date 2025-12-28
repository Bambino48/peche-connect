package com.backend.service;

import com.backend.model.Review;
import com.backend.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository repository;

    public Review add(Review review) {
        return repository.save(review);
    }
}
