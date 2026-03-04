import { Link } from 'react-router-dom'

export function Card({
  id,
  title,
  image,
  description,
  meta = [],
  type = 'actor',
  actions = [],
  onClick = null
}) {
  const content = (
    <div className="card">
      {image && (
        <img
          src={image}
          alt={title}
          className="card-image"
        />
      )}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        {description && (
          <p className="card-description">{description}</p>
        )}
        {meta.length > 0 && (
          <div className="card-meta">
            {meta.map((item, idx) => (
              <div key={idx} className="meta-item">
                <strong>{item.label}:</strong>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        )}
        {actions.length > 0 && (
          <div className="card-actions">
            {actions.map((action, idx) => (
              <button
                key={idx}
                className={action.className || 'default-btn'}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  if (onClick) {
    return (
      <div onClick={onClick} style={{ cursor: 'pointer' }}>
        {content}
      </div>
    )
  }

  if (type === 'link' && id) {
    return (
      <Link to={`/${type}/${id}`}>
        {content}
      </Link>
    )
  }

  return content
}

export function CardGrid({ children }) {
  return <div className="card-grid">{children}</div>
}
