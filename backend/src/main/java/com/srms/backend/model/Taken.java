package com.srms.backend.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "taken")
public class Taken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Integer taken_Id;

    @Column(nullable = false)
    private String semester;

    @Column(nullable = false, columnDefinition = "integer")
    private Integer taken_year;

    @ManyToMany
    @JoinTable(name = "taken_course", 
    joinColumns = @JoinColumn(name = "taken_Id"), 
            inverseJoinColumns = @JoinColumn(name = "course_id"))
    private Set<Course> courses;
    
    public Taken() {

    }
    
    public Taken(String semester, Integer taken_year) {
        this.semester = semester;
        this.taken_year = taken_year;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public void setTaken_year(Integer taken_year) {
        this.taken_year = taken_year;
    }

    public String getSemester() {
        return this.semester;
    }

    public Integer getTaken_year() {
        return this.taken_year;
    }

    public Set<Course> getCourses() {
        return this.courses;
    }
    
    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

}
