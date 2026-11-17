# blog-list-view Specification

## Purpose
Selector de vista (tarjetas / lista) en el índice del blog (`/blog`), con su estado por defecto, persistencia, accesibilidad y comportamiento con y sin posts.

## Requirements

### Requirement: Selector de vista en el índice del blog
La página `/blog` SHALL ofrecer un control que permita elegir entre la vista de tarjetas y la vista de lista. La vista de tarjetas SHALL ser la vista por defecto.

#### Scenario: Vista por defecto
- **WHEN** el usuario abre `/blog` sin una elección previa de vista
- **THEN** se muestran los posts en vista de tarjetas y el control indica que la vista de tarjetas está seleccionada

#### Scenario: Cambio a vista de lista
- **WHEN** el usuario selecciona la vista de lista
- **THEN** los mismos posts se muestran en filas compactas con título, extracto, fecha y etiquetas, sin imagen de portada, y el control indica que la vista de lista está seleccionada

#### Scenario: Cambio de vuelta a tarjetas
- **WHEN** el usuario selecciona de nuevo la vista de tarjetas desde la vista de lista
- **THEN** los posts vuelven a mostrarse en tarjetas con su imagen de portada cuando la tienen

### Requirement: Accesibilidad del selector de vista
El selector de vista SHALL ser operable con teclado y SHALL comunicar a los lectores de pantalla cuál es la vista activa y cuál es su función.

#### Scenario: Operación con teclado
- **WHEN** el usuario navega con la tecla Tab hasta el selector y activa una opción con Enter o Espacio
- **THEN** la vista cambia y el foco permanece en el control seleccionado

#### Scenario: Estado anunciado
- **WHEN** un lector de pantalla recorre el selector
- **THEN** cada opción tiene un nombre accesible en el idioma activo y la opción activa se anuncia como seleccionada

### Requirement: Persistencia de la vista elegida
La vista elegida SHALL mantenerse al navegar dentro del sitio y al volver a `/blog` en la misma sesión de navegador.

#### Scenario: Vista recordada
- **WHEN** el usuario elige la vista de lista, navega a un post y vuelve a `/blog`
- **THEN** el índice se muestra en vista de lista

#### Scenario: Almacenamiento no disponible
- **WHEN** el almacenamiento del navegador no está disponible o lanza un error
- **THEN** la página sigue funcionando con la vista por defecto sin mostrar errores al usuario

### Requirement: Comportamiento sin posts
Cuando no hay posts, la página SHALL mostrar el mensaje de ausencia de posts independientemente de la vista seleccionada, y el selector SHALL NOT mostrarse vacío ni romper el layout.

#### Scenario: Lista de posts vacía
- **WHEN** no existen posts para el idioma activo
- **THEN** se muestra el mensaje `blog.posts.noData` traducido al idioma activo

### Requirement: Textos traducidos
Todo texto visible nuevo del selector SHALL existir en español e inglés con la misma clave en `public/locales/es/common.json` y `public/locales/en/common.json`.

#### Scenario: Textos en español
- **WHEN** el idioma activo es español
- **THEN** el selector y sus opciones muestran los textos en español

#### Scenario: Textos en inglés
- **WHEN** el idioma activo es inglés
- **THEN** el selector y sus opciones muestran los textos en inglés

### Requirement: SEO y datos estructurados sin cambios
Ambas vistas SHALL enlazar a los mismos URLs de post y SHALL mantener el JSON-LD `ItemList` existente con el mismo contenido.

#### Scenario: Enlaces idénticos entre vistas
- **WHEN** el usuario compara los enlaces de la vista de tarjetas y de la vista de lista
- **THEN** ambas vistas apuntan a los mismos slugs de post

#### Scenario: Datos estructurados
- **WHEN** la página se renderiza en cualquiera de las dos vistas
- **THEN** el bloque JSON-LD `ItemList` contiene la misma lista de posts y posiciones
