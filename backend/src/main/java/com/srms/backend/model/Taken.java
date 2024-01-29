package com.srms.backend.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

import javax.xml.crypto.dsig.keyinfo.RetrievalMethod;


@Entity
@Table(name = "taken")
public class Taken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Integer taken_Id;

    @Column(nullable = false)
    private String semester;

    @Column(nullable = false)
    private String letterGrade;

    @Column(nullable = false, columnDefinition = "integer")
    private Integer taken_year;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "course_id")
    private Course course;

    public Taken() {
    }

    public Taken(String semester, Integer taken_year, String letterGrade) {
        this.semester = semester;
        this.taken_year = taken_year;
        this.letterGrade = letterGrade;
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
    public Integer getTakenId() {
        return this.taken_Id;
    }

    public Integer getTaken_year() {
        return this.taken_year;
    }

    public String getletterGrade() {
        return this.letterGrade;
    }
    
    public Course getCourse() {
        return this.course;
    }


    public void setCourse(Course course) {
        this.course = course;
    }

    public void setsçemester(String semester) {
        this.semester = semester;
    }

    public void setYear(Integer taken_year) {
        this.taken_year = taken_year;
    }

    public void setletterGrade(String letterGrade) {
        this.letterGrade = letterGrade;
    }


}
