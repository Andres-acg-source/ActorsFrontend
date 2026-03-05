import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardGrid } from './shared/Card'
import { Loading, EmptyState } from './shared/UI'

function DirectorsList() {
  const { t } = useTranslation()
  const [directors, setDirectors] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchDirectors()
  }, [])

  const fetchDirectors = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/v1/directors')
      if (!response.ok) throw new Error('Failed to fetch directors')
      const data = await response.json()
      setDirectors(data)
    } catch (error) {
      console.error('Error fetching directors:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  const filtered = directors.filter(d =>
    d.name?.toLowerCase().includes(query.toLowerCase())
  )

  if (filtered.length === 0) {
    return (
      <EmptyState
        title={t('noDirectors') || 'No directors found'}
        description="Explore film directors"
      />
    )
  }

  return (
    <div>
      <h2 style={{ color: '#646cff', marginBottom: '2rem' }}>{t('directors')}</h2>
      <input
        type="text"
        placeholder={t('searchDirectors')}
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
        {filtered.map(director => (
          <Card
            key={director.id}
            id={director.id}
            type="director"
            title={director.name}
            image={director.photo}
            description={director.biography}
            meta={[
              { label: t('country'), value: director.nationality },
              { label: t('birth'), value: new Date(director.birthDate).toLocaleDateString('es-ES') }
            ]}
          />
        ))}
      </CardGrid>
    </div>
  )
}

export default DirectorsList
