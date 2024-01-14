package com.srms.backend.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import java.util.Set;
import java.util.HashSet;


// import org.assertj.core.util.Objects;

@Entity
@Table(name = "teaches")
@Data
public class Teaches {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Integer teachesId;

    @Column(nullable = false)
    private String semester;

    @Column(nullable = false, columnDefinition = "integer")
    private Integer teachYear;

    @ManyToMany
    @JoinTable(name = "teaches_course", 
            joinColumns = @JoinColumn(name = "teachesId"), 
            inverseJoinColumns = @JoinColumn(name = "course_id"))
    private Set<Course> courses = new HashSet<>();

    public Teaches() {
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

    public Set<Course> getCourses() {
        return this.courses;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }

    @Builder
    public Teaches(Integer teachesId, String semester, Integer teachYear, Set<Course> courses) {
        this.teachesId = teachesId;
        this.semester = semester;
        this.teachYear = teachYear;
        this.courses = courses;
    }
    
}
