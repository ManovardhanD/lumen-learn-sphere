package com.example.backend.dev;

import com.example.backend.course.Course;
import com.example.backend.course.CourseRepository;
import com.example.backend.user.Role;
import com.example.backend.user.User;
import com.example.backend.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DevDataLoader {
	@Bean
	CommandLineRunner seedDemoData(UserRepository userRepository, CourseRepository courseRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (userRepository.count() == 0) {
				User instructor = new User();
				instructor.setEmail("instructor@example.com");
				instructor.setPassword(passwordEncoder.encode("password"));
				instructor.setFirstName("Jane");
				instructor.setLastName("Doe");
				instructor.setRole(Role.INSTRUCTOR);
				userRepository.save(instructor);

				User student = new User();
				student.setEmail("student@example.com");
				student.setPassword(passwordEncoder.encode("password"));
				student.setFirstName("John");
				student.setLastName("Smith");
				student.setRole(Role.STUDENT);
				userRepository.save(student);

				Course c1 = new Course();
				c1.setTitle("Spring Boot Fundamentals");
				c1.setDescription("Learn Spring Boot by building RESTful APIs.");
				c1.setPrice(49.99);
				c1.setInstructor(instructor);
				courseRepository.save(c1);

				Course c2 = new Course();
				c2.setTitle("React with TypeScript");
				c2.setDescription("Master React and TS with hands-on projects.");
				c2.setPrice(59.99);
				c2.setInstructor(instructor);
				courseRepository.save(c2);
			}
		};
	}
}