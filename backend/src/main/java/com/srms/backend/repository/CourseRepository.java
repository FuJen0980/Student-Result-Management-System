package com.srms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import com.srms.backend.model.Course;
import com.srms.backend.model.Teaches;


public interface CourseRepository extends JpaRepository<Course, Integer> {
    Optional<Course> findById(Integer course_id);
}