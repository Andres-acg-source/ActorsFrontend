import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import ActorsList from './components/ActorsList'
import CreateActor from './components/CreateActor'
import EditActor from './components/EditActor'
import ActorDetail from './components/ActorDetail'
import Login from './components/Login'
import MoviesList from './components/MoviesList'
import MovieDetail from './components/MovieDetail'
import DirectorsList from './components/DirectorsList'
import GenresList from './components/GenresList'
import PlatformsList from './components/PlatformsList'
import Dashboard from './components/Dashboard'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { useTranslation } from 'react-i18next'
import './App.css'
import './i18n'

function App() {
  const [actors, setActors] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch actors from API on component mount
  useEffect(() => {
    fetchActors()
  }, [])

  const fetchActors = async () => {
    try {
      setLoading(true)
      // request goes through Vite proxy defined in vite.config.js
      const response = await fetch('/api/v1/actors')
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
      const data = await response.json()
      setActors(data)
    } catch (error) {
      console.error('Error fetching actors:', error)
      setActors([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddActor = async (newActor) => {
    try {
      const response = await fetch('/api/v1/actors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newActor)
      })
      if (!response.ok) throw new Error('Failed to create actor')
      const created = await response.json()
      setActors(prev => [...prev, created])
    } catch (error) {
      console.error('Error adding actor:', error)
      // fallback local add
      const actor = {
        id: Math.max(...actors.map(a => a.id), 0) + 1,
        ...newActor
      }
      setActors(prev => [...prev, actor])
    }
  }

  const handleDeleteActor = async (id) => {
    try {
      const response = await fetch(`/api/v1/actors/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete actor')
      setActors(prev => prev.filter(actor => actor.id !== id))
    } catch (error) {
      console.error('Error deleting actor:', error)
      setActors(prev => prev.filter(actor => actor.id !== id))
    }
  }

  const handleUpdateActor = async (updatedActor) => {
    try {
      const response = await fetch(`/api/v1/actors/${updatedActor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedActor)
      })
      if (!response.ok) throw new Error('Failed to update actor')
      const data = await response.json()
      setActors(prev => prev.map(actor => 
        actor.id === data.id ? data : actor
      ))
    } catch (error) {
      console.error('Error updating actor:', error)
      setActors(prev => prev.map(actor => 
        actor.id === updatedActor.id ? updatedActor : actor
      ))
    }
  }

  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()

  return (
    <Router>
      <div className={`app-container ${theme}`}> 
        <nav className="navbar">
          <h1 className="app-title">{t('appTitle')}</h1>
          <ul className="nav-links">
            <li><Link to="/dashboard">{t('dashboard') || 'Dashboard'}</Link></li>
            <li><Link to="/actors">{t('actors')}</Link></li>
            <li><Link to="/movies">{t('movies') || 'Películas'}</Link></li>
            <li><Link to="/directors">{t('directors') || 'Directores'}</Link></li>
            <li><Link to="/genres">{t('genres') || 'Géneros'}</Link></li>
            <li><Link to="/platforms">{t('platforms') || 'Plataformas'}</Link></li>
            {user && <li><Link to="/crear">{t('createActor')}</Link></li>}
          </ul>
          <div className="nav-controls">
            <button onClick={toggleTheme}>{theme === 'light' ? t('darkMode') : t('lightMode')}</button>
            <select
              aria-label={t('language')}
              value={i18n.language}
              onChange={e => i18n.changeLanguage(e.target.value)}
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
            {user ? (
              <button onClick={logout}>{t('logout')}</button>
            ) : (
              <Link to="/login"><button>{t('login')}</button></Link>
            )}
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route 
              path="/actors" 
              element={
                <ActorsList 
                  actors={actors} 
                  onDelete={handleDeleteActor}
                  loading={loading}
                />
              } 
            />
            <Route
              path="/actor/:id"
              element={<ActorDetail actors={actors} />}
            />
            <Route path="/movies" element={<MoviesList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/directors" element={<DirectorsList />} />
            <Route path="/genres" element={<GenresList />} />
            <Route path="/platforms" element={<PlatformsList />} />
            <Route
              path="/crear"
              element={
                user ? <CreateActor onAdd={handleAddActor} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/editar/:id"
              element={
                user ? (
                  <EditActor actors={actors} onUpdate={handleUpdateActor} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  )
}

