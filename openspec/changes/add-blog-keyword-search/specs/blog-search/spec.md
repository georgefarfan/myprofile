## ADDED Requirements

### Requirement: Keyword search field on the blog index
La página `/blog` SHALL mostrar un campo de búsqueda accesible, con etiqueta visible o asociada, que permita introducir palabras clave para filtrar los posts publicados del locale activo.

#### Scenario: Search field is available with posts
- **WHEN** el usuario abre `/blog` y existen posts publicados
- **THEN** la página muestra un campo de texto con una etiqueta accesible asociada y los posts sin filtrar

#### Scenario: Search field is hidden when there are no posts
- **WHEN** el usuario abre `/blog` y no existen posts publicados
- **THEN** la página muestra el mensaje de estado vacío existente y no muestra el campo de búsqueda

### Requirement: Keyword matching on title, excerpt and tags
El filtrado SHALL comparar cada palabra clave introducida con el título, el extracto y las etiquetas del frontmatter de cada post, sin distinguir mayúsculas, minúsculas ni tildes. Un post SHALL mostrarse solo si cumple todas las palabras clave introducidas.

#### Scenario: Match by title
- **WHEN** el usuario escribe "react" y existe un post cuyo título contiene "React"
- **THEN** ese post se muestra en los resultados

#### Scenario: Match by excerpt
- **WHEN** el usuario escribe una palabra presente solo en el extracto de un post
- **THEN** ese post se muestra en los resultados

#### Scenario: Match by tag
- **WHEN** el usuario escribe el nombre exacto de una etiqueta de un post
- **THEN** ese post se muestra en los resultados

#### Scenario: Multiple keywords must all match
- **WHEN** el usuario escribe "react nextjs"
- **THEN** solo se muestran los posts que contienen ambas palabras en título, extracto o etiquetas

#### Scenario: Accents are ignored
- **WHEN** el usuario escribe "arquitectura" y un post contiene "Arquitectura" con tilde
- **THEN** ese post se muestra en los resultados

#### Scenario: Body content is not searched
- **WHEN** el usuario escribe una palabra que aparece solo en el cuerpo MDX de un post
- **THEN** ese post no se muestra en los resultados

#### Scenario: Surrounding whitespace is ignored
- **WHEN** el usuario escribe "  react  "
- **THEN** el resultado es el mismo que para "react"

### Requirement: Filtered results respect the active view
Los resultados filtrados SHALL mostrarse en la vista activa (cards o lista) y SHALL conservar el orden por fecha descendente de la lista original.

#### Scenario: Results keep the active view
- **WHEN** el usuario cambia a la vista de lista y escribe una búsqueda
- **THEN** los resultados se muestran en la vista de lista

#### Scenario: Results keep date order
- **WHEN** varios posts coinciden con la búsqueda
- **THEN** se muestran en el mismo orden por fecha, del más reciente al más antiguo, que la lista sin filtrar

### Requirement: Empty search state
Cuando la búsqueda no devuelve posts, la página SHALL mostrar un mensaje de estado vacío de búsqueda y SHALL ofrecer un control para limpiar la búsqueda.

#### Scenario: No matches
- **WHEN** el usuario escribe una palabra clave que no coincide con ningún post
- **THEN** la página muestra un mensaje indicando que no hay resultados y no muestra ningún post

#### Scenario: Clearing the search restores the list
- **WHEN** el usuario activa el control de limpiar búsqueda
- **THEN** el campo queda vacío y se vuelven a mostrar todos los posts publicados

### Requirement: Keyboard and screen reader support
El campo de búsqueda y el control de limpiar SHALL ser controles nativos operables con teclado, con foco visible. El número de resultados SHALL anunciarse a lectores de pantalla cuando cambie.

#### Scenario: Keyboard-only use
- **WHEN** el usuario navega solo con teclado
- **THEN** puede enfocar el campo, escribir, y activar el control de limpiar, con foco visible en ambos

#### Scenario: Result count is announced
- **WHEN** los resultados cambian tras escribir una búsqueda
- **THEN** una región con `aria-live` anuncia el número de resultados

### Requirement: Bilingual search UI
Todos los textos visibles y accesibles del buscador SHALL estar traducidos en `es` y `en` en `public/locales/{es,en}/common.json`, con las mismas claves en ambos locales.

#### Scenario: Spanish locale
- **WHEN** el usuario visita `/blog` en español
- **THEN** la etiqueta, el placeholder, el estado vacío y el control de limpiar se muestran en español

#### Scenario: English locale
- **WHEN** el usuario visita `/en/blog`
- **THEN** los mismos textos se muestran en inglés y los posts filtrados son los del locale `en`

### Requirement: Search preserves static rendering and SEO
El buscador SHALL funcionar sobre los datos cargados en `getStaticProps` sin añadir rutas de API ni cambiar el SEO existente de la página.

#### Scenario: No additional data fetching
- **WHEN** el usuario escribe en el buscador
- **THEN** el filtrado no realiza peticiones de red adicionales

#### Scenario: Page metadata is unchanged
- **WHEN** la página `/blog` se renderiza con el buscador
- **THEN** title, description, canonical y structured data `ItemList` siguen generándose igual que antes
