import { motion } from 'framer-motion'
import { useAuth } from '../../../shared/lib/AuthContext'
import { LogOut, User } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="page-header"
    >
      <div className="header-content">
        <div className="header-info">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="header-actions">
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
    </motion.header>
  )
}


