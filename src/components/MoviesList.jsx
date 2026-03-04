import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardGrid } from './shared/Card'
import { Loading, EmptyState } from './shared/UI'

function MoviesList() {
  const { t } = useTranslation()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/v1/movies')
      if (!response.ok) throw new Error('Failed to fetch movies')
      const data = await response.json()
      setMovies(data)
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  const filtered = movies.filter(m =>
    m.title?.toLowerCase().includes(query.toLowerCase())
  )

  if (filtered.length === 0) {
    return (
      <EmptyState
        title={t('noMovies') || 'No movies found'}
        description="Explore our film collection"
      />
    )
  }

  return (
    <div>
      <h2 style={{ color: '#646cff', marginBottom: '2rem' }}>Películas</h2>
      <input
        type="text"
        placeholder="Buscar película..."
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
      <CardGrid>
        {filtered.map(movie => (
          <Card
            key={movie.id}
            id={movie.id}
            type="movie"
            title={movie.title}
            image={movie.poster}
            description={`${movie.country || 'N/A'} - ${movie.duration || 0}m`}
            meta={[
              { label: 'Año', value: new Date(movie.releaseDate).getFullYear() },
              { label: 'Duración', value: `${movie.duration || 0}m` },
              { label: 'Popularidad', value: `${movie.popularity || 0}/10` }
            ]}
          />
        ))}
      </CardGrid>
    </div>
  )
}

export default MoviesList
