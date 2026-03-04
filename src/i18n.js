import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      appTitle: 'Actors Manager',
      actors: 'Actors',
      createActor: 'Create Actor',
      login: 'Login',
      logout: 'Logout',
      darkMode: 'Dark',
      lightMode: 'Light',
      language: 'Language',
      searchPlaceholder: 'Search by name or nationality...',
      loading: 'Loading...',
      noActors: 'No actors found',
      createFirst: 'Create your first actor to get started',
      details: 'Details',
      edit: 'Edit',
      delete: 'Delete',
      confirmDelete: 'Do you want to delete',
      cancel: 'Cancel',
      submit: 'Submit',
      name: 'Name',
      photoUrl: 'Photo URL',
      nationality: 'Nationality',
      birthday: 'Birthday',
      biography: 'Biography',
      actorDetail: 'Actor Detail',
      username: 'Username',
      password: 'Password',
      loginButton: 'Log In',
      pleaseFillAll: 'Please fill out all fields',
      movies: 'Movies',
      directors: 'Directors',
      genres: 'Genres',
      platforms: 'Platforms',
      dashboard: 'Dashboard',
      noMovies: 'No movies found',
      noDirectors: 'No directors found',
      noGenres: 'No genres found',
      noPlatforms: 'No platforms found'
    }
  },
  es: {
    translation: {
      appTitle: 'Gestor de Actores',
      actors: 'Actores',
      createActor: 'Crear Actor',
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
      darkMode: 'Oscuro',
      lightMode: 'Claro',
      language: 'Idioma',
      searchPlaceholder: 'Buscar por nombre o nacionalidad...',
      loading: 'Cargando...',
      noActors: 'No se encontraron actores',
      createFirst: 'Crea tu primer actor para comenzar',
      details: 'Detalles',
      edit: 'Editar',
      delete: 'Eliminar',
      confirmDelete: '¿Deseas eliminar a',
      cancel: 'Cancelar',
      submit: 'Enviar',
      name: 'Nombre',
      photoUrl: 'URL de foto',
      nationality: 'Nacionalidad',
      birthday: 'Nacimiento',
      biography: 'Biografía',
      actorDetail: 'Detalle del Actor',
      username: 'Usuario',
      password: 'Contraseña',
      loginButton: 'Ingresar',
      pleaseFillAll: 'Por favor completa todos los campos',
      movies: 'Películas',
      directors: 'Directores',
      genres: 'Géneros',
      platforms: 'Plataformas',
      dashboard: 'Panel',
      noMovies: 'No se encontraron películas',
      noDirectors: 'No se encontraron directores',
      noGenres: 'No se encontraron géneros',
      noPlatforms: 'No se encontraron plataformas'
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
