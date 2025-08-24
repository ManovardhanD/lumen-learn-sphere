package com.example.backend.course;

import com.example.backend.common.ApiResponse;
import com.example.backend.course.dto.CourseDto;
import com.example.backend.user.User;
import com.example.backend.user.UserRepository;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public CourseController(CourseRepository courseRepository, UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseDto>>> getAll() {
        List<CourseDto> dtos = courseRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.ok(dtos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseDto>> getOne(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(c -> ResponseEntity.ok(ApiResponse.ok(toDto(c))))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    public static class CourseRequest {
        @NotBlank public String title;
        @NotBlank public String description;
        @NotNull public Double price;
    }

    @PostMapping
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CourseDto>> create(@RequestBody CourseRequest req, @AuthenticationPrincipal UserDetails principal) {
        User instructor = userRepository.findByEmail(principal.getUsername()).orElseThrow();
        Course c = new Course();
        c.setTitle(req.title);
        c.setDescription(req.description);
        c.setPrice(req.price);
        c.setInstructor(instructor);
        Course saved = courseRepository.save(c);
        return ResponseEntity.ok(ApiResponse.ok(toDto(saved)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CourseDto>> update(@PathVariable Long id, @RequestBody CourseRequest req, @AuthenticationPrincipal UserDetails principal) {
        return courseRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(req.title);
                    existing.setDescription(req.description);
                    existing.setPrice(req.price);
                    return ResponseEntity.ok(ApiResponse.ok(toDto(courseRepository.save(existing))));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private CourseDto toDto(Course c) {
        CourseDto dto = new CourseDto();
        dto.id = c.getId();
        dto.title = c.getTitle();
        dto.description = c.getDescription();
        dto.price = c.getPrice();
        dto.instructorId = c.getInstructor().getId();
        CourseDto.Instructor instr = new CourseDto.Instructor();
        instr.firstName = c.getInstructor().getFirstName();
        instr.lastName = c.getInstructor().getLastName();
        dto.instructor = instr;
        dto.createdAt = c.getCreatedAt().toString();
        return dto;
    }
}

