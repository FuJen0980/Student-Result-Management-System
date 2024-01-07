package com.srms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;

import com.srms.backend.model.Teaches;
import com.srms.backend.repository.TeachesRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/teaches")
public class TeachesController {
    
    @Autowired
    private TeachesRepository teachesRepository;

    @GetMapping
    public List<Teaches> getAllTeaches() {
        return teachesRepository.findAll();

    }

    @PostMapping
    public void addTeaches(@RequestBody Teaches teaches) {
        teachesRepository.save(teaches);
    }

    @DeleteMapping("/{teachesId}")
    public void deleteTeaches(@PathVariable Integer teachesId){
        teachesRepository.deleteById(teachesId);

    }

}
