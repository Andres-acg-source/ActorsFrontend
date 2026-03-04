import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function ActorsList({ actors, onDelete, loading }) {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  if (loading) {
    return <div className="loading">{t('loading')}</div>
  }

  const filtered = actors.filter(actor => {
    const text = `${actor.name} ${actor.nationality}`.toLowerCase()
    return text.includes(query.toLowerCase())
  })

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        <h2>{t('noActors')}</h2>
        <p>{t('createFirst')}</p>
        <Link to="/crear" style={{ color: '#646cff' }}>{t('createActor')}</Link>
      </div>
    )
  }

  return (
    <div>
      <h2 style={{ color: '#646cff', marginBottom: '2rem' }}>{t('actors')}</h2>
      <input
        type="text"
        aria-label={t('searchPlaceholder')}
        placeholder={t('searchPlaceholder')}
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          marginBottom: '1.5rem',
          borderRadius: '4px',
          border: '1px solid #646cff',
          backgroundColor: '#2a2a2a',
          color: '#fff'
        }}
      />
      <div className="actors-list">
        {filtered.map(actor => (
          <div key={actor.id} className="actor-card">
            <img 
              src={actor.photo} 
              alt={actor.name} 
              className="actor-image"
            />
            <div className="actor-info">
              <h3 className="actor-name">{actor.name}</h3>
              
              <div className="actor-details">
                <div className="actor-detail">
                  <strong>{t('nationality')}:</strong>
                  <span>{actor.nationality}</span>
                </div>
                <div className="actor-detail">
                  <strong>{t('birthday')}:</strong>
                  <span>{new Date(actor.birthDate).toLocaleDateString('es-ES')}</span>
                </div>
              </div>

              <div className="actor-biography">
                {actor.biography}
              </div>

              <div className="actor-actions">
                <Link to={`/actor/${actor.id}`} style={{ flex: 1 }}>
                  <button className="edit-btn" style={{ width: '100%' }}>
                    {t('details')}
                  </button>
                </Link>
                <Link to={`/editar/${actor.id}`} style={{ flex: 1 }}>
                  <button className="edit-btn" style={{ width: '100%' }}>
                    {t('edit')}
                  </button>
                </Link>
                <button 
                  className="delete-btn"
                  onClick={() => {
                    if (window.confirm(`${t('confirmDelete')} ${actor.name}?`)) {
                      onDelete(actor.id)
                    }
                  }}
                >
                  {t('delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActorsList
