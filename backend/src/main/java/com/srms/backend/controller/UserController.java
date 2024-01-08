package com.srms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.srms.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/role/{name}") 
    public ResponseEntity<Object> getUser(@PathVariable String name) {
        try {
            return ResponseEntity.ok(userRepository.findByName(name));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
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
