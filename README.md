# Actors Manager Frontend

Una aplicación React moderna y completa para gestionar actores, películas, directores, géneros y plataformas de cine. Construida con **Vite**, **React Router**, **i18next** y contextos de autenticación y temas.

## Características Principales

### Gestión de Actores
- Lista de actores con búsqueda y filtrado
- Crear nuevos actores (requiere autenticación)
- Editar información de actores
- Eliminar actores
- Página de detalle con información completa

### Películas, Directores & Géneros
- Catálogo completo de películas
- Base de datos de directores
- Clasificación por géneros
- Plataformas de streaming con películas disponibles
- Calificaciones IMDB e información detallada

### Dashboard
- Estadísticas generales (actores, películas, directores, géneros)
- Top 5 películas mejor calificadas
- Distribución de actores por nacionalidad

### Internacionalización & Accesibilidad
- Soporte para español e inglés
- Modo claro/oscuro con persistencia
- Elementos ARIA y navegación accesible
- Etiquetas semánticas y foco visible

### Autenticación & Autorización
- Sistema de login básico
- Rutas protegidas (creación, edición, eliminación)
- Gestión de sesión de usuario

### Componentes Reutilizables
- Sistema de tarjetas genéricas
- Componentes de formulario con validación
- Notificaciones (Toast)
- Modal reutilizable
- Spinner de carga
- Estados vacíos

## Tecnologías

- **React 18+** - Librería de interfaz de usuario
- **React Router DOM v6** - Gestión de rutas
- **Vite** - Herramienta de construcción ultrarrápida
- **i18next + react-i18next** - Internacionalización
- **React Contexts** - Autenticación y temas
- **CSS3** - Estilos responsivos (light/dark mode)

## Instalación

### Requisitos
- Node.js v16+ y npm

### Pasos

```bash
# Clonar/descargar y navegar
cd ActorsFrontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará en `http://localhost:5173`

## Rutas

- `/dashboard` - Panel de control con estadísticas
- `/actors` - Lista de actores
- `/actor/:id` - Detalle de actor
- `/crear` - Crear actor (protegido)
- `/editar/:id` - Editar actor (protegido)
- `/movies` - Catálogo de películas
- `/movie/:id` - Detalle de película con elenco, reseñas, tráiler
- `/directors` - Lista de directores
- `/genres` - Géneros disponibles
- `/platforms` - Plataformas de streaming
- `/login` - Página de inicio de sesión

## Componentes Reutilizables

### UI Components (`src/components/shared/UI.jsx`)
- `<Toast />` - Notificaciones
- `<Modal />` - Diálogos
- `<Loading />` - Spinner
- `<EmptyState />` - Estados vacíos

### Form Components (`src/components/shared/FormComponents.jsx`)
- `<FormInput />` - Inputs con validación
- `<FormSelect />` - Selects
- `<FormTextarea />` - Textareas
- `<FormButton />` - Botones

### Card Components (`src/components/shared/Card.jsx`)
- `<Card />` - Tarjeta genérica
- `<CardGrid />` - Grid responsivo

## Conexión con Backend

El frontend está configurado para conectarse con el backend en:
```
C:\Users\andrr\VSC_Projects\BackArte7
```

El proxy de Vite redirige automáticamente `/api/*` a `http://localhost:3000`.

### Endpoints esperados:
- `GET/POST /api/v1/actors`
- `GET/PUT/DELETE /api/v1/actors/:id`
- `GET /api/v1/movies`
- `GET /api/v1/movies/:id`
- `GET /api/v1/movies/:id/actors`
- `GET /api/v1/movies/:id/reviews`
- `GET /api/v1/directors`
- `GET /api/v1/genres`
- `GET /api/v1/platforms`

## Internacionalización

La aplicación soporta **español** e **inglés**.

Cambiar idioma desde el selector en la navbar. Las preferencias se guardan automáticamente.

Para agregar más idiomas, edita `src/i18n.js`:

```js
const resources = {
  en: { translation: { /* ... */ } },
  es: { translation: { /* ... */ } },
  // Agregar nuevo idioma aquí
}
```

## Temas

- **Modo claro/oscuro** con buttons en la navbar
- Preferencia guardada en localStorage
- Actualización automática en todas las páginas

Personaliza los colores editando las variables en `src/App.css`.

## Autenticación

Sistema básico de login sin autenticación real (ideal para desarrollo).

Para producción:
1. Reemplaza `/api/v1/auth/login` con tu endpoint real
2. Guarda tokens JWT en localStorage/sessionStorage
3. Añade token a headers en fetch requests

