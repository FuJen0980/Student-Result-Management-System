package com.srms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

import com.srms.backend.model.*;

public interface TeachesRepository extends JpaRepository<Teaches, Integer> {
    @Query("select t from Teaches t where t.semester = ?1 and t.teachYear = ?2 and t.teachesId = ?3")
    Optional<Teaches> findBySemesterAndTechYearAndTeacherId(String semester, Integer techYear, Integer teacher_id);

    @Query("select t from Teaches t where t.teachesId = ?1")
    List<Teaches> findByTeacherId(Integer teacher_id);

    @Query("select t from Teaches t where t.teachesId = ?1")
    List<Course> findCoursesByTeacherId(Integer teacher_id);

    Optional<Teaches> findById(Integer teachesId);

}
