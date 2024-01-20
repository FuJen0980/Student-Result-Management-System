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

import com.srms.backend.model.User;
import com.srms.backend.repository.UserRepository;
import com.srms.backend.repository.TeachesRepository;
import com.srms.backend.repository.TakenRepository;

import com.srms.backend.model.Teaches;
import com.srms.backend.model.Taken;

import java.util.Set;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
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


    @PutMapping("/put/teacher/{teacherId}/{teachesId}")
    public ResponseEntity<Object> updateTeaches(@PathVariable int teacherId, @PathVariable int teachesId) {
        try {
            User teacher = userRepository.findById(teacherId).orElse(null);
            Teaches teaches = TeachesRepository.findByteachesId(teachesId).orElse(null);

            if (teacher == null || teaches == null) {
                return ResponseEntity.badRequest().body("User or teaches not found");
            }

            Set<Teaches> teachesList = teacher.getTeaches();
            teachesList.add(teaches);
            teacher.setTeachesList(teachesList);
            return ResponseEntity.ok(userRepository.save(teacher));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PutMapping("/put/student/{teacherId}/{takenId}")
    public ResponseEntity<Object> updateTaken(@PathVariable int studentId, @PathVariable int takenId) {
        try {
            User student = userRepository.findById(studentId).orElse(null);
            Taken taken = takenRepository.findById(takenId).orElse(null);
            if (student == null || taken == null) {
                return ResponseEntity.badRequest().body("User or taken not found");
            }

            Set<Taken> takenList = student.getTaken();
            takenList.add(taken);
            student.setTakenList(takenList);
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
