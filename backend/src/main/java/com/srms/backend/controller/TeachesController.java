package com.srms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.srms.backend.model.*;



import com.srms.backend.repository.TeachesRepository;
import com.srms.backend.repository.CourseRepository;
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

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teaches")
@CrossOrigin("*")
public class TeachesController {
    
    @Autowired
    private TeachesRepository teachesRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Object> getAllTeaches() {
        try {
            return ResponseEntity.ok(teachesRepository.findAll());
        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
    
    @PostMapping
    public ResponseEntity<Object> addTeaches(@RequestBody Teaches teaches, @RequestParam Integer teacherId) {
        try {

            User teacher = userRepository.findById(teacherId).orElse(null);
            if (teacher == null) {
                return ResponseEntity.badRequest().body("Teacher not found");
            }
            teacher.addTeaches(teaches);
            userRepository.save(teacher);
            teachesRepository.save(teaches);

            return ResponseEntity.ok("Teaches saved");

        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Error");
        }

    }

    @DeleteMapping("/{teachesId}")
    public ResponseEntity<Object> deleteTeaches(@PathVariable int teachesId,@RequestParam Integer teacherId) {
        try {
            User teacher = userRepository.findById(teacherId).orElse(null);
            if (teacher != null) {
                Optional<Teaches> teachesOptional = teachesRepository.findById(teachesId);
                teacher.deleteTeaches(teachesOptional);
                userRepository.save(teacher);
            }

            teachesRepository.deleteById(teachesId);
            
           return ResponseEntity.ok("Teaches deleted");
       } catch (Exception error) {
           return ResponseEntity.badRequest().body("Error");
        }
    }
   
}
