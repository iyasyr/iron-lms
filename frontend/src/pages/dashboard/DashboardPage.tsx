import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/lib/AuthContext'
import { LogOut, User, BookOpen, PlayCircle, Clock, Users, TrendingUp, Filter } from 'lucide-react'
import { useGetCoursesQuery, useGetMyEnrollmentsQuery, useEnrollInCourseMutation, useMySubmissionsQuery } from '../../generated/graphql'
import toast from 'react-hot-toast'
import './DashboardPage.scss'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const { data, loading, error } = useGetCoursesQuery({
    variables: { page: 0, pageSize: 10 }
  })

  if (error) {
    toast.error('Failed to load courses')
  }

  const { data: enrollmentsData, loading: enrollmentsLoading, refetch: refetchEnrollments, error: enrollmentsError } = useGetMyEnrollmentsQuery({
    variables: { page: 0, pageSize: 10 }
  })

  const { data: submissionsData, loading: submissionsLoading } = useMySubmissionsQuery({
    variables: { page: 0, pageSize: 100 }
  })

  if (enrollmentsError) {
    toast.error('Failed to load enrollments')
  }

  const [enrollInCourse, { loading: enrolling }] = useEnrollInCourseMutation({
    onCompleted: () => {
      toast.success('Successfully enrolled in course!')
      refetchEnrollments()
    },
    onError: () => {
      toast.error('Failed to enroll in course')
    }
  })

  const courses = data?.courses?.content || []
  const totalCourses = data?.courses?.pageInfo?.totalElements || 0
  const enrollments = enrollmentsData?.myEnrollments?.content || []

  const submissions = submissionsData?.mySubmissions?.content || []
  
  const enrolledCourses = enrollments.map(enrollment => {
    const course = enrollment.course
    const totalAssignments = course.assignments.length
    
    // Calculate real progress based on submissions
    const courseSubmissions = submissions.filter(sub => sub.courseId === course.id)
    const submittedAssignments = new Set(courseSubmissions.map(sub => sub.assignmentId))
    const progress = totalAssignments > 0 ? Math.round((submittedAssignments.size / totalAssignments) * 100) : 0
    
    // Find next assignment to work on
    const nextAssignment = course.assignments.find(assignment => !submittedAssignments.has(assignment.id))
    
    return {
      id: enrollment.id,
      courseId: course.id,
      title: course.title,
      progress,
      assignmentsCompleted: submittedAssignments.size,
      totalAssignments,
      nextAssignment: nextAssignment?.title || 'All Assignments Complete',
      instructor: `Instructor ${course.instructorId}`,
      enrollment
    }
  })

  const totalProgress = enrolledCourses.length > 0 
    ? enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length 
    : 0

  const handleEnroll = async (courseId: string) => {
    try {
      await enrollInCourse({ variables: { courseId } })
    } catch (error) {
      console.error('Enrollment failed:', error)
    }
  }

  const isEnrolled = (courseId: string) => {
    return enrollments.some(enrollment => enrollment.courseId === courseId)
  }

  return (
    <div className="dashboard-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="dashboard-container"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="dashboard-header glass-card"
        >
          <div className="header-content">
            <div className="user-info">
              <div className="user-avatar">
                <User size={24} />
              </div>
              <div className="user-details">
                <h1 className="welcome-title">Welcome back, {user?.fullName?.split(' ')[0]}!</h1>
                <p className="user-role">
                  {user?.role === 'INSTRUCTOR' ? 'Instructor Dashboard' : 'Student Dashboard'}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="btn-secondary logout-button"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="stats-grid"
        >
          <div className="stat-card glass-card">
            <div className="stat-icon">
              <BookOpen size={24} />
            </div>
            <div className="stat-content">
              <h3>{enrolledCourses.length}</h3>
              <p>Enrolled Courses</p>
            </div>
          </div>
          
          <div className="stat-card glass-card">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h3>{Math.round(totalProgress)}%</h3>
              <p>Overall Progress</p>
            </div>
          </div>
          
          <div className="stat-card glass-card">
            <div className="stat-icon">
              <PlayCircle size={24} />
            </div>
            <div className="stat-content">
              <h3>{enrolledCourses.reduce((sum, course) => sum + course.assignmentsCompleted, 0)}</h3>
              <p>Assignments Completed</p>
            </div>
          </div>
          
          <div className="stat-card glass-card">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3>{totalCourses}</h3>
              <p>Available Courses</p>
            </div>
          </div>
        </motion.div>

        <div className="dashboard-content">
          {/* Instructor Tools Section */}
          {user?.role === 'INSTRUCTOR' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="section glass-card"
            >
              <div className="section-header">
                <h2>Instructor Tools</h2>
                <p>Manage your course content</p>
              </div>
              
              <div className="instructor-tools">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/items')}
                  className="btn-primary instructor-tool-button"
                >
                  <Filter size={20} />
                  <div className="tool-content">
                    <h3>Manage Items</h3>
                    <p>Complete CRUD for system items</p>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* My Courses Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="section glass-card"
          >
            <div className="section-header">
              <h2>My Courses</h2>
              <p>Continue your learning journey</p>
            </div>
            
            {enrolledCourses.length > 0 ? (
              <div className="courses-grid">
                {enrolledCourses.map((course, index: number) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="course-card"
                  >
                    <div className="course-header">
                      <h3>{course.title}</h3>
                      <span className="instructor">by {course.instructor}</span>
                    </div>
                    
                    <div className="progress-section">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          data-progress={course.progress}
                        />
                      </div>
                      <span className="progress-text">{course.progress}% Complete</span>
                    </div>
                    
                    <div className="course-stats">
                      <div className="stat">
                        <Clock size={16} />
                        <span>{course.assignmentsCompleted}/{course.totalAssignments} assignments</span>
                      </div>
                    </div>
                    
                    <div className="next-lesson">
                      <strong>Next:</strong> {course.nextAssignment}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/course/${course.courseId}`)}
                      className="btn-primary course-button"
                    >
                      Continue Learning
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <BookOpen size={48} />
                <h3>No enrolled courses yet</h3>
                <p>Browse available courses below to get started!</p>
              </div>
            )}
          </motion.div>

          {/* Available Courses Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="section glass-card"
          >
            <div className="section-header">
              <h2>Available Courses</h2>
              <p>Discover new learning opportunities</p>
            </div>
            
            {loading || enrollmentsLoading || submissionsLoading ? (
              <div className="loading-state">
                <div className="spinner" />
                <p>Loading courses...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <p>Failed to load courses. Please try again.</p>
              </div>
            ) : courses.length > 0 ? (
              <div className="courses-grid">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="course-card available"
                  >
                    <div className="course-header">
                      <h3>{course.title}</h3>
                      <span className="status">{course.status}</span>
                    </div>
                    
                    <p className="course-description">
                      {course.description || 'No description available'}
                    </p>
                    
                    <div className="course-stats">
                      <div className="stat">
                        <PlayCircle size={16} />
                        <span>{course.lessons.length} lessons</span>
                      </div>
                      <div className="stat">
                        <BookOpen size={16} />
                        <span>{course.assignments.length} assignments</span>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => isEnrolled(course.id) ? navigate(`/course/${course.id}`) : handleEnroll(course.id)}
                      disabled={enrolling}
                      className={`course-button ${isEnrolled(course.id) ? 'btn-primary' : 'btn-primary'}`}
                    >
                      {enrolling ? 'Enrolling...' : isEnrolled(course.id) ? 'View Course' : 'Enroll Now'}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <BookOpen size={48} />
                <h3>No courses available</h3>
                <p>Check back later for new courses!</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

    </div>
  )
}