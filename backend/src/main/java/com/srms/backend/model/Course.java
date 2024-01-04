package com.srms.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "course")
public class Course{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer courseId;

    private String courseName;

    @ManyToOne
    @JoinColumn(name = "teachesId")
    private Teaches teaches;
    
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
    

}
