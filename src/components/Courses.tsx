import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users, BookOpen } from 'lucide-react';
import courseAiMl from '@/assets/course-ai-ml.jpg';
import courseDataScience from '@/assets/course-data-science.jpg';
import courseUxUi from '@/assets/course-ux-ui.jpg';

const Courses = () => {
  const courses = [
    {
      id: 1,
      image: courseAiMl,
      title: 'AI & Machine Learning Fundamentals',
      instructor: 'Dr. Sarah Chen',
      rating: 4.9,
      reviews: 1245,
      price: '$89.99',
      originalPrice: '$129.99',
      badge: 'Bestseller',
      duration: '12 weeks',
      students: '5.2k',
      level: 'Beginner',
      category: 'AI/ML',
    },
    {
      id: 2,
      image: courseDataScience,
      title: 'Data Science Masterclass',
      instructor: 'Michael Rodriguez',
      rating: 4.8,
      reviews: 987,
      price: '$94.99',
      originalPrice: '$139.99',
      badge: 'Hot & New',
      duration: '16 weeks',
      students: '3.8k',
      level: 'Intermediate',
      category: 'Data Science',
    },
    {
      id: 3,
      image: courseUxUi,
      title: 'UX/UI Design Pro',
      instructor: 'Emma Wilson',
      rating: 4.7,
      reviews: 756,
      price: '$79.99',
      originalPrice: '$119.99',
      badge: null,
      duration: '10 weeks',
      students: '2.9k',
      level: 'Beginner',
      category: 'Design',
    },
  ];

  return (
    <section id="courses" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Popular{' '}
            <span className="gradient-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Discover our most enrolled courses across various domains
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="group bg-card rounded-xl shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badge */}
                {course.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {course.badge}
                  </div>
                )}

                {/* Category */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                  {course.category}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {course.title}
                </h3>

                {/* Instructor */}
                <p className="text-muted-foreground text-sm mb-4">
                  by {course.instructor}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-foreground ml-1">
                      {course.rating}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ({course.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Course Meta */}
                <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {course.students}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {course.level}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      {course.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {course.originalPrice}
                    </span>
                  </div>
                  <Button variant="default" size="sm">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Courses */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            View All Courses
            <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;