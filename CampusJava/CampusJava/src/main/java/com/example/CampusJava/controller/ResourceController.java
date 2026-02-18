package com.example.CampusJava.controller;

import com.example.CampusJava.model.Resource;
import com.example.CampusJava.repository.ResourceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/resources")
public class ResourceController {

    private final ResourceRepository repo;

    public ResourceController(ResourceRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Resource> getAllResources() {
        return repo.findAll();
    }

    @GetMapping("/type/{type}")
    public List<Resource> filterByType(@PathVariable String type) {
        return repo.findByType(type);
    }

    @PostMapping
    public Resource createResource(@RequestBody Resource resource) {
        return repo.save(resource);
    }

    @PutMapping("/{id}")
    public Resource updateResource(@PathVariable UUID id, @RequestBody Resource resource) {
        resource.setId(id);
        return repo.save(resource);
    }

    @DeleteMapping("/{id}")
    public String deleteResource(@PathVariable UUID id) {
        repo.deleteById(id);
        return "Resource Deleted ✅";
    }
}
