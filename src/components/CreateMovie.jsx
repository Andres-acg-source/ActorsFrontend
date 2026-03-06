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

  const [actorData, setActorData] = useState({ name: "" })
  const [prizeData, setPrizeData] = useState({ name: "", year: "" })

  // Cambios en inputs
  const handleMovieChange = e => setMovieData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleActorChange = e => setActorData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handlePrizeChange = e => setPrizeData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()

    // Validación básica
    if (!movieData.title || !actorData.name || !prizeData.name) {
      alert(t("pleaseFillAll") || "Please fill all required fields")
      return
    }

    try {
      // 1️⃣ Crear película
      const movieResponse = await fetch("/api/v1/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData)
      })
      if (!movieResponse.ok) throw new Error("Failed to create movie")
      const movie = await movieResponse.json()

      // 2️⃣ Crear actor usando createActor
      const actor = await createActor(actorData)

      // 3️⃣ Asociar actor con película
      await fetch(`/api/v1/actors/${actor.id}/movies/${movie.id}`, { method: "POST" })

      // 4️⃣ Crear premio
      const prizeResponse = await fetch("/api/v1/prizes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prizeData)
      })
      if (!prizeResponse.ok) throw new Error("Failed to create prize")
      const prize = await prizeResponse.json()

      // 5️⃣ Asociar premio con película
      await fetch(`/api/v1/movies/${movie.id}/prizes/${prize.id}`, { method: "POST" })

      navigate("/movies")

    } catch (error) {
      console.error("Error creating movie:", error)
      alert("Error creating movie. Check console for details.")
    }
  }

  return (
    <div className="form-container">
      <h2>{t("createMovie") || "Create Movie"}</h2>
      <form onSubmit={handleSubmit}>

        <h3>Movie</h3>
        <input type="text" name="title" placeholder={t("title") || "Title"} value={movieData.title} onChange={handleMovieChange} />
        <input type="text" name="poster" placeholder={t("posterUrl") || "Poster URL"} value={movieData.poster} onChange={handleMovieChange} />
        <input type="text" name="duration" placeholder={t("duration") || "Duration"} value={movieData.duration} onChange={handleMovieChange} />
        <input type="text" name="country" placeholder={t("country") || "Country"} value={movieData.country} onChange={handleMovieChange} />
        <input type="date" name="releaseDate" value={movieData.releaseDate} onChange={handleMovieChange} />
        <textarea name="popularity" placeholder={t("moviepopularityPlaceholder") || "Popularity"} value={movieData.popularity} onChange={handleMovieChange} />

        <h3>Main Actor</h3>
        <input type="text" name="name" placeholder={t("actorName") || "Actor Name"} value={actorData.name} onChange={handleActorChange} />

        <h3>Prize</h3>
        <input type="text" name="name" placeholder={t("prizeName") || "Prize Name"} value={prizeData.name} onChange={handlePrizeChange} />
        <input type="number" name="year" placeholder={t("prizeYear") || "Year"} value={prizeData.year} onChange={handlePrizeChange} />

        <button type="submit">{t("submit") || "Submit"}</button>
      </form>
    </div>
  )
}

export default CreateMovie