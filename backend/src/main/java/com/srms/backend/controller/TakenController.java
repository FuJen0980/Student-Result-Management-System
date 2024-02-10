package com.srms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.srms.backend.model.*;

import com.srms.backend.repository.TakenRepository;
import com.srms.backend.repository.UserRepository;
import com.srms.backend.repository.CourseRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/taken")
@CrossOrigin(origins = "https://student-result-management-system-yevx.onrender.com")
public class TakenController {
    
    @Autowired
    private TakenRepository takenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public ResponseEntity<Object> getAllTeaches() {
        try {
            return ResponseEntity.ok(takenRepository.findAll());
        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
    
    @PostMapping("/post/{courseId}/{userId}")
    public ResponseEntity<Object> addTeaches(@RequestBody Taken taken, @PathVariable int courseId, @PathVariable int userId) {
        try {
            
            Taken res = takenRepository.findBySemesterAndTaken_yearAndCourse(taken.getSemester(), taken.getTaken_year(),
                    taken.getCourse()).orElse(null);
            if (res == null) {
                Course course = courseRepository.findById(courseId).orElse(null);
                taken.setCourse(course);
                takenRepository.save(taken);
                res = takenRepository.findBySemesterAndTaken_yearAndCourse(taken.getSemester(), taken.getTaken_year(),
                        taken.getCourse()).orElse(null);
            }
            
            User user = userRepository.findById(userId).orElse(null);
            user.addTaken(res);
            userRepository.save(user);
        
            return ResponseEntity.ok("Add");

        } catch (Exception error) {
            return ResponseEntity.badRequest().body("error");
        }
    }
    
    @DeleteMapping("/{taken_Id}")
    public ResponseEntity<Object> deleteTeaches(@PathVariable int takenId,@RequestParam Integer studentId) {
        try {

            takenRepository.deleteById(takenId);
            return ResponseEntity.ok("Taken deleted");
           
       } catch (Exception error) {
           return ResponseEntity.badRequest().body("Error");
        }
    }
   
}
