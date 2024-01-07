package com.srms.backend.model;
import com.srms.backend.model.Teaches;

import jakarta.persistence.*;
import java.util.List;


@Entity
@Table(name = "course")
public class Course{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer course_id;

    private String course_name;

    @ManyToOne
    @JoinColumn(name = "teachesId")
    private Teaches teaches;
    
    //miss a relationship with the studentTaken table 

    public Course() {
    }

    public Course(String name) {
        this.course_name = name;
    }

    public void setCourseName(String name) {
        this.course_name = name;
    }

    public String getCourseName() {
        return this.course_name;
    }
    

}
