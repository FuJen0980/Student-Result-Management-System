package com.srms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.srms.backend.model.*;



import com.srms.backend.repository.TakenRepository;
import com.srms.backend.repository.UserRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/taken")
@CrossOrigin("*")
public class TakenController {
    
    @Autowired
    private TakenRepository takenRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Object> getAllTeaches() {
        try {
            return ResponseEntity.ok(takenRepository.findAll());
        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
    
    @PostMapping
    public ResponseEntity<Object> addTeaches(@RequestBody Taken taken, @RequestParam Integer studentrId) {
        try {

            User student = userRepository.findById(studentrId).orElse(null);
            if (student == null) {
                return ResponseEntity.badRequest().body("Teacher not found");
            }
            student.addTaken(taken);
            userRepository.save(student);
            takenRepository.save(taken);

            return ResponseEntity.ok("Taken saved");

        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Error");
        }

    }

    @DeleteMapping("/{taken_Id}")
    public ResponseEntity<Object> deleteTeaches(@PathVariable int takenId,@RequestParam Integer studentId) {
        try {
            User student = userRepository.findById(studentId).orElse(null);
            if (student != null) {
                Optional<Taken> takenOptional = takenRepository.findById(takenId);
                student.deleteTaken(takenOptional);
                userRepository.save(student);
            }

            takenRepository.deleteById(takenId);
            return ResponseEntity.ok("Taken deleted");
           
       } catch (Exception error) {
           return ResponseEntity.badRequest().body("Error");
        }
    }
   
}
