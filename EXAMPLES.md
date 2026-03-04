## Ejemplos de Uso de Componentes

### Usar Toast Notification

```jsx
import { useState } from 'react'
import { Toast } from './shared/UI'

function MyComponent() {
  const [toast, setToast] = useState(null)

  const showSuccess = (message) => {
    setToast({ message, type: 'success' })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <>
      <button onClick={() => showSuccess('¡Guardado!')} className="submit-btn">
        Guardar
      </button>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
```

### Usar Modal para Confirmación

```jsx
import { useState } from 'react'
import { Modal } from './shared/UI'

function DeleteButton({ onConfirm, itemName }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button onClick={() => setShowModal(true)} className="delete-btn">
        Eliminar
      </button>
      <Modal
        title="Confirmar eliminación"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <p>¿Deseas eliminar a {itemName}?</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            className="cancel-btn"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </button>
          <button
            className="delete-btn"
            onClick={() => {
              onConfirm()
              setShowModal(false)
            }}
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </>
  )
}
```

### Usar CardGrid con Cards

```jsx
import { Card, CardGrid } from './shared/Card'

function ActorsList({ actors, onEdit, onDelete }) {
  return (
    <CardGrid>
      {actors.map(actor => (
        <Card
          key={actor.id}
          id={actor.id}
          type="actor"
          title={actor.name}
          image={actor.photo}
          description={actor.biography}
          meta={[
            { label: 'País', value: actor.nationality },
            { label: 'Nacimiento', value: actor.birthday }
          ]}
          actions={[
            {
              label: 'Editar',
              onClick: () => onEdit(actor.id),
              className: 'edit-btn'
            },
            {
              label: 'Borrar',
              onClick: () => onDelete(actor.id),
              className: 'delete-btn'
            }
          ]}
        />
      ))}
    </CardGrid>
  )
}
```

### Usar Formularios Validados

```jsx
import { useState } from 'react'
import { FormInput, FormSelect, FormTextarea, FormButton } from './shared/FormComponents'

function MovieForm({ onSubmit, genres = [] }) {
  const [formData, setFormData] = useState({
    title: '',
    genre_id: '',
    synopsis: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title) newErrors.title = 'El título es obligatorio'
    if (!formData.genre_id) newErrors.genre_id = 'Selecciona un género'
    if (formData.synopsis.length < 10) {
      newErrors.synopsis = 'La sinopsis debe tener al menos 10 caracteres'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Agregar Película</h2>
      
      <FormInput
        label="Título"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Ej: Avatar"
        error={errors.title}
        required
      />

      <FormSelect
        label="Género"
        name="genre_id"
        value={formData.genre_id}
        onChange={handleChange}
        options={genres}
        error={errors.genre_id}
        required
      />

      <FormTextarea
        label="Sinopsis"
        name="synopsis"
        value={formData.synopsis}
        onChange={handleChange}
        placeholder="Describe la película..."
        error={errors.synopsis}
        required
      />

      <div className="form-buttons">
        <FormButton label="Guardar" type="submit" />
      </div>
    </form>
  )
}
```

### Usar EmptyState

```jsx
import { EmptyState } from './shared/UI'
import { Link } from 'react-router-dom'

function MoviesList({ movies }) {
  if (movies.length === 0) {
    return (
      <EmptyState
        title="Sin películas"
        description="Aún no hay películas registradas"
        action={
          <Link to="/admin/movies/create" style={{ color: '#646cff' }}>
            Crear primera película
          </Link>
        }
      />
    )
  }

  // ... render movies ...
}
```

### Usar Loading

```jsx
import { Loading } from './shared/UI'

function MyAsyncComponent() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData().finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading />
  if (!data) return <div>Error cargando datos</div>

  return <div>{/* render data */}</div>
}
```

### Integración Completa: Crear Actor (protegido)

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'
import { FormInput, FormButton } from './shared/FormComponents'
import { Toast } from './shared/UI'

function CreateActorPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    nationality: '',
    birthday: '',
    biography: ''
  })
  const [errors, setErrors] = useState({})

  if (!user) {
    return <Navigate to="/login" />
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/v1/actors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Error creating actor')

      setToast({ message: 'Actor creado exitosamente', type: 'success' })
      
      setTimeout(() => {
        navigate('/actors')
      }, 1500)
    } catch (error) {
      setToast({ message: 'Error: ' + error.message, type: 'error' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">{t('createActor')}</h2>

      <FormInput
        label={t('name')}
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        error={errors.name}
      />

      <FormInput
        label={t('photoUrl')}
        name="photo"
        type="url"
        value={formData.photo}
        onChange={handleChange}
        required
        error={errors.photo}
      />

      <FormInput
        label={t('nationality')}
        name="nationality"
        value={formData.nationality}
        onChange={handleChange}
        required
        error={errors.nationality}
      />

      <FormInput
        label={t('birthday')}
        name="birthday"
        type="date"
        value={formData.birthday}
        onChange={handleChange}
        required
        error={errors.birthday}
      />

      <FormTextarea
        label={t('biography')}
        name="biography"
        value={formData.biography}
        onChange={handleChange}
        required
        error={errors.biography}
      />

      <div className="form-buttons">
        <FormButton label={t('submit')} type="submit" />
        <FormButton
          label={t('cancel')}
          type="button"
          className="cancel-btn"
          onClick={() => navigate('/actors')}
        />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </form>
  )
}

export default CreateActorPage
```

---

### Patrones Importantes

#### 1. Validación en Formularios
```jsx
const [errors, setErrors] = useState({})

const validate = () => {
  const newErrors = {}
  if (!data.field) newErrors.field = 'Campo requerido'
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
```

#### 2. Manejo de Async/Await
```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const res = await fetch(url, options)
    if (!res.ok) throw new Error('Error')
    const data = await res.json()
    // Success handling
  } catch (error) {
    // Error handling
  }
}
```

#### 3. Protección de Rutas
```jsx
const { user } = useAuth()
if (!user) return <Navigate to="/login" />
// Render component
```

#### 4. Traducción dinámica
```jsx
const { t, i18n } = useTranslation()
<h1>{t('appTitle')}</h1>
<select onChange={e => i18n.changeLanguage(e.target.value)}>
  <option value="es">Español</option>
  <option value="en">English</option>
</select>
```

#### 5. Tema dinámico
```jsx
const { theme, toggleTheme } = useTheme()
<div className={`my-component ${theme}`}>
  <button onClick={toggleTheme}>Cambiar tema</button>
</div>
```

