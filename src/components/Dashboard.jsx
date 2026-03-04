import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Loading } from './shared/UI'

function Dashboard() {
  const { t } = useTranslation()
  const [stats, setStats] = useState({
    totalActors: 0,
    totalMovies: 0,
    totalDirectors: 0,
    totalGenres: 0,
    topRatedMovies: [],
    actorsByNationality: {}
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      // Fetch comprehensive data
      const [actorsRes, moviesRes, directorsRes, genresRes] = await Promise.all([
        fetch('/api/v1/actors'),
        fetch('/api/v1/movies'),
        fetch('/api/v1/directors'),
        fetch('/api/v1/genres')
      ])

      let actorsData = []
      let moviesData = []
      let directorsData = []
      let genresData = []

      if (actorsRes.ok) actorsData = await actorsRes.json()
      if (moviesRes.ok) moviesData = await moviesRes.json()
      if (directorsRes.ok) directorsData = await directorsRes.json()
      if (genresRes.ok) genresData = await genresRes.json()

      // Calculate stats
      const actorsByNationality = {}
      actorsData.forEach(a => {
        actorsByNationality[a.nationality] = (actorsByNationality[a.nationality] || 0) + 1
      })

      const topRated = moviesData
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 5)

      setStats({
        totalActors: actorsData.length,
        totalMovies: moviesData.length,
        totalDirectors: directorsData.length,
        totalGenres: genresData.length,
        topRatedMovies: topRated,
        actorsByNationality
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="dashboard">
      <h2 style={{ color: '#646cff', marginBottom: '2rem' }}>Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalActors}</h3>
          <p>Actores</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalMovies}</h3>
          <p>Películas</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalDirectors}</h3>
          <p>Directores</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalGenres}</h3>
          <p>Géneros</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Top películas por calificación</h3>
        <div className="movies-top">
          {stats.topRatedMovies.map((movie, idx) => (
            <div key={movie.id} className="top-movie">
              <span className="rank">#{idx + 1}</span>
              <span className="title">{movie.title}</span>
              <span className="rating">⭐ {movie.popularity}/10</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Actores por país</h3>
        <div className="country-stats">
          {Object.entries(stats.actorsByNationality).map(([country, count]) => (
            <div key={country} className="country-stat">
              <span>{country}</span>
              <div className="bar" style={{ width: `${(count / stats.totalActors) * 100}%` }}>
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
