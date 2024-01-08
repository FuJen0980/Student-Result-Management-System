package com.srms.backend.model;

import jakarta.persistence.*;
import java.util.List;


@Entity
@Table(name = "course")
public class Course{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer course_id;

    private String courseName;

    @ManyToMany(mappedBy = "courses")
    private List<Teaches> teaches;
    
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
    
    public void addTeaches(Teaches teaches) {
        this.teaches.add(teaches);
    }


}
