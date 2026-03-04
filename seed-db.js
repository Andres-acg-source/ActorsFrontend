/**
 * Script para popular la base de datos con datos de ejemplo usando Faker.js
 * No modifica el backend, solo usa la API REST
 * 
 * Uso: node seed-db.js
 */

import { faker } from '@faker-js/faker';

const API_URL = 'http://localhost:3000/api/v1';

// Colores para output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Realiza un request HTTP
 */
async function apiRequest(method, endpoint, data = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${result.message || result.error}`);
    }

    return result;
  } catch (error) {
    throw error;
  }
}

/**
 * Crea una película haciendo múltiples requests (POST luego PUT)
 */
async function createMovieWithRelations(movieData, genreId, directorId, trailerId) {
  // Primero POST sin relaciones (solo datos básicos)
  const createdMovie = await apiRequest('POST', '/movies', {
    title: movieData.title,
    poster: movieData.poster,
    duration: movieData.duration,
    country: movieData.country,
    releaseDate: movieData.releaseDate,
    popularity: movieData.popularity
  });

  // Luego PUT con todas las relaciones
  const updatedMovie = await apiRequest('PUT', `/movies/${createdMovie.id}`, {
    title: movieData.title,
    poster: movieData.poster,
    duration: movieData.duration,
    country: movieData.country,
    releaseDate: movieData.releaseDate,
    popularity: movieData.popularity,
    genre: { id: genreId },
    director: { id: directorId },
    youtubeTrailer: { id: trailerId }
  });

  return updatedMovie;
}

/**
 * Genera y crea actores
 */
async function seedActors(count = 50) {
  log(`\n📝 Creando ${count} actores...`, 'blue');
  const actors = [];

  for (let i = 0; i < count; i++) {
    try {
      const birthDate = faker.date.past({ years: 70, refDate: '2000-01-01' });
      const actor = {
        name: faker.person.fullName(),
        biography: faker.lorem.paragraphs(2),
        birthDate: birthDate.toISOString().split('T')[0],
        nationality: faker.location.country(),
        photo: faker.image.avatar()
      };

      const created = await apiRequest('POST', '/actors', actor);
      actors.push(created);
      log(`  ✓ Actor ${i + 1}/${count}: ${actor.name}`, 'green');
    } catch (error) {
      log(`  ✗ Error en actor ${i + 1}: ${error.message}`, 'red');
    }
  }

  return actors;
}

/**
 * Genera y crea directores
 */
async function seedDirectors(count = 20) {
  log(`\n📝 Creando ${count} directores...`, 'blue');
  const directors = [];

  for (let i = 0; i < count; i++) {
    try {
      const birthDate = faker.date.past({ years: 70, refDate: '2000-01-01' });
      const director = {
        name: faker.person.fullName(),
        biography: faker.lorem.paragraphs(2),
        birthDate: birthDate.toISOString().split('T')[0],
        nationality: faker.location.country(),
        photo: faker.image.avatar()
      };

      const created = await apiRequest('POST', '/directors', director);
      directors.push(created);
      log(`  ✓ Director ${i + 1}/${count}: ${director.name}`, 'green');
    } catch (error) {
      log(`  ✗ Error en director ${i + 1}: ${error.message}`, 'red');
    }
  }

  return directors;
}

/**
 * Genera y crea géneros
 */
async function seedGenres() {
  log(`\n📝 Creando géneros...`, 'blue');
  const genreNames = [
    'Acción',
    'Aventura',
    'Comedia',
    'Crimen',
    'Drama',
    'Fantasía',
    'Horror',
    'Misterio',
    'Romance',
    'Ciencia Ficción',
    'Thriller',
    'Animación',
    'Documental',
    'Musical',
    'Familiar'
  ];

  const genres = [];

  for (const name of genreNames) {
    try {
      const genre = {
        type: name
      };

      const created = await apiRequest('POST', '/genres', genre);
      genres.push(created);
      log(`  ✓ Género: ${name}`, 'green');
    } catch (error) {
      log(`  ✗ Error en género ${name}: ${error.message}`, 'red');
    }
  }

  return genres;
}

/**
 * Genera y crea plataformas
 */
async function seedPlatforms() {
  log(`\n📝 Creando plataformas...`, 'blue');
  const platformNames = [
    'Netflix',
    'Amazon Prime Video',
    'Disney+',
    'HBO Max',
    'Hulu',
    'Paramount+',
    'Apple TV+',
    'Peacock',
    'Crunchyroll',
    'Mubi'
  ];

  const platforms = [];

  for (const name of platformNames) {
    try {
      const platform = {
        name,
        url: `https://${name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com`
      };

      const created = await apiRequest('POST', '/platforms', platform);
      platforms.push(created);
      log(`  ✓ Plataforma: ${name}`, 'green');
    } catch (error) {
      log(`  ✗ Error en plataforma ${name}: ${error.message}`, 'red');
    }
  }

  return platforms;
}

