import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/lib/AuthContext'
import { useEffect, useState } from 'react'
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Calendar,
  Tag,
  FileText
} from 'lucide-react'
import { 
  useGetItemQuery, 
  useDeleteItemMutation,
  useUpdateItemMutation,
  type Item,
  type ItemUpdateInput
} from '../../generated/graphql'
import { ItemForm } from '../../shared/ui/ItemForm'
import ReactMarkdown from 'react-markdown'
import toast from 'react-hot-toast'
import './ItemDetailPage.scss'

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showEditForm, setShowEditForm] = useState(false)

  const { data, loading, error } = useGetItemQuery({
    variables: { id: id! },
    skip: !id
  })

  const [deleteItem, { error: deleteItemError }] = useDeleteItemMutation({
    onCompleted: () => {
      toast.success('Item deleted successfully!')
      navigate('/items')
    }
  })

  const [updateItem, { error: updateItemError }] = useUpdateItemMutation({
    onCompleted: () => {
      toast.success('Item updated successfully!')
      setShowEditForm(false)
    }
  })

  useEffect(() => {
    if (deleteItemError) {
      if (deleteItemError.message.includes('You can only modify items in your own courses')) {
        toast.error('Access denied. You can only modify items in your own courses.')
      } else if (deleteItemError.message.includes('Not found')) {
        toast.error('Item not found.')
      } else {
        toast.error(deleteItemError.message || 'Failed to delete item.')
      }
    }
  }, [deleteItemError])

  useEffect(() => {
    if (updateItemError) {
      if (updateItemError.message.includes('You can only modify items in your own courses')) {
        toast.error('Access denied. You can only modify items in your own courses.')
      } else if (updateItemError.message.includes('Not found')) {
        toast.error('Item not found.')
      } else {
        toast.error(updateItemError.message || 'Failed to update item.')
      }
    }
  }, [updateItemError])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteItem({ variables: { id: id! } })
    }
  }

  const handleEdit = () => {
    setShowEditForm(true)
  }

  const handleUpdate = async (formData: ItemUpdateInput) => {
    await updateItem({ variables: { id: id!, input: formData } })
  }

  // Check if user is instructor
  if (user?.role !== 'INSTRUCTOR') {
    return (
      <div className="item-detail-page">
        <div className="access-denied">
        <h2>Access Denied</h2>
        <p>Only instructors can access item management.</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="item-detail-page">
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading item...</p>
        </div>
      </div>
    )
  }

  if (error || !data?.item) {
    return (
      <div className="item-detail-page">
        <div className="error-state">
          <h2>Item not found</h2>
          <p>The item you are looking for does not exist or has been deleted.</p>
          <button onClick={() => navigate('/items')} className="btn-primary">
            Back to Items
          </button>
        </div>
      </div>
    )
  }

  const item = data.item

  return (
    <div className="item-detail-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="item-detail-container"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="item-header glass-card"
        >
          <div className="header-content">
            <div className="header-left">
              <button 
                onClick={() => navigate('/items')} 
                className="btn-secondary back-button"
              >
                <ArrowLeft size={16} />
                <span>Back to Items</span>
              </button>
              <div className="title-section">
                <h1>{item.title}</h1>
                <p>Item Details</p>
              </div>
            </div>
            <div className="header-actions">
              {/* Show edit/delete buttons only if user owns the course */}
              {user?.role === 'INSTRUCTOR' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEdit}
                    className="btn-secondary edit-button"
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDelete}
                    className="btn-danger delete-button"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Item Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="item-content glass-card"
        >
          {/* Basic Info */}
          <div className="item-info">
            <div className="info-row">
              <div className="info-item">
                <label>Item ID</label>
                <span className="item-id">{item.id}</span>
              </div>
              <div className="info-item">
                <label>Lesson ID</label>
                <span className="lesson-id">{item.lessonId}</span>
              </div>
            </div>

            {/* Course Information - Not available in current query */}

            {item.description && (
              <div className="info-item full-width">
                <label>Description</label>
                <p className="item-description">{item.description}</p>
              </div>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className="info-item full-width">
                <label>
                  <Tag size={16} />
                  Tags
                </label>
                <div className="tags-container">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="info-row">
              <div className="info-item">
                <label>
                  <Calendar size={16} />
                  Created Date
                </label>
                <span className="date">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
              {item.updatedAt !== item.createdAt && (
                <div className="info-item">
                  <label>
                    <Calendar size={16} />
                    Last Updated
                  </label>
                  <span className="date">
                    {new Date(item.updatedAt).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Markdown Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="markdown-content glass-card"
        >
          <div className="content-header">
            <h2>
              <FileText size={20} />
              Markdown Content
            </h2>
          </div>
          
          <div className="markdown-preview">
            <ReactMarkdown 
              components={{
                // Custom styling for markdown elements
                h1: ({ children }) => <h1 className="markdown-h1">{children}</h1>,
                h2: ({ children }) => <h2 className="markdown-h2">{children}</h2>,
                h3: ({ children }) => <h3 className="markdown-h3">{children}</h3>,
                p: ({ children }) => <p className="markdown-p">{children}</p>,
                ul: ({ children }) => <ul className="markdown-ul">{children}</ul>,
                ol: ({ children }) => <ol className="markdown-ol">{children}</ol>,
                li: ({ children }) => <li className="markdown-li">{children}</li>,
                code: ({ children, className }) => {
                  const isInline = !className
                  return isInline ? (
                    <code className="markdown-inline-code">{children}</code>
                  ) : (
                    <code className="markdown-code-block">{children}</code>
                  )
                },
                pre: ({ children }) => <pre className="markdown-pre">{children}</pre>,
                blockquote: ({ children }) => <blockquote className="markdown-blockquote">{children}</blockquote>,
                a: ({ children, href }) => <a href={href} className="markdown-link" target="_blank" rel="noopener noreferrer">{children}</a>,
                strong: ({ children }) => <strong className="markdown-strong">{children}</strong>,
                em: ({ children }) => <em className="markdown-em">{children}</em>
              }}
            >
              {item.bodyMarkdown}
            </ReactMarkdown>
          </div>
        </motion.div>
      </motion.div>

      {showEditForm && (
        <ItemForm
          item={item as Item}
          onSubmit={handleUpdate}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </div>
  )
}

