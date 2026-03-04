import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function ActorDetail({ actors }) {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()

  const actor = actors.find(a => a.id === parseInt(id))
  if (!actor) {
    return <div className="loading">{t('loading')}</div>
  }

  return (
    <div className="actor-card">
      <img src={actor.photo} alt={actor.name} className="actor-image" />
      <div className="actor-info">
        <h2 className="actor-name">{actor.name}</h2>
        <div className="actor-details">
          <div className="actor-detail">
            <strong>{t('nationality')}:</strong>
            <span>{actor.nationality}</span>
          </div>
          <div className="actor-detail">
            <strong>{t('birthday')}:</strong>
            <span>{new Date(actor.birthDate).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="actor-biography">{actor.biography}</div>
        <button onClick={() => navigate('/actors')} className="cancel-btn">
          {t('cancel')}
        </button>
      </div>
    </div>
  )
}

export default ActorDetail
