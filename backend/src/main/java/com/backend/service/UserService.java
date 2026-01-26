package com.backend.service;

import com.backend.model.Seller;
import com.backend.model.User;
import com.backend.model.enums.Role;
import com.backend.repository.SellerRepository;
import com.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final PasswordEncoder passwordEncoder;

    // =======================
    // ➕ CRÉATION UTILISATEUR (INSCRIPTION)
    // =======================
    public User create(User user) {

        // 🔐 Sécurité mot de passe
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 💾 Sauvegarde utilisateur
        User savedUser = userRepository.save(user);

        // 🐟 CRÉATION AUTOMATIQUE DU SELLER
        if (savedUser.getRole() == Role.SELLER) {

            // Sécurité anti-duplication
            boolean alreadySeller =
                    sellerRepository.findByUser_Id(savedUser.getId()).isPresent();

            if (!alreadySeller) {

                Seller seller = new Seller();
                seller.setUser(savedUser);
                seller.setSellerType("PECHEUR"); // valeur par défaut
                seller.setVerified(false);
                seller.setTotalSales(0.0);
                seller.setAverageRating(0.0);

                sellerRepository.save(seller);
            }
        }

        return savedUser;
    }

    // =======================
    // ✏️ MISE À JOUR UTILISATEUR
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
    // 🔐 UTILISATEUR CONNECTÉ
    // =======================
    public User getByEmail(String identifier) {

        return userRepository.findByEmail(identifier)
                .orElseGet(() ->
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
