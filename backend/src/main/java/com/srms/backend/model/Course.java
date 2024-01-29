package com.srms.backend.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;
import lombok.Builder;
import lombok.Data;



@Entity
@Data
@Table(name = "course")
public class Course{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer course_id;

    private String courseName;
    
    // @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "course")
    // Set<Taken> takenList = new HashSet<Taken>();
    

    public Course() {
    }

    public Course(String name) {
        this.courseName = name;
    }

    public void setCourseName(String name) {
        this.courseName = name;
    }

    public String getCourseName() {
        return this.courseName;
    }
    
    public Integer getId() {
        return this.course_id;
    }

    @Builder
    public Course(Integer course_id, String courseName) {
        this.course_id = course_id;
        this.courseName = courseName;
    }

    
}
