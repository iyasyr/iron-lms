export interface Course {
  id: string
  title: string
  description?: string
  instructorId: string
  status: string
  createdAt: string
  publishedAt?: string
  lessons: Lesson[]
  assignments: Assignment[]
}

export interface Lesson {
  id: string
  title: string
  orderIndex: number
  courseId: string
}

export interface Assignment {
  id: string
  title: string
  description?: string
  lessonId: string
}

export interface CourseFilters {
  search?: string
  status?: string
  instructorId?: string
}

export interface CoursePagination {
  page: number
  pageSize: number
}

export interface CourseListState {
  courses: Course[]
  loading: boolean
  error: string | null
  pagination: CoursePagination
  filters: CourseFilters
}


