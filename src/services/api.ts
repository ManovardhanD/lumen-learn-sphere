const API_BASE_URL = 'http://localhost:8080/api';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
    createdAt: string;
  };
}

interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'STUDENT' | 'INSTRUCTOR';
}

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  instructorId: number;
  instructor?: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

interface EnrollmentRequest {
  courseId: number;
}

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  private getAuthHeaders(token?: string): Record<string, string> {
    const authToken = token || localStorage.getItem('auth_token');
    return authToken ? { Authorization: `Bearer ${authToken}` } : {};
  }

  // Authentication endpoints
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.makeRequest<ApiResponse<LoginResponse>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    return response.data;
  }

  async signup(userData: SignupRequest): Promise<void> {
    await this.makeRequest<ApiResponse<void>>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // User endpoints
  async getUserProfile(token?: string): Promise<LoginResponse['user']> {
    const response = await this.makeRequest<ApiResponse<LoginResponse['user']>>('/users/profile', {
      method: 'GET',
      headers: this.getAuthHeaders(token),
    });
    return response.data;
  }

  // Course endpoints
  async getCourses(): Promise<Course[]> {
    const response = await this.makeRequest<ApiResponse<Course[]>>('/courses', {
      method: 'GET',
    });
    return response.data;
  }

  async getCourse(id: number): Promise<Course> {
    const response = await this.makeRequest<ApiResponse<Course>>(`/courses/${id}`, {
      method: 'GET',
    });
    return response.data;
  }

  async createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'instructorId'>): Promise<Course> {
    const response = await this.makeRequest<ApiResponse<Course>>('/courses', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(courseData),
    });
    return response.data;
  }

  async enrollInCourse(enrollmentData: EnrollmentRequest): Promise<void> {
    await this.makeRequest<ApiResponse<void>>('/courses/enroll', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(enrollmentData),
    });
  }

  // Utility method to check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Utility method to get current token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}

export const apiService = new ApiService();