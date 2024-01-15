package com.srms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

import com.srms.backend.model.*;


public interface TakenRepository extends JpaRepository<Taken, Integer> {
    Optional<Taken> findById(Integer Id);


}