```jsx
const response = await fetch('/api/v1/actors', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

## Dashboard

Muestra estadísticas en tiempo real:
- Contadores de elementos
- Top movies por rating
- Gráficos de distribución

Los datos se actualizan cada vez que cargas la página.

## Scripts

```bash
npm run dev        # Servidor de desarrollo con HMR
npm run build      # Build para producción
npm run preview    # Vista previa de build
npm run lint       # ESLint para revisar código
```

## Documentación Adicional

- [COMPONENTS.md](COMPONENTS.md) - Guía detallada de componentes reutilizables
- [EXAMPLES.md](EXAMPLES.md) - Ejemplos de uso de cada componente
- [DEVELOPMENT.md](DEVELOPMENT.md) - Notas de desarrollo


## Características

-  **Lista de Actores**: Visualiza todos los actores registrados en formato de tarjetas
-  **Crear Actores**: Formulario controlado para agregar nuevos actores
-  **Editar Actores**: Modifica la información de actores existentes
-  **Eliminar Actores**: Elimina actores de la lista
-  **Navegación**: Sistema de rutas con React Router DOM

## Tecnologías

- **React 18+** - Librería de interfaz de usuario
- **React Router DOM v6** - Gestión de rutas
- **Vite** - Herramienta de construcción y desarrollo ultrarrápida
- **JavaScript (JSX)** - Lenguaje de programación

## Instalación

### Requisitos Previos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. Clonar o descargar el proyecto:
```bash
cd ActorsFrontend
```

2. Instalar las dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:5173`

## Uso

### Rutas Disponibles

- `/` o `/actors` - Lista de todos los actores
- `/actor/:id` - Página de detalle del actor
- `/crear` - Formulario para crear un nuevo actor (requiere autenticación)
- `/editar/:id` - Formulario para editar un actor existente (requiere autenticación)
- `/login` - Página de inicio de sesión

### Funcionalidades adicionales

-  **Internacionalización**: cambia entre Español e Inglés desde el menú
-  **Temas**: alterna entre modo claro/oscuro; la selección se guarda en localStorage
-  **Búsqueda y filtrado** en la lista de actores
-  **Autenticación básica**: inicia sesión para crear/editar/eliminar
-  **Detalles del actor**: ver información completa haciendo clic en "Detalles"
-  Accesibilidad mejorada con etiquetas ARIA y foco claro

### Funcionalidades

#### Listar Actores
- Visualiza todos los actores en formato de tarjeta
- Cada tarjeta muestra: foto, nombre, nacionalidad, fecha de nacimiento y biografía
- Hover effects para mejor UX

#### Crear Actor
- Completa el formulario con los datos del actor:
  - Nombre
  - URL de la foto
  - Nacionalidad
  - Fecha de nacimiento
  - Biografía
- El nuevo actor se añade a la lista inmediatamente

#### Editar Actor
- Haz clic en el botón "Editar" de cualquier actor
- Modifica los datos en el formulario
- Los cambios se guardan en la lista

#### Eliminar Actor
- Haz clic en el botón "Eliminar" de cualquier actor
- Confirma la eliminación en el diálogo
- El actor se elimina de la lista inmediatamente

## Estructura del Proyecto

```
ActorsFrontend/
├── src/
│   ├── components/
│   │   ├── ActorsList.jsx      # Componente de lista de actores
│   │   ├── CreateActor.jsx     # Formulario de creación
│   │   └── EditActor.jsx       # Formulario de edición
│   ├── App.jsx                 # Componente principal con routing
│   ├── App.css                 # Estilos de la aplicación
│   ├── index.css               # Estilos globales
│   └── main.jsx                # Punto de entrada
├── index.html                  # Archivo HTML principal
├── vite.config.js             # Configuración de Vite
├── package.json               # Dependencias y scripts
└── README.md                  # Este archivo
```

## Scripts Disponibles

### `npm run dev`
Inicia el servidor de desarrollo con hot reload

### `npm run build`
Compila la aplicación para producción en la carpeta `dist/`

### `npm run preview`
Previsualiza la construcción de producción localmente

### `npm run lint`
Ejecuta ESLint para verificar la calidad del código

## Conexión con Backend

La aplicación ahora realiza llamadas reales al backend a través de `/api/v1/actors`.
Los estados de creación, actualización y eliminación también se sincronizan con el servidor.

>  **Ruta del backend**: `C:\Users\andrr\VSC_Projects\BackArte7`

### Requisitos

1. Asegúrate de que el servidor del backend esté en ejecución y accesible.
   El proxy de Vite (configurado en `vite.config.js`) redirige todas las
   peticiones que comienzan con `/api` a `http://localhost:3000` por
   defecto; modifica el puerto si tu backend corre en otra ubicación.

2. No se requiere código adicional en el frontend para la conexión; ya
   se utilizan los endpoints POST, PUT y DELETE en las funciones de manejo.

3. Si cambias la ruta o el puerto del backend, actualiza el proxy:

```js
proxy: {
  '/api': {
    target: 'http://localhost:PUERTO',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```


## Desarrollo

Para agregar nuevas funcionalidades:

1. Crea nuevos componentes en `src/components/`
2. Importalos en `App.jsx`
3. Agrega las rutas necesarias
4. Importa los estilos según sea necesario
