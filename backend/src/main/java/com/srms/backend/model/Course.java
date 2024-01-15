package com.srms.backend.model;

import jakarta.persistence.*;
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

    //miss a relationship with the studentTaken table 

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
