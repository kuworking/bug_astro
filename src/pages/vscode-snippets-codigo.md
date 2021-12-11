---
date: '2021-12-08'
title: 'Cómo utilizar #snippets# de código con VSCode'
tags: ['vscode']
snippet: 'Cómo utilizar #snippets# de código con VSCode'
layout: ../layouts/Posts.astro
---

En código, un _snippet_ se refiere a un código concreto (una línea, una palabra o una función entera) que en este contexto quiere decir el poder insertar ese snippet con un simple atajo de teclado, o que nos aparezca al escribir una palabra concreta

Para crearlos en _vscode_, seleccionar en el menú de arriba _File_ -> _Preferences_ -> _User Snippets_

Allí podemos seleccionar e ir a los snippets de _JavaScript_ que asimismo abre un archivo `javascript.json` que en Windows se almacenará en `C:\Users\tu_usuario\AppData\Roaming\Code\User\snippets`

El propio archivo ya te explica como definir un _snippet_ al uso, y por ejemplo podemos probar el siempre útil `console.log`

```json
  "Print to console": {
    "scope": "javascript,typescript,markdown,javascriptreact",
    "prefix": "log",
    "body": ["console.log('hola')"],
    "description": "log output to console"
  }
```

Al escribir `con` nos saldrá el _snippet_ que hemos configurado en el _IntelliSense_ (que si no nos sale lo podemos mostrar con _ctrl + space_)

Luego tienes que activar los snippets en las preferencias en _File_ -> _Preferences_ -> _Settings_

Y allí, bien con el mismo menu o bien en el archivo aparte, que en el caso del _workspace_ que estés utilizando esto es tan sencillo como crear una carpeta `.vscode` y allí un archivo `settings.json`

Y en ese archivo `settings.json` puedes poner lo siguiente

```json
{
  "editor.tabCompletion": "on",
  "editor.snippetSuggestions": "top",
  "editor.quickSuggestions": {
    "other": true,
    "comments": false,
    "strings": false
  }
}
```

Con esto los _snippets_ ya deberían funcionar, siempre que el archivo sea del tipo que has marcado arriba en el `"scope"`

# Añadir puntos de inserción

Y puestos a pedir, estaría bien que pudiésemos editar _partes_ del snippet mientras escribimos de una manera cómoda

Es muy fácil de implementar, se añaden los _insertion points_ con las variables `$1`, `$2`, etc

Por ejemplo

```json
  "Print to console": {
    "scope": "javascript,typescript,markdown,javascriptreact",
    "prefix": "log",
    "body": ["console.log($1)", "$2"],
    "description": "log output to console"
  }
```

Así el cursor se nos aparecerá en `$1` y con el `Tab` podremos pasar directamente a la posición `$2` (si queremos)

![image](/images/posts/vscode_user_snippets.gif)

Enlaces de utilidad:

- [Snipit.io](https://snipit.io/) con integración con _vscode_, gratuito para _snippets_ públicos y perfecto para tenerlos todos bajo control
- [Cacher.io](https://www.cacher.io) con versión gratuita con \_snippets\_ privados pero sin integración con _vscode_ (sólo en versión pro)
- [Snippet-generator.app](https://snippet-generator.app/) que te permite transformar tu código a la estructura _json_ de `vscode` para facilitar la creación de snippets
