package com.srms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import com.srms.backend.model.Course;
import com.srms.backend.model.Teaches;


public interface CourseRepository extends JpaRepository<Course, Integer> {
    // List<Course> findByTeachesIn(List<Teaches> teachesList);
}