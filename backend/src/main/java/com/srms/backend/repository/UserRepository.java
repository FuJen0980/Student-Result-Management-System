package com.srms.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.srms.backend.model.User;
import java.util.Optional;
import java.util.Set;



public interface  UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByName(String name);

    @Query("select u from User u where u.role = ?1")
    Set<User> getUserByRole(String role);

}
