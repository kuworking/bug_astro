---
date: '2021-12-08'
title: '#schema# JSON-LD para SEO'
tags: ['seo']
snippet: 'Cómo construir un #schema# con JSON-LD para potenciar el SEO'
layout: ../layouts/Posts.astro
---

Qué es `schema`?

Te lo definen [aquí](https://schema.org/), es un esfuerzo conjunto (Google, Microsoft y Yahoo) para que una página web no sólo escriba contenido para sus lectores sino también para los motores de búsqueda

El schema se puede escribir de 2 maneras:

- Con `Microdata` o `RDFa`, que viene a ser un conjunto de tags _html_ con el que definiremos nuestro contenido de un modo _inline_ (en el primer caso) o simplemente con tags de tipo `<meta>` (en el segundo caso)

- Con `JSON-LD`, que hace lo mismo pero en lugar de hacerlo con _html_ lo hace con JavaScript

No hay color, JavaScript siempre en mi equipo

La manera de definir el schema `JSON-LD` es la mar de sencillo

```js
<script type="application/ld+json">
{
  "@context":"http://schema.org",
  "@type":"WebPage",
}
</script>
```

Aquí le decimos que esta página es una _WebPage_

y qué otros tipos de páginas existen según `schema.org`?

Bastantes, las tienes [aquí](https://schema.org/Thing) y son éstas:

- Action
- CreativeWork
- Event
- Intangible
- MedicalEntity
- Organization
- Person
- Place
- Product

Para poner un ejemplo, para páginas como la presente le podríamos poner `BlogPosting` que se trata de un subtipo de `CreativeWork`

- CreativeWork > Article > SocialMediaPosting > BlogPosting

Y dentro de esta [categoría](https://schema.org/BlogPosting) podemos especificar lo que queramos (que esté definido en el schema)

```js
<script type="application/ld+json">
{
  "@context":"http://schema.org",
  "@type":"BlogPosting",
  "@id":"https://www.kuworking.com/",
  "headline":"JavaScript",
  "description":"Descripción",
}
</script>
```

Lo bueno es que aquí le decimos a Google (y demás) lo que queremos decirle, y no lo que Google interpreta que queremos decirle (leyendo nuestra página)

Páginas que te servirán de ayuda:

- [jsonld](https://jsonld.com/) para ejemplos de templates
- [structured-data](http://linter.structured-data.org/) para analizar tus esquemas o directamente la página web
- Lo mismo, pero con la herramienta de [Google](https://search.google.com/structured-data/testing-tool/u/0/)
- Lo mismo, pero con la herramienta de [Facebook](https://developers.facebook.com/tools/debug/)
- La página de [schema](https://schema.org/)
