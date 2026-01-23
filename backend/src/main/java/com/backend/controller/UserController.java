package com.backend.controller;

import com.backend.model.User;
import com.backend.model.enums.Role;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    // =======================
    // 🔐 UTILISATEUR CONNECTÉ
    // =======================
    @GetMapping("/me")
    public User getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        return service.getByEmail(email);
    }

    // =======================
    // ✏️ MISE À JOUR TEXTE PROFIL
    // =======================
    @PutMapping("/me")
    public User updateCurrentUser(
            Authentication authentication,
            @RequestBody User data
    ) {
        String email = authentication.getName();
        User user = service.getByEmail(email);

        user.setFullName(data.getFullName());
        user.setPhone(data.getPhone());
        user.setLocation(data.getLocation());

        return service.save(user);
    }

    // =======================
    // 📸 UPLOAD PHOTO PROFIL
    // =======================
    @PostMapping("/me/photo")
    public User uploadProfilePhoto(
            Authentication authentication,
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        String email = authentication.getName();
        User user = service.getByEmail(email);

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Fichier image manquant");
        }

        // 1️⃣ Dossier racine stable (hors Tomcat temp)
        String uploadDir = System.getProperty("user.dir")
                + File.separator + "uploads"
                + File.separator + "profile-photos";

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs(); // ✅ création automatique
        }

        // 2️⃣ Nom de fichier unique
        String originalFilename = file.getOriginalFilename();
        String extension = "";

        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        String filename = UUID.randomUUID() + "_" + originalFilename;

        // 3️⃣ Sauvegarde réelle du fichier
        File destination = new File(uploadDir + File.separator + filename);
        file.transferTo(destination);

        // 4️⃣ Sauvegarde en base
        user.setProfilePhoto(filename);
        return service.save(user);
    }

    // =======================
    // 📋 LISTE DES UTILISATEURS
    // =======================
    @GetMapping
    public List<User> getAll() {
        return service.getByRole(null);
    }

    // =======================
    // 👥 UTILISATEURS PAR RÔLE
    // =======================
    @GetMapping("/role/{role}")
    public List<User> getByRole(@PathVariable Role role) {
        return service.getByRole(role);
    }

    // =======================
    // 👤 UTILISATEUR PAR ID
    // =======================
    @GetMapping("/{id}")
    public User getOne(@PathVariable Long id) {
        return service.get(id);
    }

    // =======================
    // ✏️ UPDATE PAR ID (ADMIN)
    // =======================
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User data) {
        User user = service.get(id);

        user.setFullName(data.getFullName());
        user.setPhone(data.getPhone());
        user.setLocation(data.getLocation());

        return service.create(user);
    }

    // =======================
    // ❌ SUPPRESSION
    // =======================
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