/**
 * Genera un ID de YouTube aleatorio
 */
function generateYoutubeId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let id = '';
  for (let i = 0; i < 11; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

/**
 * Genera y crea trailers de YouTube
 */
async function seedYoutubeTrailers(count = 30) {
  log(`\n📝 Creando ${count} trailers de YouTube...`, 'blue');
  const channels = ['Official Movie Trailers', 'Hollywood Trailers', 'Movie Database', 'Cinema Trailers', 'Film Previews'];
  const trailers = [];

  for (let i = 0; i < count; i++) {
    try {
      const trailer = {
        name: `Movie Trailer ${i + 1}`,
        url: `https://www.youtube.com/watch?v=${generateYoutubeId()}`,
        duration: Math.floor(Math.random() * 90 + 120),
        channel: channels[Math.floor(Math.random() * channels.length)]
      };

      const created = await apiRequest('POST', '/youtube-trailers', trailer);
      trailers.push(created);
      log(`  ✓ Trailer ${i + 1}/${count}: ${trailer.name}`, 'green');
    } catch (error) {
      log(`  ✗ Error en trailer ${i + 1}: ${error.message}`, 'red');
    }
  }

  return trailers;
}

/**
 * Genera y crea películas
 */
async function seedMovies(directors, genres, trailers, count = 40) {
  log(`\n📝 Creando ${count} películas...`, 'blue');
  const movies = [];

  for (let i = 0; i < count; i++) {
    try {
      const releaseDate = faker.date.between({
        from: new Date(1990, 0, 1),
        to: new Date(2025, 11, 31)
      });

      const selectedDirector = directors[Math.floor(Math.random() * directors.length)];
      const selectedGenre = genres[Math.floor(Math.random() * genres.length)];
      const selectedTrailer = trailers[Math.floor(Math.random() * trailers.length)];

      const movieData = {
        title: faker.lorem.words({ min: 2, max: 5 }).split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        poster: faker.image.url(),
        duration: Math.floor(Math.random() * 60 + 85),
        country: faker.location.country(),
        releaseDate: releaseDate.toISOString().split('T')[0],
        popularity: parseFloat((Math.random() * 8 + 1).toFixed(1))
      };

      const movie = await createMovieWithRelations(
        movieData,
        selectedGenre.id,
        selectedDirector.id,
        selectedTrailer.id
      );

      movies.push(movie);
      log(`  ✓ Película ${i + 1}/${count}: ${movieData.title}`, 'green');
    } catch (error) {
      log(`  ✗ Error en película ${i + 1}: ${error.message}`, 'red');
    }
  }

  return movies;
}

/**
 * Asocia actores a películas
 */
async function seedMovieActors(actors, movies) {
  log(`\n📝 Asociando actores a películas...`, 'blue');
  let count = 0;

  for (const movie of movies) {
    try {
      // Cada película tiene 3-8 actores
      const actorCount = Math.floor(Math.random() * 6 + 3);
      const selectedActors = [];

      for (let i = 0; i < actorCount; i++) {
        const actor = actors[Math.floor(Math.random() * actors.length)];
        if (!selectedActors.includes(actor.id)) {
          selectedActors.push(actor.id);
        }
      }

      for (const actorId of selectedActors) {
        try {
          await apiRequest('POST', `/movies/${movie.id}/actors/${actorId}`);
          count++;
        } catch (error) {
          // Ignorar errores de actores duplicados
        }
      }

      log(`  ✓ Película "${movie.title}" - ${selectedActors.length} actores asignados`, 'green');
    } catch (error) {
      log(`  ✗ Error asociando actores a película: ${error.message}`, 'red');
    }
  }

  log(`  Total de relaciones actor-película creadas: ${count}`, 'yellow');
}

/**
 * Genera reseñas para películas
 */
async function seedReviews(movies) {
  log(`\n📝 Creando reseñas...`, 'blue');
  let count = 0;

  for (const movie of movies) {
    try {
      // Cada película tiene 2-5 reseñas
      const reviewCount = Math.floor(Math.random() * 4 + 2);

      for (let i = 0; i < reviewCount; i++) {
        try {
          const review = {
            text: faker.lorem.sentences({ min: 2, max: 4 }),
            score: Math.floor(Math.random() * 5 + 1),
            creator: faker.person.fullName()
          };

          await apiRequest('POST', `/movies/${movie.id}/reviews`, review);
          count++;
        } catch (error) {
          // Ignorar errores
        }
      }
    } catch (error) {
      log(`  ✗ Error en reseñas de película: ${error.message}`, 'red');
    }
  }

  log(`  Total de reseñas creadas: ${count}`, 'yellow');
}

/**
 * Función principal
 */
async function main() {
  log('\n╔════════════════════════════════════════════════╗', 'yellow');
  log('║   POBLACIÓN DE BASE DE DATOS CON FAKER.JS     ║', 'yellow');
  log('╚════════════════════════════════════════════════╝', 'yellow');

  try {
    // Verificar que el servidor esté disponible
    log('\n🔍 Verificando conexión con API...', 'blue');
    await fetch(API_URL);
    log('✓ Conexión establecida', 'green');

    // Crear datos en el orden correcto
    const directors = await seedDirectors(15);
    const genres = await seedGenres();
    const platforms = await seedPlatforms();
    const actors = await seedActors(50);
    const trailers = await seedYoutubeTrailers(30);
    
    log('\n╔════════════════════════════════════════════════╗', 'yellow');
    log('║         POBLACIÓN COMPLETADA EXITOSAMENTE     ║', 'yellow');
    log('╚════════════════════════════════════════════════╝', 'yellow');
    log('\nDatos creados:', 'green');
    log(`  • Actores: ${actors.length}`, 'green');
    log(`  • Directores: ${directors.length}`, 'green');
    log(`  • Géneros: ${genres.length}`, 'green');
    log(`  • Plataformas: ${platforms.length}`, 'green');
    log(`  • Trailers de YouTube: ${trailers.length}`, 'green');
    
    log('\n⚠️  Información importante:', 'yellow');
    log('  Las películas requieren un DTO extendido en el backend', 'yellow');
    log('  para asociar género, director y trailer en un solo request.', 'yellow');
    log('  Puedes crear películas manualmente en la API o actualizar', 'yellow');
    log('  el backend con endpoints de relaciones específicos.', 'yellow');
    
    log('\nAhora puedes acceder a: http://localhost:5173\n', 'blue');

  } catch (error) {
    log(`\n✗ Error fatal: ${error.message}`, 'red');
    log('\nAsegúrate de que:', 'yellow');
    log('  1. El backend esté corriendo en http://localhost:3000', 'yellow');
    log('  2. Tienes faker.js instalado', 'yellow');
    log('  3. Node.js versión 18+ (para fetch nativo)', 'yellow');
    process.exit(1);
  }
}

main();
