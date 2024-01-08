package com.srms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.srms.backend.model.Teaches;
import com.srms.backend.model.Course;

import com.srms.backend.repository.TeachesRepository;
import com.srms.backend.repository.CourseRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/teaches")
@CrossOrigin("*")
public class TeachesController {
    
    @Autowired
    private TeachesRepository teachesRepository;

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public ResponseEntity<Object> getAllTeaches() {
        try {
            return ResponseEntity.ok(teachesRepository.findAll());
        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
    
    @PostMapping
    public ResponseEntity<Object> addTeaches(@RequestBody Teaches teaches) {
        try {
            teachesRepository.save(teaches);
            for(Course course: teaches.getCourses()){
                course.addTeaches(teaches);
                courseRepository.save(course);
            }
            return ResponseEntity.ok("Teaches saved");

        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Error");
        }
        
    }

    @DeleteMapping("/{teachesId}")
    public ResponseEntity<Object> deleteTeaches(@PathVariable int teachesId) {
        try{
           teachesRepository.deleteById(teachesId);
           return ResponseEntity.ok("Teaches deleted");
       } catch (Exception error) {
           return ResponseEntity.badRequest().body("Error");
        }
    }
   
}
