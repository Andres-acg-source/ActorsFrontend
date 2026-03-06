import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

function CreateMovie({ createActor }) {

  const { t } = useTranslation()
  const navigate = useNavigate()

  const [movieData, setMovieData] = useState({
    title: "",
    poster: "",
    duration: "",
    country: "",
    releaseDate: "",
    popularity: ""
  })

  const [actorData, setActorData] = useState({
    name: ""
  })

  const [prizeData, setPrizeData] = useState({
    name: "",
    year: ""
  })

  const handleMovieChange = (e) => {
    const { name, value } = e.target
    setMovieData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleActorChange = (e) => {
    const { name, value } = e.target
    setActorData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePrizeChange = (e) => {
    const { name, value } = e.target
    setPrizeData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      // 1️⃣ Crear película
      const movieResponse = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(movieData)
      })

      const movie = await movieResponse.json()

      // 2️⃣ Crear actor
      const actor = await createActor(actorData)

      // 3️⃣ Asociar actor con película
      await fetch(`http://localhost:3000/actors/${actor.id}/movies/${movie.id}`, {
        method: "POST"
      })

      // 4️⃣ Crear premio
      const prizeResponse = await fetch("http://localhost:3000/prizes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(prizeData)
      })

      const prize = await prizeResponse.json()

      // 5️⃣ Asociar premio con película
      await fetch(`http://localhost:3000/movies/${movie.id}/prizes/${prize.id}`, {
        method: "POST"
      })

      navigate("/movies")

    } catch (error) {
      console.error("Error creating movie", error)
    }

  }

  return (
    <div className="form-container">

      <h2>{t("createMovie")}</h2>

      <form onSubmit={handleSubmit}>

        <h3>Movie</h3>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={movieData.title}
          onChange={handleMovieChange}
        />

        <input
          type="text"
          name="poster"
          placeholder="Poster URL"
          value={movieData.poster}
          onChange={handleMovieChange}
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={movieData.duration}
          onChange={handleMovieChange}
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={movieData.country}
          onChange={handleMovieChange}
        />

        <input
          type="date"
          name="releaseDate"
          value={movieData.releaseDate}
          onChange={handleMovieChange}
        />

        <textarea
          name="popularity"
          placeholder="Popularity"
          value={movieData.popularity}
          onChange={handleMovieChange}
        />

        <h3>Main Actor</h3>

        <input
          type="text"
          name="name"
          placeholder="Actor name"
          value={actorData.name}
          onChange={handleActorChange}
        />

        <h3>Prize</h3>

        <input
          type="text"
          name="name"
          placeholder="Prize name"
          value={prizeData.name}
          onChange={handlePrizeChange}
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={prizeData.year}
          onChange={handlePrizeChange}
        />

        <button type="submit">
          {t("submit")}
        </button>

      </form>

    </div>
  )
}

export default CreateMovie