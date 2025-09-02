# Mi Perfil - Programmer Portfolio

Una aplicación Next.js moderna con Tailwind CSS e internacionalización (i18n) para mostrar el perfil de un programador. Incluye secciones navegables para perfil y blog, optimizada para despliegue en Vercel.

## 🚀 Características

- **Next.js 14** con TypeScript
- **Tailwind CSS** para estilos modernos y responsivos
- **Internacionalización (i18n)** con soporte para español e inglés
- **Diseño responsivo** que funciona en todos los dispositivos
- **Sección de perfil** con información personal, habilidades y experiencia
- **Sección de blog** con artículos sobre desarrollo y tecnología
- **Optimizado para Vercel** con configuración lista para producción

## 🛠️ Tecnologías utilizadas

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- next-i18next
- Vercel (para despliegue)

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone <tu-repositorio>
cd myprofile
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🌐 Internacionalización

La aplicación soporta dos idiomas:

- **Español** (por defecto)
- **Inglés**

Puedes cambiar el idioma usando el selector en la barra de navegación.

## 📁 Estructura del proyecto

```
myprofile/
├── components/          # Componentes reutilizables
│   ├── Layout.tsx      # Layout principal con navegación
│   ├── ProfileSection.tsx  # Sección de perfil
│   └── BlogSection.tsx     # Sección de blog
├── pages/              # Páginas de la aplicación
│   ├── _app.tsx        # Configuración de la app
│   ├── index.tsx       # Página de perfil
│   └── blog.tsx        # Página de blog
├── public/
│   └── locales/        # Archivos de traducción
│       ├── es/         # Traducciones en español
│       └── en/         # Traducciones en inglés
├── styles/             # Estilos globales
└── vercel.json         # Configuración de Vercel
```

## 🚀 Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente que es un proyecto Next.js
3. El despliegue se realizará automáticamente

O puedes usar la CLI de Vercel:

```bash
npm i -g vercel
vercel
```

## 🎨 Personalización

### Cambiar información personal

Edita el archivo `components/ProfileSection.tsx` para actualizar:

- Información personal
- Habilidades
- Experiencia laboral
- Educación
- Información de contacto

### Agregar artículos de blog

Modifica el array `blogPosts` en `components/BlogSection.tsx` para agregar nuevos artículos.

### Cambiar colores y estilos

Personaliza los colores en `tailwind.config.js` y los estilos en `styles/globals.css`.

## 📝 Scripts disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
