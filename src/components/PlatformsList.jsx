import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardGrid } from './shared/Card'
import { Loading, EmptyState } from './shared/UI'

function PlatformsList() {
  const { t } = useTranslation()
  const [platforms, setPlatforms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPlatforms()
  }, [])

  const fetchPlatforms = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/v1/platforms')
      if (!response.ok) throw new Error('Failed to fetch platforms')
      const data = await response.json()
      setPlatforms(data)
    } catch (error) {
      console.error('Error fetching platforms:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  if (platforms.length === 0) {
    return (
      <EmptyState
        title={t('noPlatforms') || 'No platforms found'}
        description="Explore streaming platforms"
      />
    )
  }

  return (
    <div>
      <h2 style={{ color: '#646cff', marginBottom: '2rem' }}>Plataformas</h2>
      <CardGrid>
        {platforms.map(platform => (
          <Card
            key={platform.id}
            id={platform.id}
            type="platform"
            title={platform.name}
            description={`Plataforma de streaming`}
            meta={[
              { label: 'URL', value: platform.url || 'N/A' }
            ]}
          />
        ))}
      </CardGrid>
    </div>
  )
}

export default PlatformsList
