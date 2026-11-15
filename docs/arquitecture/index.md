# Application Architecture

## Purpose

Esta aplicación sigue una **arquitectura basada en funcionalidades y orientada a contenido**, usando Next.js y MDX.

El contenido del blog se separa por locale.

## Blog Content

```text
content/
└── blog/
    ├── es/
    │   └── *.mdx
    └── en/
        └── *.mdx
```

Cada archivo MDX contiene la versión localizada de un post.

Los posts equivalentes deben usar el mismo slug cuando sea posible.

## Blog Pages

```text
pages/
└── blog/
    ├── index.tsx
    └── [slug].tsx
```

### `index.tsx`

Responsable de:

- detectar el locale activo;
- cargar los posts de ese locale;
- renderizar la lista del blog.

### `[slug].tsx`

Responsable de:

- resolver el slug;
- detectar el locale activo;
- cargar el archivo MDX correspondiente;
- renderizar el artículo y los metadatos de SEO.

## Internationalization

Las traducciones de la UI y el contenido del blog se mantienen separados.

```text
public/locales/
├── es/
└── en/
```

Contiene las traducciones de la UI.

```text
content/blog/
├── es/
└── en/
```

Contiene los artículos del blog localizados.

## Architecture Flow

```text
Contenido MDX localizado
        ↓
Lógica de contenido del blog
        ↓
Páginas de Next.js
        ↓
Componentes de UI
```

## Core Rules

- Organiza el código por funcionalidad.
- Mantén el contenido MDX separado por locale.
- Mantén las traducciones de la UI separadas del contenido de los artículos.
- Mantén el acceso a MDX y al sistema de archivos fuera de los componentes de UI.
- Mantén las páginas centradas en el routing y la composición.
- Reutiliza la lógica compartida del blog en lugar de duplicarla.
- Preserva la arquitectura existente de Next.js Pages Router.
