export interface Course {
  id: string
  title: string
  description?: string
  status: string
  instructorId: string
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
  item?: Item
}

export interface Item {
  id: string
  title: string
  description?: string
  tags: string[]
  bodyMarkdown: string
  lessonId: string
  createdAt: string
  updatedAt: string
}

export interface Assignment {
  id: string
  title: string
  instructions?: string
  maxPoints: number
  allowLate: boolean
  dueAt?: string
  courseId?: string
  lessonId?: string
}

export interface Enrollment {
  id: string
  courseId: string
  studentId: string
  enrolledAt: string
  status: string
  course: Course
}


