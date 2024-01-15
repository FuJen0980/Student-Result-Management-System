package com.srms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.srms.backend.model.User;
import com.srms.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{uid}") 
    public ResponseEntity<Object> getUser(@PathVariable int uid) {
        try {
            return ResponseEntity.ok(userRepository.findById(uid));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/all") 
    public ResponseEntity<Object> getAllUsers() {
        try {
            return ResponseEntity.ok(userRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PutMapping("/update/{uid}")
    public ResponseEntity<Object> updateUser(@PathVariable int uid, @RequestBody User request) {
        try {
            User existingUser = userRepository.findById(uid).orElse(null);
            if(existingUser == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            existingUser.setName(request.getName());
            existingUser.setRole(request.getRole());
            existingUser.setPassword(request.getPassword());
            userRepository.save(existingUser);
            return ResponseEntity.ok("User updated");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error Updating User");
        }

    }

       
    @DeleteMapping("/delete/{uid}")
    public ResponseEntity<Object> deleteUser(@PathVariable int uid) {
        try {
            userRepository.deleteById(uid);
            return ResponseEntity.ok("User deleted");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

}
