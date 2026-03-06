import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Createmovie({ onAdd }) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    poster: '',
    duration: '',
    country: '',
    releaseDate: '',
    popularity: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !formData.title ||
      !formData.poster ||
      !formData.duration ||
      !formData.country ||
      !formData.releaseDate ||
      !formData.popularity
    ) {
      alert(t('pleaseFillAll'))
      return
    }

    onAdd(formData)

    // Navegar a la lista de películas
    navigate('/movies')
  }

  const handleCancel = () => {
    navigate('/movies')
  }

  return (
    <div className="form-container">
      <h2 className="form-title">{t('createMovie')}</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="title">{t('title')}</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={t('exampleMovietitle')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="poster">{t('posterUrl')}</label>
          <input
            type="url"
            id="poster"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            placeholder={t('exampleposterUrl')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">{t('duration')}</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder={t('exampledurationTime')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">{t('country')}</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder={t('examplecountry')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="releaseDate">{t('release')}</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="popularity">{t('popularity')}</label>
          <textarea
            id="popularity"
            name="popularity"
            value={formData.popularity}
            onChange={handleChange}
            placeholder={t('moviepopularityPlaceholder')}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {t('submit')}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={handleCancel}
          >
            {t('cancel')}
          </button>
        </div>

      </form>
    </div>
  )
}

export default Createmovie