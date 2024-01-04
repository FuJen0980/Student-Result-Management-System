package com.srms.backend.model;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;


@Entity
@Table(name = "teaches")
public class Teaches {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer teachesId;

    @Column(nullable = false)
    private String semester;

    @Column(nullable = false)
    private Integer teachYear;

    @OneToOne
    @JoinColumn(name = "uid")
    private User user;
    
    @OneToMany(mappedBy = "teaches", cascade = CascadeType.ALL)
    private List<Course> courses;

    @PrePersist
    public void keepTeacherRole() {
        if (user != null && !user.getRole().equalsIgnoreCase("teacher")) {
            throw new IllegalStateException("User must be a teacher");
        }
    }

    public Teaches() {
        this.courses = new ArrayList<>();   
    }
    
    public Teaches(String semester, Integer teachYear) {
        this.semester = semester;
        this.teachYear = teachYear;
    }
    
    public void setTeachSemester(String semester) {
        this.semester = semester;
    }

    public void setTeachYear(Integer teachYear) {
        this.teachYear = teachYear;
    }

    public String getSemester() {
        return this.semester;
    }

    public Integer getTeachYear() {
        return this.teachYear;
    }

    public List<String> getAllCourses() {
        return this.courses.stream().map(course -> course.getCourseName()).toList();
    }

}
