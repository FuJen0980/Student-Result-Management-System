package com.srms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import com.srms.backend.model.Teaches;
import com.srms.backend.model.Course;
import com.srms.backend.model.User;

public interface TeachesRepository extends JpaRepository<Teaches, Integer> {
    List<Teaches> findByUserIn(List<User> users);

}
