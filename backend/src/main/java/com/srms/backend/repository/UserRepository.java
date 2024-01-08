package com.srms.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.srms.backend.model.User;
import java.util.Optional;



public interface  UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByName(String name);
}
