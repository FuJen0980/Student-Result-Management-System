package com.srms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

import com.srms.backend.model.*;


public interface TakenRepository extends JpaRepository<Taken, Integer> {
    Optional<Taken> findById(Integer Id);
    @Query("select t from Taken t where t.semester = ?1 and t.taken_year = ?2 and t.course = ?3")
    Optional<Taken> findBySemesterAndTaken_yearAndCourse(String semester, Integer taken_year, Course course);

}