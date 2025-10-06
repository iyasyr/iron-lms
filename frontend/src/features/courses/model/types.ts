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


