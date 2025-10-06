import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { 
  ArrowLeft, 
  PlayCircle, 
  Clock, 
  FileText, 
  User,
  Circle,
  Upload,
  Link,
  TrendingUp,
  CheckCircle
} from 'lucide-react'
import { useGetCourseQuery, useSubmitMutation } from '../../generated/graphql'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import './CoursePage.scss'

export default function CoursePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [submissionUrls, setSubmissionUrls] = useState<{ [assignmentId: string]: string }>({})
  const [submittedAssignments, setSubmittedAssignments] = useState<Set<string>>(new Set())
  
  const { data, loading, error } = useGetCourseQuery({
    variables: { id: id! }
  })

  const [submitAssignment, { loading: submitting }] = useSubmitMutation({
    onCompleted: (data) => {
      toast.success('Assignment submitted successfully!')
      setSubmissionUrls(prev => ({
        ...prev,
        [data.submit.assignmentId]: ''
      }))
      setSubmittedAssignments(prev => new Set([...prev, data.submit.assignmentId]))
    },
    onError: () => {
      toast.error('Failed to submit assignment')
    }
  })

  if (error) {
    toast.error('Failed to load course')
  }

  const course = data?.course

  if (loading) {
    return (
      <div className="course-page">
        <div className="course-container">
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading course...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="course-page">
        <div className="course-container">
          <div className="error-state">
            <h3>Course not found</h3>
            <p>The course you're looking for doesn't exist or you don't have access to it.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="btn-primary"
            >
              Back to Dashboard
            </motion.button>
          </div>
        </div>
      </div>
    )
  }

  const sortedLessons = [...course.lessons].sort((a, b) => a.orderIndex - b.orderIndex)
  const totalLessons = course.lessons.length
  const totalAssignments = course.assignments.length

  // Calculate progress based on submitted assignments
  const courseProgress = totalAssignments > 0 ? Math.round((submittedAssignments.size / totalAssignments) * 100) : 0

  const handleSubmission = async (assignmentId: string) => {
    const url = submissionUrls[assignmentId]
    if (!url.trim()) {
      toast.error('Please enter a URL for your submission')
      return
    }

    try {
      await submitAssignment({
        variables: {
          assignmentId,
          artifactUrl: url.trim()
        }
      })
    } catch (error) {
      console.error('Submission failed:', error)
    }
  }

  const handleUrlChange = (assignmentId: string, url: string) => {
    setSubmissionUrls(prev => ({
      ...prev,
      [assignmentId]: url
    }))
  }

  return (
    <div className="course-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="course-container"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="course-header glass-card"
        >
          <div className="header-content">
            <div className="course-info">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="btn-secondary back-button"
              >
                <ArrowLeft size={16} />
                <span>Back to Dashboard</span>
              </motion.button>
              
              <div className="course-title-section">
                <h1 className="course-title">{course.title}</h1>
                <div className="course-meta">
                  <span className="status">{course.status}</span>
                  <span className="instructor">by Instructor {course.instructorId}</span>
                </div>
              </div>
              
              {course.description && (
                <p className="course-description">{course.description}</p>
              )}
            </div>
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
              <PlayCircle size={24} />
            </div>
            <div className="stat-content">
              <h3>{totalLessons}</h3>
              <p>Lessons</p>
            </div>
          </div>
          
          <div className="stat-card glass-card">
            <div className="stat-icon">
              <FileText size={24} />
            </div>
            <div className="stat-content">
              <h3>{totalAssignments}</h3>
              <p>Assignments</p>
            </div>
          </div>
          
          <div className="stat-card glass-card">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h3>{courseProgress}%</h3>
              <p>Course Progress</p>
            </div>
          </div>
          
          <div className="stat-card glass-card">
            <div className="stat-icon">
              <User size={24} />
            </div>
            <div className="stat-content">
              <h3>{submittedAssignments.size}</h3>
              <p>Completed</p>
            </div>
          </div>
        </motion.div>

        <div className="course-content">
          {/* Lessons Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="section glass-card"
          >
            <div className="section-header">
              <h2>Course Lessons</h2>
              <p>Follow the lessons in order to complete the course</p>
            </div>
            
            {sortedLessons.length > 0 ? (
              <div className="lessons-list">
                {sortedLessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="lesson-card"
                  >
                    <div className="lesson-header">
                      <div className="lesson-number">
                        {lesson.orderIndex}
                      </div>
                      <div className="lesson-info">
                        <h3>{lesson.title}</h3>
                        {lesson.item && (
                          <p className="lesson-description">
                            {lesson.item.description || 'No description available'}
                          </p>
                        )}
                      </div>
                      <div className="lesson-status">
                        <Circle size={20} className="status-icon" />
                      </div>
                    </div>
                    
                    {lesson.item && (
                      <div className="lesson-content">
                        <div className="content-tags">
                          {lesson.item.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="content-preview">
                          <ReactMarkdown>
                            {lesson.item.bodyMarkdown}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}
                    
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <PlayCircle size={48} />
                <h3>No lessons available</h3>
                <p>This course doesn't have any lessons yet.</p>
              </div>
            )}
          </motion.div>

          {/* Assignments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="section glass-card"
          >
            <div className="section-header">
              <h2>Course Assignments</h2>
              <p>Complete assignments to test your knowledge</p>
            </div>
            
            {course.assignments.length > 0 ? (
              <div className="assignments-list">
                {course.assignments.map((assignment, index) => (
                  <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="assignment-card"
                  >
                    <div className="assignment-header">
                      <h3>{assignment.title}</h3>
                      <div className="assignment-meta">
                        <span className="points">{assignment.maxPoints} points</span>
                        {assignment.dueAt && (
                          <span className="due-date">
                            <Clock size={14} />
                            Due: {new Date(assignment.dueAt).toLocaleDateString()}
                          </span>
                        )}
                        {submittedAssignments.has(assignment.id) && (
                          <span className="submission-status submitted">
                            ✓ Submitted
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {assignment.instructions && (
                      <p className="assignment-instructions">
                        {assignment.instructions}
                      </p>
                    )}
                    
                    <div className="assignment-options">
                      <span className={`allow-late ${assignment.allowLate ? 'allowed' : 'not-allowed'}`}>
                        {assignment.allowLate ? 'Late submissions allowed' : 'No late submissions'}
                      </span>
                    </div>
                    
                    {submittedAssignments.has(assignment.id) ? (
                      <div className="submission-completed">
                        <div className="completed-status">
                          <div className="status-icon">
                            <CheckCircle size={20} className="check-icon" />
                          </div>
                          <div className="status-text">
                            <h4>Assignment Submitted</h4>
                            <p>Your submission has been received and is being reviewed.</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn-secondary resubmit-button"
                          onClick={() => {
                            // Allow resubmission by clearing the submitted state
                            setSubmittedAssignments(prev => {
                              const newSet = new Set(prev)
                              newSet.delete(assignment.id)
                              return newSet
                            })
                          }}
                        >
                          Resubmit
                        </motion.button>
                      </div>
                    ) : (
                      <div className="submission-form">
                        <div className="url-input-group">
                          <Link size={16} className="input-icon" />
                          <input
                            type="url"
                            placeholder="Enter your submission URL (GitHub, CodePen, etc.)"
                            value={submissionUrls[assignment.id] || ''}
                            onChange={(e) => handleUrlChange(assignment.id, e.target.value)}
                            className="url-input"
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSubmission(assignment.id)}
                          disabled={submitting || !submissionUrls[assignment.id]?.trim()}
                          className="btn-primary submit-button"
                        >
                          <Upload size={16} />
                          {submitting ? 'Submitting...' : 'Submit Assignment'}
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <FileText size={48} />
                <h3>No assignments available</h3>
                <p>This course doesn't have any assignments yet.</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
