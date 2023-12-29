package com.srms.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.srms.backend.model.User;

public interface  UserRepository extends JpaRepository<User, Integer> {
    List<User> findByName(String name);
    List<User> findByRole(String role);
    List<User> findByNameAndPassword(String name, String password);
}
