---
date: '2021-12-08'
title: 'Cómo trabajar con #GIT TAG#'
tags: ['git']
snippet: 'Qué es git tag'
layout: ../layouts/Posts.astro
---

# `git`

`git` nos permite tener un control de la evolución de nuestro desarrollo

Esto lo hacemos con:

1. _stage_ via `git add *` o `git add tu_archivo.js`
2. _commit_ via `git commit -m "he añadido esto"`
3. _push_ via `git push origin master`

El _stage_ nos sirve para agrupar archivos que hemos cambiado, y luego poder hacer un _commit_ de ellos con un mensaje adecuado, así si tenemos 20 archivos cambiados podemos separar los stage y commits en varios grupos

En cualquier momento podemos hacer el _push_ para sincronizar los contenidos entre el local y el remoto (por ejemplo en `github`), y es en ese momento donde podemos añadir un _tag_ a nuestro _commit_ para dotarle de (más) significado

# `git tag`

Con el comando `git tag` (equivalente a `git tag -l` o `git tag --list`) veremos los _tags_ que tenemos existentes

Si queremos crearlos, lo hacemos con `git tag -a miEtiqueta -m "el mensaje que quedamos que acompañe a la etiqueta`

```bash
$ git tag -a v0.1 -m "texto que queremos poner, como por ejemplo version 0.1"
$ git tag

v0.1
```

Y este tag que acabamos de crear estará vinculado al `git commit` que hayamos hecho anteriormente

# `git show`

Una vez creado el _tag_ después del _commit_ correspondiente, podremos explorar cualquier _tag_ con `git show` donde no sólo veremos las etiquetas sino también los cambios a nivel de código que se han producido

```bash
$ git tag -a v0.1 -m "texto que queremos poner, como por ejemplo version 0.1"
$ git show v0.1

tag kuworking@0.1
Tagger: kuworking
Date:   Tue Jun 20 08:43:10 2019 +0200

kuworking@0.1

commit 280a654f0e63fec63457ffdee95c4779e917adre (tag: site@0.1, tag: kuworking@0.1)
Author: kuworking
Date:   Tue Jun 20 08:43:10 2019 +0200

    Publish

     - kuworking@0.1
     - site@0.1

diff --git a/packages/kuworking/package.json b/packages/kuworking/package.json
index 6ede0d8..19a93f2 100644
--- a/packages/kuworking/package.json
+++ b/packages/kuworking/package.json
@@ -1,6 +1,6 @@
 {
   "name": "kuworking",
-  "version": "0.01",
+  "version": "0.1",
   "description": "kuworking.com",
   "author": "kuworking",
   ...
```

# `git tag` (ligero)

Si queremos almacenar la etiqueta con menos información, en lugar del tag anterior (_annotated_) también podemos hacer un _tag lightweight_ (sin anotación, en [git](https://git-scm.com/book/en/v2/Git-Basics-Tagging) te explican estos dos tipos de tags)

```bash
$ git tag v0.1
$ git show v0.1
```

La diferencia es que el vínculo entre el `tag` y el `commit` no será tan permanente, pero igualmente podremos apuntar a ese `tag` si nos interesa

# Borrar un _tag_

Borrar un _tag_ por un error o por una rutina que se ha interrumpido inesperadamente es algo que podemos hacer de forma sencilla con

```bash
$ git tag -d v0.1

Deleted tag 'v0.1' (was 9165190)
```

Esto sólo borra el _tag_ a nivel _local_, por lo que si antes habíamos sincronizado con _push_ también necesitaremos borrar el tag en _remote_

```bash
$ git push origin --delete v0.1
```

Para ver los _tags_ en _remote_, haríamos

```bash
$ git ls-remote --tags origin
e8a0cc653954551c4838966d1c1178110892a802        refs/tags/v0.0.2
81101b87b2e02dcfefa326cbe35ae1e6904b2bca        refs/tags/v0.0.3
4287f60d08a9ce19e27fc1f67e546f6b1300ad1b        refs/tags/v0.0.7
```

# Para qué hacer un _git tag_?

Más allá de darle una frase entendible al _commit_ , también podemos distribuir la instalación de esa versión concreta via `github` apuntando al tag en particular (esto es si no queremos utilizar `npm`):

```json
"myPublicPackage": "git+https://github.com/myUser/myPublicPackage.git#v0.0.14",
"myPrivatePackage": "git+https://miTokenParaAcceder:x-oauth-basic@github.com/myUser/myPrivatePackage.git#v0.0.14",
```
