import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function EditActor({ actors, onUpdate }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    nationality: '',
    birthDate: '',
    biography: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Buscar el actor por ID
    const actor = actors.find(a => a.id === parseInt(id))
    if (actor) {
      setFormData(actor)
      setLoading(false)
    } else {
      // Redirigir a la lista si el actor no existe
      navigate('/actors')
    }
  }, [id, actors, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validación básica
    if (!formData.name || !formData.photo || !formData.nationality || !formData.birthDate || !formData.biography) {
      alert(t('pleaseFillAll'))
      return
    }

    onUpdate(formData)
    
    // Navegar a la lista de actores
    navigate('/actors')
  }

  const handleCancel = () => {
    navigate('/actors')
  }

  if (loading) {
    return <div className="loading">{t('loadingActorData')}</div>
  }

  return (
    <div className="form-container">
      <h2 className="form-title">{t('edit')} {t('actorDetail')}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">{t('name')}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('exampleActorName')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">{t('photoUrl')}</label>
          <input
            type="url"
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder={t('examplePhotoUrl')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nationality">{t('nationality')}</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            placeholder={t('exampleNationality')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthDate">{t('birthday')}</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="biography">{t('biography')}</label>
          <textarea
            id="biography"
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            placeholder="Escribe la biografía del actor..."
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {t('submit')}
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            {t('cancel')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditActor
