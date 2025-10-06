import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  useGetCoursesQuery,
  useCreateLessonMutation,
  type Item,
  type ItemCreateInput,
  type ItemUpdateInput,
  type LessonCreateInput
} from '../../../generated/graphql'
import { LessonSelect, CourseSelect, type LessonOption, type CourseOption } from '../Select'
import toast from 'react-hot-toast'

interface FormData {
  courseId: string
  lessonTitle: string
  lessonOrderIndex: number
  lessonId: string
  title: string
  description: string
  tags: string
  bodyMarkdown: string
}

type FormStep = 'select-lesson' | 'create-lesson' | 'create-item'

export interface ItemFormProps {
  item?: Item | null
  onSubmit: (formData: ItemCreateInput | ItemUpdateInput) => void
  onClose: () => void
}

export function ItemForm({ item, onSubmit, onClose }: ItemFormProps) {
  const [formStep, setFormStep] = useState<FormStep>(
    item ? 'create-item' : 'select-lesson'
  )
  
  const { data: coursesData, loading: coursesLoading } = useGetCoursesQuery({
    variables: { page: 0, pageSize: 100 },
    skip: !!item
  })

  const [formData, setFormData] = useState<FormData>({
    courseId: '',
    lessonTitle: '',
    lessonOrderIndex: 1,
    lessonId: item?.lessonId || '',
    title: item?.title || '',
    description: item?.description || '',
    tags: item?.tags?.join(', ') || '',
    bodyMarkdown: item?.bodyMarkdown || ''
  })

  const availableLessons: LessonOption[] = coursesData?.courses?.content?.flatMap(course => 
    course.lessons?.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      courseTitle: course.title,
      orderIndex: lesson.orderIndex
    })) || []
  ) || []

  const availableCourses: CourseOption[] = coursesData?.courses?.content?.map(course => ({
    id: course.id,
    title: course.title,
    description: course.description || undefined
  })) || []

  const [createLesson, { error: createLessonError }] = useCreateLessonMutation({
    onCompleted: (data) => {
      setFormData(prev => ({ ...prev, lessonId: data.createLesson.id }))
      setFormStep('create-item')
      toast.success('Lesson created successfully!')
    }
  })

  useEffect(() => {
    if (createLessonError) {
      toast.error(createLessonError.message || 'Failed to create lesson.')
    }
  }, [createLessonError])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formStep === 'create-lesson') {
      if (!formData.courseId) {
        toast.error('Please select a course')
        return
      }
      if (!formData.lessonTitle.trim()) {
        toast.error('Lesson title is required')
        return
      }
      
      const lessonInput: LessonCreateInput = {
        courseId: formData.courseId,
        title: formData.lessonTitle,
        orderIndex: formData.lessonOrderIndex
      }
      
      createLesson({ variables: { input: lessonInput } })
      return
    }
    
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }

    if (!item && !formData.lessonId) {
      toast.error('Lesson ID is required')
      return
    }

    const tags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    const submitData = item ? {
      title: formData.title,
      description: formData.description,
      tags,
      bodyMarkdown: formData.bodyMarkdown
    } as ItemUpdateInput : {
      lessonId: formData.lessonId,
      title: formData.title,
      description: formData.description,
      tags,
      bodyMarkdown: formData.bodyMarkdown
    } as ItemCreateInput

    onSubmit(submitData)
  }

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="modal-content"
      >
        <div className="modal-header">
          <h2>
            {item ? 'Edit Item' : 
             formStep === 'select-lesson' ? 'Create New Item' :
             formStep === 'create-lesson' ? 'Create Lesson' :
             'Create Item'}
          </h2>
          <button onClick={onClose} className="close-button">
            ×
          </button>
        </div>

        {!item && (
          <div className="step-indicator">
            <div className={`step ${formStep === 'select-lesson' || formStep === 'create-lesson' ? 'active' : formStep === 'create-item' ? 'completed' : ''}`}>
              <span>1</span>
              <label>Lesson</label>
            </div>
            <div className={`step ${formStep === 'create-item' ? 'active' : ''}`}>
              <span>2</span>
              <label>Content</label>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="item-form">
          {formStep === 'select-lesson' && (
            <>
              <div className="form-group">
                <label>Choose an option:</label>
                <div className="option-buttons">
                  <button
                    type="button"
                    onClick={() => setFormStep('create-lesson')}
                    className="btn-secondary option-btn"
                  >
                    Create New Lesson
                  </button>
                  {availableLessons.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.lessonId) {
                          toast.error('Please select a lesson first')
                          return
                        }
                        setFormStep('create-item')
                      }}
                      className="btn-secondary option-btn"
                    >
                      Use Existing Lesson
                    </button>
                  )}
                </div>
              </div>

              {availableLessons.length > 0 && (
                <div className="form-group">
                  <label>Select Existing Lesson *</label>
                  <LessonSelect
                    value={availableLessons.find(lesson => lesson.id === formData.lessonId) || null}
                    onChange={(lesson) => 
                      setFormData({ ...formData, lessonId: lesson?.id || '' })
                    }
                    options={availableLessons}
                    placeholder={coursesLoading ? 'Loading lessons...' : 'Select a lesson'}
                    isDisabled={coursesLoading}
                    isLoading={coursesLoading}
                  />
                </div>
              )}

              {availableLessons.length === 0 && !coursesLoading && (
                <div className="form-group">
                  <div className="no-lessons-message">
                    <p>No lessons available. You need to create a lesson first.</p>
                  </div>
                </div>
              )}
            </>
          )}

          {formStep === 'create-lesson' && (
            <>
              <div className="form-group">
                <label>Course *</label>
                <CourseSelect
                  value={availableCourses.find(course => course.id === formData.courseId) || null}
                  onChange={(course) => 
                    setFormData({ ...formData, courseId: course?.id || '' })
                  }
                  options={availableCourses}
                  placeholder={coursesLoading ? 'Loading courses...' : 'Select a course'}
                  isDisabled={coursesLoading}
                  isLoading={coursesLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lessonTitle">Lesson Title *</label>
                <input
                  type="text"
                  id="lessonTitle"
                  value={formData.lessonTitle}
                  onChange={(e) => setFormData({ ...formData, lessonTitle: e.target.value })}
                  required
                  placeholder="Enter lesson title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lessonOrderIndex">Order Index *</label>
                <input
                  type="number"
                  id="lessonOrderIndex"
                  value={formData.lessonOrderIndex}
                  onChange={(e) => setFormData({ ...formData, lessonOrderIndex: parseInt(e.target.value) || 1 })}
                  required
                  min="1"
                  placeholder="Lesson order in course"
                />
              </div>
            </>
          )}

          {formStep === 'create-item' && (
            <>
              {item ? (
                <div className="form-group">
                  <label>Current Lesson</label>
                  <div className="lesson-display">
                    <input
                      type="text"
                      value={formData.lessonId}
                      disabled
                      className="disabled-input"
                      aria-label="Current lesson ID"
                    />
                    <small className="form-help-text">
                      Lesson cannot be changed after creation
                    </small>
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label>Selected Lesson</label>
                  <div className="lesson-display">
                    <input
                      type="text"
                      value={formData.lessonId}
                      disabled
                      className="disabled-input"
                      aria-label="Selected lesson ID"
                    />
                    <small className="form-help-text">
                      Lesson selected for this item
                    </small>
                  </div>
                </div>
              )}
            </>
          )}

          {(formStep === 'create-item' || item) && (
            <>
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Enter the item title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional item description"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Tags separated by commas (e.g: react, javascript, tutorial)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bodyMarkdown">Markdown Content *</label>
                <textarea
                  id="bodyMarkdown"
                  value={formData.bodyMarkdown}
                  onChange={(e) => setFormData({ ...formData, bodyMarkdown: e.target.value })}
                  required
                  placeholder="Item content in Markdown format"
                  rows={8}
                />
              </div>
            </>
          )}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            
            {formStep === 'create-lesson' && (
              <button 
                type="button" 
                onClick={() => setFormStep('select-lesson')} 
                className="btn-secondary"
              >
                Back
              </button>
            )}
            
            {formStep === 'create-item' && !item && (
              <button 
                type="button" 
                onClick={() => setFormStep('select-lesson')} 
                className="btn-secondary"
              >
                Back
              </button>
            )}
            
            <button 
              type="submit" 
              className="btn-primary"
              disabled={formStep === 'select-lesson'}
            >
              {formStep === 'create-lesson' ? 'Create Lesson' :
               item ? 'Update Item' : 'Create Item'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
