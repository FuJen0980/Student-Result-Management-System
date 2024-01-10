package com.srms.backend.model;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "users")
public class User implements UserDetails{
    
    @Id
    @GeneratedValue
    private int uid;
    private String name;
    private String password;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(
        name = "teacher_id",
        referencedColumnName = "uid"
    )
    private List<Teaches> teachesList;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(
        name = "student_id",
        referencedColumnName = "uid"
    )
    private List<Taken> takenList;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
    @Override
    public String getUsername() {
        return name;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
    @Override
    public String getPassword() {
        return password;
    }

    public void addTeaches(Teaches teaches) {
        teachesList.add(teaches);
    }
    
    public void addTaken(Taken taken) {
        takenList.add(taken);
    }
    
    public void deleteTaken(Optional<Taken> optionalTaken) {
        optionalTaken.ifPresent(taken -> takenList.remove(taken));
    }
    
    public void deleteTeaches(Optional<Teaches> optionalTeaches) {
        optionalTeaches.ifPresent(teaches -> teachesList.remove(teaches));

    }
}