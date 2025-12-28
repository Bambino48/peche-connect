package com.backend.repository;


import com.backend.model.User;
import com.backend.model.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByPhone(String phone);
    Optional<User> findByEmail(String email);

    List<User> findByRole(Role role);

    boolean existsByPhone(String phone);
    boolean existsByEmail(String email);
}
