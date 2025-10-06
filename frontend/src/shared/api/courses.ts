import { httpClient } from './http'

export interface Course {
  id: number
  instructorId: number
  title: string
  description: string
  status: 'DRAFT' | 'PUBLISHED'
  createdAt: string
  publishedAt: string | null
}

export interface Enrollment {
  id: number
  courseId: number
  course: Course
  enrolledAt: string
  status: 'ACTIVE' | 'CANCELLED' | 'COMPLETED'
}

export interface CoursePage {
  content: Course[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}

export interface EnrollmentPage {
  content: Enrollment[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}

class CoursesAPI {
  async getPublishedCourses(page: number = 0, size: number = 10): Promise<CoursePage> {
    return httpClient.get<CoursePage>(`/api/courses?page=${page}&size=${size}`)
  }

  async getCourse(id: number): Promise<Course> {
    return httpClient.get<Course>(`/api/courses/${id}`)
  }

  async enrollInCourse(courseId: number): Promise<Enrollment> {
    return httpClient.post<Enrollment>(`/api/courses/${courseId}/enroll`)
  }

  async getMyEnrollments(page: number = 0, size: number = 10): Promise<EnrollmentPage> {
    return httpClient.get<EnrollmentPage>(`/api/enrollments?page=${page}&size=${size}`)
  }

  async cancelEnrollment(enrollmentId: number): Promise<Enrollment> {
    return httpClient.patch<Enrollment>(`/api/enrollments/${enrollmentId}/cancel`)
  }
}

export const coursesAPI = new CoursesAPI()




