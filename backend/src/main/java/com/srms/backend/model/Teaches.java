package com.srms.backend.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

// import org.assertj.core.util.Objects;

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

    @ManyToMany
    @JoinTable(name = "teaches_course", 
            joinColumns = @JoinColumn(name = "teachesId"), 
            inverseJoinColumns = @JoinColumn(name = "course_id"))
    private Set<Course> courses;

    @PrePersist
    public void keepTeacherRole() {
        if (user != null && !"TEACHER".equals(user.getRole())) {
            throw new IllegalStateException("User must be a teacher");
        }
    }

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

    public List<String> getAllCourses() {
        return this.courses.stream().map(course -> course.getCourseName()).toList();
    }

    public String getTeacherName() {
        return this.user.getName();

    }

    public List<Course> getCourses(){
        return this.courses.stream().toList();
    }

    // public void addCourse(Course course) {
    //     courses.add(course);
    //     course.setTeaches(this);

    // }

    // public void deleteCourse(Course course) {
    //     courses.remove(course);
    //     course.setTeaches(null);
    // }

    
}
