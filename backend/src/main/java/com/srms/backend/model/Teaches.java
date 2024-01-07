package com.srms.backend.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;



@Entity
@Table(name = "teaches")
public class Teaches {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Integer teachesId;

    @Column(nullable = false)
    private String semester;

    @Column(nullable = false, columnDefinition = "integer")
    private Integer teachYear;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;
    
    @OneToMany(mappedBy = "teaches", cascade = CascadeType.ALL , fetch = FetchType.LAZY)
    private List<Course> courses;

    @PrePersist
    public void keepTeacherRole() {
        if (user != null && !user.getRole().equalsIgnoreCase("teacher")) {
            throw new IllegalStateException("User must be a teacher");
        }
    }

    public Teaches() {
        this.courses = new ArrayList<Course>();   
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

    public String getTeacherName() {
        return this.user.getName();

    }

}
