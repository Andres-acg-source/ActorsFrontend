import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loading } from './shared/UI'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [actors, setActors] = useState([])
  const [director, setDirector] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovieData()
  }, [id])

  const fetchMovieData = async () => {
    try {
      setLoading(true)
      const movieRes = await fetch(`/api/v1/movies/${id}`)
      if (!movieRes.ok) throw new Error('Failed to fetch movie')
      const movieData = await movieRes.json()
      setMovie(movieData)

      // Fetch actors in this movie
      const actorsRes = await fetch(`/api/v1/movies/${id}/actors`)
      if (actorsRes.ok) {
        const actorsData = await actorsRes.json()
        setActors(actorsData)
      }

      // Fetch director
      if (movieData.directorId) {
        const directorRes = await fetch(`/api/v1/directors/${movieData.directorId}`)
        if (directorRes.ok) {
          const directorData = await directorRes.json()
          setDirector(directorData)
        }
      }

      // Fetch reviews
      const reviewsRes = await fetch(`/api/v1/movies/${id}/reviews`)
      if (reviewsRes.ok) {
        const reviewsData = await reviewsRes.json()
        setReviews(reviewsData)
      }
    } catch (error) {
      console.error('Error fetching movie data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />
  if (!movie) return <div>Película no encontrada</div>

  return (
    <div className="detail-container">
      <button onClick={() => navigate('/movies')} className="cancel-btn">
        Volver
      </button>
      
      <div className="detail-header">
        {movie.poster && (
          <img src={movie.poster} alt={movie.title} className="detail-image" />
        )}
        <div className="detail-info">
          <h1>{movie.title}</h1>
          {director && (
            <p><strong>Director:</strong> {director.name}</p>
          )}
          <p><strong>Año:</strong> {new Date(movie.releaseDate).getFullYear()}</p>
          <p><strong>Duración:</strong> {movie.duration} minutos</p>
          <p><strong>Calificación:</strong> {movie.popularity}/10</p>
          <p><strong>País:</strong> {movie.country}</p>
        </div>
      </div>

      {actors.length > 0 && (
        <div className="detail-section">
          <h2>Elenco</h2>
          <div className="actors-list">
            {actors.map(actor => (
              <div key={actor.id} className="actor-item">
                <p><strong>{actor.name}</strong> - {actor.character_name || 'N/A'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {reviews.length > 0 && (
        <div className="detail-section">
          <h2>Reseñas</h2>
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-item">
                <p><strong>{review.user_name}</strong> - ⭐ {review.rating}/10</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {movie.youtubeTrailerId && (
        <div className="detail-section">
          <h2>Tráiler</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${movie.youtubeTrailerId}`}
            title="Tráiler"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  )
}

export default MovieDetail
