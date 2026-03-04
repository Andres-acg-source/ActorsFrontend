# Guía de Desarrollo - Actors Manager Frontend


### 1. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### 2. Características Implementadas 

#### Paso 1: Lista de Actores
-  Componente `ActorsList.jsx` que muestra actores en tarjetas
-  Hook `useEffect` en `App.jsx` para cargar datos (Mock API)
-  Renderización de lista en la ruta `/actors`

#### Paso 3: Formulario para Crear Actores
-  Componente `CreateActor.jsx` con campos controlados
-  `useState` para manage cada field del formulario
-  Agrega automáticamente el nuevo actor a la lista
-  Accesible en ruta `/crear`

#### Paso 4: Configuración de Rutas
-  `/actors` - Lista de actores
-  `/crear` - Formulario de creación
-  `/editar/:id` - Formulario de edición
-  `/` - Redirecciona a `/actors` (por defecto)

#### Paso 5: Conexión Formulario-Lista
-  Los actores creados aparecen automáticamente en la lista
-  El estado persiste durante la navegación entre rutas

#### Paso 6: Editar Actores
-  Botón "Editar" en cada tarjeta de actor
-  Componente `EditActor.jsx` carga datos del actor seleccionado
-  Los cambios se guardan y actualizan la lista

#### Paso 7: Eliminar Actores
-  Botón "Eliminar" en cada tarjeta de actor
-  Confirmación antes de eliminar
-  El actor se elimina de la lista y la vista se actualiza
#### Nueva funcionalidad añadida
-  Internacionalización con react-i18next (es/en)
-  Tema claro/oscuro y persistencia en localStorage
-  Búsqueda y filtrado de la lista de actores
-  Página de detalle de actor (`/actor/:id`)
-  Autenticación mínima: login necesario para crear/editar/eliminar
-  Mejoras de accesibilidad: elementos ARIA, foco visible
### 3. Estructura de Archivos

```
ActorsFrontend/
├── .github/
│   └── copilot-instructions.md    # Instrucciones del proyecto
├── src/
│   ├── components/
│   │   ├── ActorsList.jsx         # Lista de actores
│   │   ├── CreateActor.jsx        # Crear actor
│   │   └── EditActor.jsx          # Editar actor
│   ├── App.jsx                    # App principal + rutas
│   ├── App.css                    # Estilos de la aplicación
│   ├── index.css                  # Estilos globales
│   └── main.jsx                   # Entry point
├── index.html                     # HTML principal
├── vite.config.js                 # Configuración de Vite
├── package.json                   # Dependencies
├── README.md                       # Documentación principal
└── .gitignore                     # Git ignore rules
```

### 4. API Integration

Actualmente se usan datos Mock. Para conectar con una API real:

1. Edita `App.jsx` en la función `fetchActors()`:

```javascript
const fetchActors = async () => {
  try {
    setLoading(true)
    const response = await fetch('/api/v1/actors')
    const data = await response.json()
    setActors(data)
  } catch (error) {
    console.error('Error fetching actors:', error)
  } finally {
    setLoading(false)
  }
}
```

2. Configura el proxy en `vite.config.js` si es necesario

### 5. Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Compilar para producción
- `npm run preview` - Previsualizar build de producción
- `npm run lint` - Verificar código con ESLint

### 6. Testing

Prueba cada característica:

1. **Lista**: Ve a `/actors` y verifica que se muestren los actores
2. **Crear**: Ve a `/crear`, completa el formulario y crea un actor
3. **Editar**: Haz clic en "Editar" en cualquier actor y modifica sus datos
4. **Eliminar**: Haz clic en "Eliminar" y confirma la eliminación

### 7. Notas de Desarrollo

- El estado se mantiene durante la navegación (dentro de la sesión)
- Los datos se limpian al recargar la página (son Mock)
- Estilos responsive para móvil y desktop
- UI moderna con hover effects y animaciones suaves

### 8. Próximos Pasos (Opcional)

- [ ] Conectar con API real backend
- [ ] Agregar validación de formularios más robusta
- [ ] Implementar paginación para grandes listas
- [ ] Agregar búsqueda y filtros
- [ ] Implementar autenticación
- [ ] Agregar tests unitarios con Vitest
- [ ] Mejorar manejo de errores y loading states

---

**Desarrollado con React 18 + Vite**
