package com.example.backend.course.dto;

public class CourseDto {
    public Long id;
    public String title;
    public String description;
    public Double price;
    public Long instructorId;
    public Instructor instructor;
    public String createdAt;

    public static class Instructor {
        public String firstName;
        public String lastName;
    }
}

