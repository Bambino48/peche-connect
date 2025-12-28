package com.backend.controller;

import com.backend.model.User;
import com.backend.model.enums.Role;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @GetMapping
    public List<User> getAll() {
        return service.getByRole(null);
    }

    @GetMapping("/{id}")
    public User getOne(@PathVariable Long id) {
        return service.get(id);
    }

    @GetMapping("/role/{role}")
    public List<User> getByRole(@PathVariable Role role) {
        return service.getByRole(role);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User data) {
        User user = service.get(id);
        user.setFullName(data.getFullName());
        user.setPhone(data.getPhone());
        user.setLocation(data.getLocation());
        return service.create(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
