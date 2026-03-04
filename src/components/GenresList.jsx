import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardGrid } from './shared/Card'
import { Loading, EmptyState } from './shared/UI'

function GenresList() {
  const { t } = useTranslation()
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGenres()
  }, [])

  const fetchGenres = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/v1/genres')
      if (!response.ok) throw new Error('Failed to fetch genres')
      const data = await response.json()
      setGenres(data)
    } catch (error) {
      console.error('Error fetching genres:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  if (genres.length === 0) {
    return (
      <EmptyState
        title={t('noGenres') || 'No genres found'}
        description="Explore film genres"
      />
    )
  }

  return (
    <div>
      <h2 style={{ color: '#646cff', marginBottom: '2rem' }}>Géneros</h2>
      <CardGrid>
        {genres.map(genre => (
          <Card
            key={genre.id}
            id={genre.id}
            type="genre"
            title={genre.type}
            description={`Género cinemático`}
            meta={[
              { label: 'Tipo', value: genre.type }
            ]}
          />
        ))}
      </CardGrid>
    </div>
  )
}

export default GenresList
