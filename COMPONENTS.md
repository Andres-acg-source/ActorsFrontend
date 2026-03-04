## Guía de Componentes Reutilizables y Nuevas Características

### Componentes Reutilizables

La aplicación incluye un conjunto de componentes **compartidos** ubicados en `src/components/shared/`:

#### UI.jsx
Componentes de interfaz de usuario genéricos:
- **`<Toast />`** - Notificación temporal (info, success, error)
- **`<Modal />`** - Diálogo modal reutilizable con overlay
- **`<Loading />`** - Spinner de carga
- **`<EmptyState />`** - Estado vacío con mensaje y acción

**Uso:**
```jsx
import { Toast, Modal, Loading, EmptyState } from './shared/UI'

<Toast message="¡Éxito!" type="success" onClose={handleClose} />
<Modal title="Confirmar" isOpen={open} onClose={handleClose}>
  <p>¿Estás seguro?</p>
</Modal>
<Loading />
<EmptyState 
  title="Sin resultados" 
  description="Crea el primer elemento"
  action={<Link to="/crear">Crear</Link>}
/>
```

#### FormComponents.jsx
Componentes de formulario reutilizables con validación:
- **`<FormInput />`** - Input text/email/number/date con error display
- **`<FormSelect />`** - Select dropdown
- **`<FormTextarea />`** - Textarea con validación
- **`<FormButton />`** - Botón con loading state

**Uso:**
```jsx
import { FormInput, FormSelect, FormButton } from './shared/FormComponents'

<FormInput
  label="Nombre"
  name="name"
  value={name}
  onChange={handleChange}
  required
  error={errors.name}
  ariaLabel="Nombre del actor"
/>

<FormSelect
  label="País"
  name="country"
  value={country}
  onChange={handleChange}
  options={countries}
  error={errors.country}
/>

<FormButton label="Enviar" type="submit" />
```

#### Card.jsx
Sistema de tarjetas reutilizable:
- **`<Card />`** - Tarjeta individual (imagen, título, descripción, meta, acciones)
- **`<CardGrid />`** - Grid responsive para tarjetas

**Props de Card:**
```jsx
<Card
  id={123}
  type="movie"              // 'actor', 'movie', 'director', 'genre', 'platform'
  title="Título"
  image="url.jpg"
  description="Descripción breve"
  meta={[
    { label: 'Año', value: '2024' },
    { label: 'Género', value: 'Acción' }
  ]}
  actions={[
    { label: 'Editar', onClick: handleEdit, className: 'edit-btn' },
    { label: 'Borrar', onClick: handleDelete, className: 'delete-btn' }
  ]}
  onClick={handleCardClick}  // Opcional
/>
```

---

### Nuevas secciones de la Aplicación

#### Dashboard (`/dashboard`)
Panel de control con estadísticas:
- Total de actores, películas, directores, géneros
- Top 5 películas por calificación IMDB
- Distribución de actores por nacionalidad (gráfico de barras)

**API Endpoints:**
- `GET /api/v1/actors`
- `GET /api/v1/movies`
- `GET /api/v1/directors`
- `GET /api/v1/genres`

#### Películas (`/movies`, `/movie/:id`)

**MoviesList.jsx:**
- Lista de películas con búsqueda por título
- Tarjetas con poster, año, duración, rating IMDB
- Clickeables para ver detalles

**MovieDetail.jsx:**
- Información completa de la película
- Elenco (actores y personajes)
- Director
- Reseñas y ratings
- Iframe con tráiler de YouTube
- Botón de volver

**API Endpoints:**
- `GET /api/v1/movies`
- `GET /api/v1/movies/:id`
- `GET /api/v1/movies/:id/actors`
- `GET /api/v1/movies/:id/reviews`

#### Directores (`/directors`)

**DirectorsList.jsx:**
- Lista de directores con búsqueda por nombre
- Tarjetas con foto, nacionalidad, cantidad de películas
- Bio resumida

**API Endpoints:**
- `GET /api/v1/directors`
- `GET /api/v1/directors/:id` (en MovieDetail)

#### Géneros (`/genres`)

**GenresList.jsx:**
- Tarjetas de géneros
- Contador de películas por género
- Descripción del género

**API Endpoints:**
- `GET /api/v1/genres`

#### Plataformas (`/platforms`)

**PlatformsList.jsx:**
- Lista de plataformas de streaming
- Logo de plataforma
- Cantidad de películas disponibles

**API Endpoints:**
- `GET /api/v1/platforms`

---

### Sistema de Estilos

**Nuevas clases CSS:**
- `.card-grid` - Grid responsivo de tarjetas
- `.card`, `.card-image`, `.card-content` - Componente tarjeta
- `.stat-card`, `.stats-grid` - Dashboard
- `.modal-overlay`, `.modal-content` - Modal
- `.toast` - Notificación
- `.spinner`, `.spinner-ring` - Carga
- `.input-error`, `.form-error` - Validación
- `.detail-container`, `.detail-header` - Vista detalle
- Todas las clases soportan temas **light/dark**

---

### Estructura de Rutas

```
/                           → Dashboard (default)
/dashboard                  → Panel de control
/actors                     → Lista de actores
/actor/:id                  → Detalle actor
/crear                      → Crear actor (requiere auth)
/editar/:id                 → Editar actor (requiere auth)
/movies                     → Lista películas
/movie/:id                  → Detalle película
/directors                  → Lista directores
/genres                     → Lista géneros
/platforms                  → Lista plataformas
/login                      → Login
```

---

### Patrón de Desarrollo

Para añadir un nuevo componente o sección, sigue este patrón:

1. **Crea el componente en `src/components/`:**
   ```jsx
   import { Card, CardGrid } from './shared/Card'
   import { Loading, EmptyState } from './shared/UI'
   import { useTranslation } from 'react-i18next'
   
   function MyComponent() {
     const { t } = useTranslation()
     // Lógica aquí
     return (<Card key={...} type="mytype" ... />)
   }
   ```

2. **Añade la ruta en App.jsx:**
   ```jsx
   <Route path="/mypath" element={<MyComponent />} />
   ```

3. **Añade el link en la navegación:**
   ```jsx
   <li><Link to="/mypath">{t('myLabel')}</Link></li>
   ```

4. **Traduce las keys en i18n.js:**
   ```js
   myLabel: 'Mi Etiqueta'
   ```

5. **Personaliza los estilos con clases CSS:**
   ```css
   .my-custom-class {
     /* estilos */
   }
   ```

---

### Internacionalización

Todos los textos usar `useTranslation()`:
```jsx
const { t } = useTranslation()
<h2>{t('movies')}</h2>  // Español: "Películas", English: "Movies"
```

Las traducciones se definen en `src/i18n.js` en dos idiomas (es/en).

---

### Autenticación

- Contexto `AuthContext` en `src/contexts/AuthContext.jsx`
- Hook `useAuth()` para acceder a `user` y funciones de login/logout
- Rutas protegidas redirigen a `/login` si no hay usuario

```jsx
const { user, login, logout } = useAuth()
if (!user) return <Navigate to="/login" />
```

---

### Temas

- Contexto `ThemeContext` en `src/contexts/ThemeContext.jsx`
- Hook `useTheme()` para obtener tema actual y toggle
- Preferencia guardada en localStorage
- Clases `.light` y `.dark` en `.app-container`

```jsx
const { theme, toggleTheme } = useTheme()
<div className={`app-container ${theme}`}>
```


