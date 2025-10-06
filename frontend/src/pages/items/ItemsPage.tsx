import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/lib/AuthContext'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowLeft, 
  ArrowRight,
  Wifi,
  WifiOff,
  Filter
} from 'lucide-react'
import { 
  useGetItemsQuery, 
  useDeleteItemMutation,
  useCreateItemMutation,
  useUpdateItemMutation,
  type Item,
  type ItemCreateInput,
  type ItemUpdateInput,
} from '../../generated/graphql'
import { ItemForm } from '../../shared/ui/ItemForm'
import toast from 'react-hot-toast'
import './ItemsPage.scss'

type HealthStatus = 'checking' | 'connected' | 'disconnected'

export default function ItemsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize] = useState(9)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [healthStatus, setHealthStatus] = useState<HealthStatus>('disconnected')

  const { data, loading, refetch } = useGetItemsQuery({
    variables: { 
      search: searchTerm || undefined, 
      page: currentPage, 
      pageSize 
    }
  })

  const [deleteItem, { error: deleteItemError }] = useDeleteItemMutation({
    onCompleted: () => {
      toast.success('Item deleted successfully!')
      refetch()
    }
  })

  const [createItem, { error: createItemError }] = useCreateItemMutation({
    onCompleted: () => {
      toast.success('Item created successfully!')
      setShowCreateForm(false)
      refetch()
    }
  })

  const [updateItem, { error: updateItemError }] = useUpdateItemMutation({
    onCompleted: () => {
      toast.success('Item updated successfully!')
      setEditingItem(null)
      refetch()
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
    if (createItemError) {
      if (createItemError.message.includes('You can only modify items in your own courses')) {
        toast.error('Access denied. You can only modify items in your own courses.')
      } else if (createItemError.message.includes('Not found')) {
        toast.error('Lesson not found.')
      } else {
        toast.error(createItemError.message || 'Failed to create item.')
      }
    }
  }, [createItemError])

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

  const checkHealth = async () => {
    setHealthStatus('checking')
    try {
      const response = await fetch('http://localhost:8080/api/health')
      if (response.ok) {
        setHealthStatus('connected')
        toast.success('Database connection established')
      } else {
        setHealthStatus('disconnected')
        toast.error('No database connection')
      }
    } catch {
      setHealthStatus('disconnected')
      toast.error('No database connection')
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(0)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteItem({ variables: { id } })
    }
  }

  const handleCreate = async (formData: ItemCreateInput) => {
    await createItem({ variables: { input: formData } })
  }

  const handleUpdate = async (id: string, formData: ItemUpdateInput) => {
    await updateItem({ variables: { id, input: formData } })
  }

  const items = data?.items?.content || []
  const pageInfo = data?.items?.pageInfo
  const totalPages = pageInfo?.totalPages || 0
  const hasNext = pageInfo?.hasNext || false
  const hasPrevious = currentPage > 0

  if (user?.role !== 'INSTRUCTOR') {
    return (
      <div className="items-page">
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

  return (
    <div className="items-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="items-container"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="items-header glass-card"
        >
          <div className="header-content">
            <div className="header-left">
              <button 
                onClick={() => navigate('/dashboard')} 
                className="btn-secondary back-button"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <div className="title-section">
                <h1>MyItems - Item Management</h1>
                <p>Complete CRUD for system items</p>
              </div>
            </div>
            <div className="header-actions">
              <button
                onClick={checkHealth}
                className={`health-button ${healthStatus}`}
                disabled={healthStatus === 'checking'}
              >
                {healthStatus === 'checking' ? (
                  <div className="spinner" />
                ) : healthStatus === 'connected' ? (
                  <Wifi size={16} />
                ) : (
                  <WifiOff size={16} />
                )}
                <span>
                  {healthStatus === 'checking' ? 'Checking...' : 
                   healthStatus === 'connected' ? 'Connection open' : 'Check Connection'}
                </span>
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateForm(true)}
                className="btn-primary create-button"
              >
                <Plus size={16} />
                <span>Create Lesson</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="search-section glass-card"
        >
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search by title or tags..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => handleSearch('')}
                  className="clear-search"
                >
                  ×
                </button>
              )}
            </div>
            <div className="search-info">
              <span>
                {loading ? 'Loading...' : `${pageInfo?.totalElements || 0} items found`}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="items-section glass-card"
        >
          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Loading items...</p>
            </div>
          ) : items.length > 0 ? (
            <>
              <div className="items-grid">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="item-card"
                  >
                    <div className="item-header">
                      <h3 className="item-title">{item.title}</h3>
                      <div className="item-actions">
                        <button
                          onClick={() => navigate(`/items/${item.id}`)}
                          className="btn-icon"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => setEditingItem(item as Item)}
                          className="btn-icon"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="btn-icon danger"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {item.description && (
                      <p className="item-description">{item.description}</p>
                    )}

                    
                    {item.tags && item.tags.length > 0 && (
                      <div className="item-tags">
                        {item.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="item-meta">
                      <span className="item-date">
                        Created: {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                      {item.updatedAt !== item.createdAt && (
                        <span className="item-date">
                          Updated: {new Date(item.updatedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!hasPrevious}
                    className="btn-secondary pagination-button"
                  >
                    <ArrowLeft size={16} />
                    <span>Previous</span>
                  </button>
                  
                  <div className="pagination-info">
                    <span>
                      Page {currentPage + 1} of {totalPages}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasNext}
                    className="btn-secondary pagination-button"
                  >
                    <span>Next</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <Filter size={48} />
              <h3>No lessons found</h3>
              <p>
                {searchTerm 
                  ? 'No lessons match your search.' 
                  : 'No lessons created yet. Create your first lesson!'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="btn-primary"
                >
                  Create First Lesson
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>

      {(showCreateForm || editingItem) && (
        <ItemForm
          item={editingItem}
          onSubmit={editingItem ? 
            (formData: ItemUpdateInput) => handleUpdate(editingItem.id, formData) : 
            (formData: ItemCreateInput | ItemUpdateInput) => handleCreate(formData as ItemCreateInput)
          }
          onClose={() => {
            setShowCreateForm(false)
            setEditingItem(null)
          }}
        />
      )}
    </div>
  )
}

