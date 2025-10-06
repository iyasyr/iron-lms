import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/lib/AuthContext'
import { LogOut, User, BookOpen, PlayCircle, Clock, Users, TrendingUp, Filter } from 'lucide-react'
import { useGetCoursesQuery, useGetMyEnrollmentsQuery, useMySubmissionsQuery } from '../../generated/graphql'
import { httpClient } from '../../shared/api/http'
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

  const { data: submissionsData} = useMySubmissionsQuery({
    variables: { page: 0, pageSize: 100 }
  })

  if (enrollmentsError) {
    toast.error('Failed to load enrollments')
  }

  const [enrolling, setEnrolling] = useState(false)

  const courses = data?.courses?.content || []
  const totalCourses = data?.courses?.pageInfo?.totalElements || 0
  const enrollments = enrollmentsData?.myEnrollments?.content || []

  const submissions = submissionsData?.mySubmissions?.content || []
  
  const enrolledCourses = enrollments.map(enrollment => {
    const course = enrollment.course
    const totalAssignments = course.assignments.length
    const submittedAssignments = submissions.filter(submission => 
      course.assignments.some(assignment => assignment.id === submission.assignmentId)
    ).length
    
    return {
      ...course,
      enrollmentDate: enrollment.enrolledAt,
      totalAssignments,
      submittedAssignments,
      progress: totalAssignments > 0 ? (submittedAssignments / totalAssignments) * 100 : 0
    }
  })

  const handleEnroll = async (courseId: string) => {
    try {
      setEnrolling(true)
      console.log('Attempting to enroll in course:', courseId)
      
      // Use HTTP client to call the enrollment API
      await httpClient.post(`/api/courses/${courseId}/enroll`)
      
      console.log('Enrollment successful')
      toast.success('Successfully enrolled in course!')
      refetchEnrollments()
    } catch (error) {
      console.error('Enrollment failed:', error)
      toast.error('Failed to enroll in course')
    } finally {
      setEnrolling(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading || enrollmentsLoading) {
    return (
      <div className="dashboard-page">
        <div className="loading-container">
          <div className="spinner" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="dashboard-container"
      >
        <header className="dashboard-header">
          <div className="header-content">
            <div className="welcome-section">
              <h1>Welcome back, {user?.fullName}!</h1>
              <p>Continue your learning journey</p>
            </div>
            <div className="user-actions">
              <div className="user-info">
                <User size={20} />
                <span>{user?.role}</span>
              </div>
              <button onClick={handleLogout} className="btn-secondary logout-btn">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        <div className="dashboard-stats">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="stat-card"
          >
            <div className="stat-icon">
              <BookOpen size={24} />
            </div>
            <div className="stat-content">
              <h3>{enrolledCourses.length}</h3>
              <p>Enrolled Courses</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="stat-card"
          >
            <div className="stat-icon">
              <PlayCircle size={24} />
            </div>
            <div className="stat-content">
              <h3>{submissions.length}</h3>
              <p>Assignments Submitted</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="stat-card"
          >
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h3>{Math.round(enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length || 0)}%</h3>
              <p>Average Progress</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="stat-card"
          >
            <div className="stat-icon">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <h3>{totalCourses}</h3>
              <p>Available Courses</p>
            </div>
          </motion.div>
        </div>

        <div className="dashboard-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="content-section"
          >
            <div className="section-header">
              <h2>My Courses</h2>
              <span className="course-count">{enrolledCourses.length} enrolled</span>
            </div>
            
            {enrolledCourses.length > 0 ? (
              <div className="courses-grid">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="course-card enrolled"
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    <div className="course-header">
                      <h3>{course.title}</h3>
                      <div className="course-status enrolled">Enrolled</div>
                    </div>
                    
                    {course.description && (
                      <p className="course-description">{course.description}</p>
                    )}
                    
                    <div className="course-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${Math.round(course.progress)}%` }}
                        />
                      </div>
                      <span className="progress-text">
                        {course.submittedAssignments}/{course.totalAssignments} assignments
                      </span>
                    </div>
                    
                    <div className="course-meta">
                      <div className="meta-item">
                        <Users size={16} />
                        <span>Enrolled {new Date(course.enrollmentDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <BookOpen size={48} />
                <h3>No enrolled courses</h3>
                <p>Browse available courses below to start learning!</p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="content-section"
          >
            <div className="section-header">
              <h2>Available Courses</h2>
              <span className="course-count">{courses.length} available</span>
            </div>
            
            {courses.length > 0 ? (
              <div className="courses-grid">
                {courses.map((course, index) => {
                  const isEnrolled = enrollments.some(enrollment => enrollment.courseId === course.id)
                  
                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      className={`course-card ${isEnrolled ? 'enrolled' : 'available'}`}
                      onClick={() => !isEnrolled ? navigate(`/course/${course.id}`) : null}
                    >
                      <div className="course-header">
                        <h3>{course.title}</h3>
                        <div className={`course-status ${isEnrolled ? 'enrolled' : 'available'}`}>
                          {isEnrolled ? 'Enrolled' : 'Available'}
                        </div>
                      </div>
                      
                      {course.description && (
                        <p className="course-description">{course.description}</p>
                      )}
                      
                      <div className="course-meta">
                        <div className="meta-item">
                          <PlayCircle size={16} />
                          <span>{course.lessons.length} lessons</span>
                        </div>
                        <div className="meta-item">
                          <Filter size={16} />
                          <span>{course.assignments.length} assignments</span>
                        </div>
                      </div>
                      
                      {!isEnrolled && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEnroll(course.id)
                          }}
                          disabled={enrolling}
                          className="btn-primary enroll-btn"
                        >
                          {enrolling ? 'Enrolling...' : 'Enroll Now'}
                        </button>
                      )}
                    </motion.div>
                  )
                })}
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
