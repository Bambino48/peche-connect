package com.backend.service;

import com.backend.model.User;
import com.backend.model.enums.Role;
import com.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // =======================
    // ➕ CRÉATION UTILISATEUR (INSCRIPTION UNIQUEMENT)
    // =======================
    public User create(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // =======================
    // ✏️ MISE À JOUR UTILISATEUR (SANS TOUCHER AU MOT DE PASSE)
    // =======================
    public User save(User user) {
        return userRepository.save(user);
    }

    // =======================
    // 👤 UTILISATEUR PAR ID
    // =======================
    public User get(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
    }

    // =======================
    // 🔐 UTILISATEUR CONNECTÉ (EMAIL OU TÉLÉPHONE)
    // =======================
    public User getByEmail(String identifier) {

        // 1️⃣ tentative par email
        return userRepository.findByEmail(identifier)
                .orElseGet(() ->
                        // 2️⃣ fallback par téléphone
                        userRepository.findByPhone(identifier)
                                .orElseThrow(() ->
                                        new RuntimeException("Utilisateur introuvable")
                                )
                );
    }

    // =======================
    // 👥 UTILISATEURS PAR RÔLE
    // =======================
    public List<User> getByRole(Role role) {
        return userRepository.findByRole(role);
    }

    // =======================
    // ❌ SUPPRESSION
    // =======================
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
