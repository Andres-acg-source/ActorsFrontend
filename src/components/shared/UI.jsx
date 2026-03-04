import { useState } from 'react'

export function Toast({ message, type = 'info', onClose }) {
  const [visible, setVisible] = useState(true)

  const handleClose = () => {
    setVisible(false)
    onClose && onClose()
  }

  if (!visible) return null

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button onClick={handleClose}>&times;</button>
    </div>
  )
}

export function Modal({ title, children, onClose, isOpen }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export function Loading() {
  return (
    <div className="spinner">
      <div className="spinner-ring"></div>
    </div>
  )
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
      {action && action}
    </div>
  )
}
