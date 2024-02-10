package com.srms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;

import com.srms.backend.model.Course;
import com.srms.backend.model.Taken;
import com.srms.backend.repository.CourseRepository;
import com.srms.backend.repository.TakenRepository;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin(origins = "https://student-result-management-system-yevx.onrender.com")
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    // @Autowired
    // private TakenRepository TakenRepository;

    @GetMapping
    public ResponseEntity<Object> getAllCourses() {
        try {
            return ResponseEntity.ok(courseRepository.findAll());
        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<Object> getCourse(@PathVariable("course_id") int courseId) {
        try {
            return ResponseEntity.ok(courseRepository.findById(courseId));
        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @PostMapping
    public ResponseEntity<Object> addCourse(@RequestBody Course course) {
        try {
            Course savedCourse = courseRepository.save(course);
            return ResponseEntity.ok("Course saved with ID: " + savedCourse.getId());

        } catch (Exception error) {
            return ResponseEntity.badRequest().body("Error");
        }

    }

    // @PatchMapping("/patch/{couseId}")
    // public ResponseEntity<Object> addTaken(@PathVariable int courseId) {
    //     try {
            
            
    //         // Course savedCourse = courseRepository.save();
    //         // return ResponseEntity.ok("Course saved with ID: " + savedCourse.getId());

    //     } catch (Exception error) {
    //         return ResponseEntity.badRequest().body("Error");
    //     }

    // }
    
 
    @DeleteMapping("/{courseId}")
    public ResponseEntity<Object> deleteCourse(@PathVariable int courseId) {
        try{
           courseRepository.deleteById(courseId);
           return ResponseEntity.ok("Course deleted");
       } catch (Exception error) {
           return ResponseEntity.badRequest().body("Error");
        }
    }

    
}
