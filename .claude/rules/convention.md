Convenciones para generar commits

Objetivo

Quiero que generes mis commits teniendo en cuenta mi manera de expresarme cuando hablamos sobre desarrollos, correcciones y mejoras del proyecto.

Normalmente explico los cambios de forma directa, sencilla y sin demasiados tecnicismos.

Tu trabajo es interpretar lo que quiero decir y convertirlo en un mensaje de commit profesional, corto y preciso.

Todos los commits deben seguir Conventional Commits y ser compatibles con Commitlint.

1. Cómo me expreso

Cuando te explico un cambio, normalmente utilizo expresiones como:

* “Agregué una funcionalidad para…”
* “Ahora quiero que permita…”
* “Corregí el problema que tenía…”
* “Modifiqué el componente para que…”
* “Cambié la lógica de…”
* “Saqué lo que ya no se usa…”
* “Actualicé el servicio para…”
* “Separé la lógica del componente…”
* “Moví esto al Manager…”
* “Agregué los test para…”
* “Hice que cuando pase esto, haga aquello…”
* “Ahora también tiene que contemplar…”
* “No quiero que haga esto cuando…”
* “Mejoré cómo se muestra…”
* “Arreglé el error que aparecía cuando…”

Estas expresiones son ejemplos de cómo comunico mis cambios.

No debes copiarlas literalmente. Debes interpretar su intención.

2. Cómo interpretar mis cambios

Cuando te explique algo, identifica qué se modificó y por qué.

Mi manera de expresarme	Tipo de commit
Agregué algo nuevo	feat
Ahora permite hacer algo que antes no	feat
Corregí un error	fix
Arreglé algo que no funcionaba	fix
Separé responsabilidades	refactor
Moví lógica entre componentes o servicios	refactor
Mejoré el rendimiento	perf
Agregué o corregí pruebas	test
Actualicé documentación	docs
Cambié estilos sin modificar comportamiento	style
Actualicé dependencias	build o chore, según corresponda
Cambié una configuración de CI/CD	ci
Revertí un cambio anterior	revert

Importante: no determines el tipo únicamente por las palabras que utilizo. Analiza el cambio real.

Por ejemplo, cuando digo “modifiqué el componente”, puede tratarse de un feat, fix o refactor.

3. Formato obligatorio

Todos los mensajes deben estar en inglés.

Utiliza:

type(scope): description

Reglas:

* Utiliza minúsculas.
* El mensaje debe ser corto y descriptivo.
* Utiliza verbos en imperativo.
* No agregues puntos al final.
* No agregues emojis.
* Evita descripciones genéricas.
* Incluye el componente, módulo o funcionalidad afectada cuando corresponda.
* No inventes funcionalidades que no se hayan implementado.

4. Ejemplos de cómo quiero que interpretes mis mensajes

Ejemplo 1

Yo digo:

“Agregué un filtro para que también permita buscar cuando el valor es cero.”

Commit:

fix(filters): allow zero values in filtering

Ejemplo 2

Yo digo:

“Moví toda la lógica del formulario al Manager para que el componente quede más limpio.”

Commit:

refactor(forms): move form logic to manager

Ejemplo 3

Yo digo:

“Ahora el componente permite comparar dos JSON y mostrar qué valores cambiaron.”

Commit:

feat(json-diff): add JSON comparison

Ejemplo 4

Yo digo:

“Corregí el problema que tenía el componente cuando el valor venía null.”

Commit:

fix(component): handle null values

Ejemplo 5

Yo digo:

“Agregué los test para contemplar los ternarios, los if y los valores nullish.”

Commit:

test(component): cover conditional and nullish branches

Ejemplo 6

Yo digo:

“Saqué código que ya no se utiliza y simplifiqué algunos métodos.”

Commit:

refactor(component): remove unused code and simplify methods

5. Analizar los cambios reales

Antes de generar un commit:

1. Revisa los archivos modificados.
2. Analiza los cambios realizados.
3. Identifica qué funcionalidad se agregó, corrigió o modificó.
4. Ten en cuenta cómo te expliqué el cambio.
5. Determina el tipo de commit correspondiente.
6. Identifica el scope más representativo.
7. Genera un mensaje corto en inglés.

Si mi explicación no coincide con los cambios realizados, prioriza los cambios reales y señala la diferencia.

No incluyas modificaciones que no estén relacionadas con el commit.

6. Cuando existen varios cambios

Si se modificaron varias funcionalidades independientes, no las agrupes automáticamente en un único commit.

Identifica si corresponde generar commits separados.

Por ejemplo:

* Agregué una funcionalidad.
* Corregí un error.
* Actualicé los tests.

En ese caso, puedes proponer tres commits diferentes.

No ejecutes los commits sin mi autorización.

7. Cómo quiero que respondas

Cuando te pida un commit, no necesito una explicación extensa.

Quiero que me respondas directamente con el mensaje recomendado.

Ejemplo:

feat(spaces): add dynamic filtering

Si existen varios cambios independientes, muestra los commits correspondientes.

Solo explica el motivo cuando exista alguna ambigüedad o cuando te lo solicite.

8. Reglas finales

* Respeta mi manera de explicar los cambios.
* Interpreta la intención, no las palabras literalmente.
* Utiliza inglés para los mensajes de commit.
* Mantén Conventional Commits.
* Respeta Commitlint.
* Prioriza mensajes cortos y precisos.
* Evita información innecesaria.
* No inventes cambios.
* No ejecutes git commit sin autorización.

El objetivo es que pueda explicarte los cambios como lo hago normalmente y que tú los conviertas en commits profesionales sin necesidad de que yo tenga que redactarlos técnicamente.