package com.srms.backend.model;

import java.util.Collection;
import java.util.Set;
import java.util.List;
import java.util.HashSet;
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

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(
        name = "teacher_id",
        referencedColumnName = "uid"
    )
    private Set<Teaches> teachesList;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(
        name = "student_id",
        referencedColumnName = "uid"
    )
    private Set<Taken> takenList;

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
    
    public Set<Teaches> getTeaches() {
        return this.teachesList;
    }

    public Set<Taken> getTaken() {
        return this.takenList;
    }

    public void setTeachesList(Set<Teaches> teachesList) {
        this.teachesList = teachesList;
    }

    public void setTakenList(Set<Taken> takenList) {
        this.takenList = takenList;
    }

    // public void deleteTaken(int id) {
    //     for (Taken taken : takenList) {
            
    //     }
    // }
    
    public void deleteTeaches(int id) {
        for (Teaches teaches : teachesList) {
            if (teaches.getTeachesId() == id) {
                teachesList.remove(teaches);
                break;
            }
        }
    }
    
    public int getCoursesNum() {
        int res = 0;
        for (Teaches teaches : teachesList) {
            res += teaches.getCourses().size();
        }
        return res;
    }
}