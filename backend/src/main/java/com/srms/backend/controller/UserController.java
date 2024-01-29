package com.srms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;

import com.srms.backend.model.User;
import com.srms.backend.repository.UserRepository;
import com.srms.backend.repository.TeachesRepository;
import com.srms.backend.repository.TakenRepository;

import com.srms.backend.model.Teaches;
import com.srms.backend.model.Taken;

import java.util.Set;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeachesRepository TeachesRepository;
    
    @Autowired
    private TakenRepository takenRepository;

    @GetMapping("/{uid}") 
    public ResponseEntity<Object> getUser(@PathVariable int uid) {
        try {
            return ResponseEntity.ok(userRepository.findById(uid));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PostMapping("/post")
    public ResponseEntity<Object> addUser(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userRepository.save(user));
           
        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Error of adding User");
        }
    }
    
    @PatchMapping("/patch/teacher/add/{teacherId}/{teachesId}")
    public ResponseEntity<Object> updateTeaches(@PathVariable int teacherId, @PathVariable int teachesId) {
        try {
            User teacher = userRepository.findById(teacherId).orElse(null);
            Teaches teaches = TeachesRepository.findByteachesId(teachesId).orElse(null);

            if (teacher == null || teaches == null) {
                return ResponseEntity.badRequest().body("User or teaches not found");
            }

            Set<Teaches> teachesList = teacher.getTeaches();
            teachesList.add(teaches);

            return ResponseEntity.ok(userRepository.save(teacher));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PatchMapping("/patch/teacher/delete/{teacherId}/{teachesId}")
    public ResponseEntity<Object> deleteTeaches(@PathVariable int teacherId, @PathVariable int teachesId) {
        try {
            User teacher = userRepository.findById(teacherId).orElse(null);
            teacher.deleteTeaches(teachesId);
            return ResponseEntity.ok(userRepository.save(teacher));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PutMapping("/put/student/{studentId}/{takenId}")
    public ResponseEntity<Object> deleteTaken(@PathVariable int studentId, @PathVariable int takenId) {
        try {
            User student = userRepository.findById(studentId).orElse(null);
            student.deleteTaken(takenId);
            return ResponseEntity.ok(userRepository.save(student));

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
