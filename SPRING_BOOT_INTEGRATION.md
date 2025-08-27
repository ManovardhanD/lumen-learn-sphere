# Spring Boot Backend Integration Guide

This document provides a complete guide to integrate your React frontend with a Spring Boot backend for the LearnFutura e-learning platform.

## 🏗️ Project Architecture

```
LearnFutura/
├── Frontend (React + TypeScript) - Current Lovable Project
├── Backend (Spring Boot + MySQL) - To be implemented separately
└── Database (MySQL) - Production database
```

## 📋 Backend Requirements

### Technology Stack
- **Java**: 17 or higher
- **Spring Boot**: 3.2.5
- **Database**: MySQL 8.0+
- **Authentication**: JWT (JSON Web Tokens)
- **Build Tool**: Maven

### Required Dependencies (pom.xml)

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.12.5</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.12.5</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
</dependencies>
```

## 🗄️ Database Schema

### Create Database and Tables

```sql
CREATE DATABASE IF NOT EXISTS e_learning_db;
USE e_learning_db;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role ENUM('STUDENT', 'INSTRUCTOR', 'ADMIN') DEFAULT 'STUDENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    instructor_id BIGINT,
    image_url VARCHAR(500),
    duration VARCHAR(50),
    level ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') DEFAULT 'BEGINNER',
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE enrollments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    course_id BIGINT,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completion_date TIMESTAMP NULL,
    progress DECIMAL(5,2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (user_id, course_id)
);

CREATE TABLE course_reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    course_id BIGINT,
    rating DECIMAL(2,1) CHECK (rating >= 1.0 AND rating <= 5.0),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_review (user_id, course_id)
);
```

## 🔧 Backend Configuration

### application.properties

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/e_learning_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Server Configuration
server.port=8080

# JWT Configuration
app.jwt.secret=mySecretKey
app.jwt.expiration=86400000

# File Upload Configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# CORS Configuration
app.cors.allowed-origins=http://localhost:3000,http://localhost:5173
```

## 🚀 API Endpoints

The frontend is already configured to work with these endpoints:

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### User Endpoints
- `GET /api/users/profile` - Get user profile (Protected)

### Course Endpoints
- `GET /api/courses` - Get all courses (Public)
- `GET /api/courses/{id}` - Get course details (Public)
- `POST /api/courses` - Create course (Instructor only)
- `PUT /api/courses/{id}` - Update course (Instructor only)
- `DELETE /api/courses/{id}` - Delete course (Instructor only)

### Enrollment Endpoints
- `POST /api/courses/enroll` - Enroll in course (Student only)
- `GET /api/enrollments/user/{userId}` - Get user enrollments (Protected)

## 🔐 Security Implementation

### CORS Configuration

```java
@Configuration
public class CorsConfig {
    
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000"); // React dev server
        config.addAllowedOrigin("http://localhost:5173"); // Vite dev server
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
```

### JWT Implementation

```java
@Component
public class JwtUtil {
    
    @Value("${app.jwt.secret}")
    private String jwtSecret;
    
    @Value("${app.jwt.expiration}")
    private int jwtExpirationMs;
    
    public String generateJwtToken(UserPrincipal userPrincipal) {
        return generateTokenFromUsername(userPrincipal.getUsername());
    }
    
    public String generateTokenFromUsername(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
    
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }
    
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
```

## 📱 Frontend Integration

The frontend components are already configured to work with your Spring Boot backend. Here's what's included:

### Authentication Components
- **LoginForm**: `/login` - Handles user authentication
- **SignupForm**: `/signup` - Handles user registration
- **ProtectedRoute**: Wraps protected pages with authentication check

### User Management
- **UserProfile**: `/profile` - Displays user information and stats
- **AuthContext**: Manages authentication state throughout the app

### Course Management
- **Courses**: Homepage course display with enrollment functionality
- **CourseManager**: `/courses/manage` - Instructor interface for course creation

### API Integration
- **apiService**: Centralized API communication service in `src/services/api.ts`

## 🔗 Frontend-Backend Communication

### Authentication Flow

```javascript
// Login Example
const loginResponse = await fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const { token, user } = await loginResponse.json();
localStorage.setItem('auth_token', token);
```

### Protected API Calls

```javascript
// Protected Request Example
const userProfile = await fetch('http://localhost:8080/api/users/profile', {
  headers: { 
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    'Content-Type': 'application/json'
  }
});
```

## 🚀 Deployment Guide

### Backend Deployment
1. Package your Spring Boot application: `mvn clean package`
2. Deploy the JAR file to your preferred hosting service
3. Configure environment variables for database connection
4. Update CORS configuration for production URLs

### Frontend Configuration
Update the API base URL in `src/services/api.ts`:

```javascript
// For production
const API_BASE_URL = 'https://your-backend-domain.com/api';

// For development
const API_BASE_URL = 'http://localhost:8080/api';
```

## 🧪 Testing the Integration

1. Start your Spring Boot backend on port 8080
2. The React frontend is already configured to call the backend APIs
3. Test the complete flow:
   - Register a new user
   - Login with credentials
   - View course catalog
   - Enroll in courses (requires authentication)
   - Manage courses (instructor role required)

## 📋 Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}
```

## 🔍 Error Handling

The frontend is configured to handle common error scenarios:
- Network connectivity issues
- Authentication failures
- Authorization errors
- Validation errors

## 📈 Next Steps

1. **Implement the Spring Boot backend** using the specifications above
2. **Deploy the backend** to your preferred hosting service
3. **Update the API base URL** in the frontend configuration
4. **Test the complete integration** end-to-end
5. **Add additional features** like payment processing, course content, etc.

## 🤝 Support

If you need help with the backend implementation or integration, consider:
- Spring Boot documentation
- JWT implementation guides
- MySQL setup tutorials
- CORS configuration guides

The frontend is fully ready to integrate with your Spring Boot backend once you implement it following these specifications.