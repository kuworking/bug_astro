---
date: '2021-12-08'
title: 'Publicar un paquete en npm'
tags: ['git']
snippet: 'Publicar un paquete en npm'
layout: ../layouts/Posts.astro
---

Para facilitar el uso de nuestros paquetes, lo mejor es distribuirlo via `npm`

1. Crea una cuenta en [npmjs.com](https://www.npmjs.com)
2. Ejecuta en el terminal `npm login` y entra lo que has utilizado arriba
3. Ejecuta `npm publish`

Cada vez que queramos publicar una nueva versión, cambiamos el número de versión en nuestro `package.json' y repetimos instrucciones (consulta la guía [semVer](https://semver.org/) para versionar)

Y si lo quieres escalar, tienes [lerna](https://github.com/lerna/lerna)

