package com.example.backend.enrollment;

import com.example.backend.common.ApiResponse;
import com.example.backend.course.Course;
import com.example.backend.course.CourseRepository;
import com.example.backend.user.User;
import com.example.backend.user.UserRepository;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EnrollmentController {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public EnrollmentController(EnrollmentRepository enrollmentRepository, CourseRepository courseRepository, UserRepository userRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    public static class EnrollRequest { @NotNull public Long courseId; }

    @PostMapping("/api/courses/enroll")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> enroll(@RequestBody EnrollRequest req, @AuthenticationPrincipal UserDetails principal) {
        User user = userRepository.findByEmail(principal.getUsername()).orElseThrow();
        Course course = courseRepository.findById(req.courseId).orElseThrow();

        if (enrollmentRepository.existsByUserIdAndCourseId(user.getId(), course.getId())) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Already enrolled"));
        }
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollmentRepository.save(enrollment);
        return ResponseEntity.ok(ApiResponse.ok("Enrolled", null));
    }

    @GetMapping("/api/enrollments/user/{userId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<Enrollment>>> getUserEnrollments(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return ResponseEntity.ok(ApiResponse.ok(enrollmentRepository.findByUser(user)));
    }
}

