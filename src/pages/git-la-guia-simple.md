---
date: '2021-12-08'
title: 'La guía simple para trabajar con #GIT#'
tags: ['git']
snippet: 'La guía simple para trabajar con GIT'
layout: ../layouts/Posts.astro
---

Trabajar con `git` nos permite tener un control de la evolución del código y nos sirve (por ejemplo) para poder recuperar versiones anteriores sin esfuerzo

# Funcionamiento

`Git` trabaja con _branch_ (ramas) como manera de separar desarrollos que pueden ir paralelos y que se irán juntando a medida que estén terminados (la rama principal se conoce como _master_)

A partir de allí, la estructura de `git` estaría formada por 3 partes

1. El desarrollo _local_ (la carpeta de tu ordenador o _working directory_)
2. El _index_, que es el registro donde añades aquellos archivos que quieres señalar (normalmente serán todos), lo que se conoce como _stage_
3. El _head_, que es donde guardarás todos los cambios de los archivos añadidos en el _index_, lo que se conoce como _commit_

Tu desarrollo típico por lo tanto se resume en

1. Trabajar en una _branch_ concreta (que puede ser siempre la _master_)
2. A medida que avanzas vas haciendo _stage_ y _commit_ según tus criterios
3. Y cada día o cada cierto tiempo sincronizas con tu repositorio _remote_

El sistema de repositorios más popular del momento es _github.com_ (con alternativas como _gitlab.com_ y demás)

# Inicializar un repositorio de GitHub

Lo más rápido para trabajar con _github_, una vez has abierto tu cuenta allí, es crear un nuevo repositorio directamente allí y luego clonarlo en _local_

Para esto, una vez creado el repositorio necesitamos copiar la _url_

![image](/images/posts/github_new_repository.gif)

Luego, una vez instalado _Visual Studio Code_ (_vscode_), nos vamos al terminal `view -> terminal`

Allí, en nuestra carpeta general (puedes moverte en el sistema de ficheros con los comandos `cd 'carpeta'` o `cd ..`) ejecutamos

```bash
$ cd mi_carpeta_general_de_programacion
$ git clone https://github.com/tu_usuario/tu_repositorio.git
```

Donde tenemos que poner la _url_ del repositorio

Esto creará una nueva carpeta que contendrá una copia exacta del repositorio que acabamos de crear en _github_ (y que está totalmente vacío)

Lo interesante de haber hecho un `git clone` es que ya tenemos vinculado el _local_ (nuestro ordenador) y el _remote_ (_github.com_), esto lo podemos ver con

```bash
$ cd tu_repositorio
$ git remote -v
origin  https://github.com/tuUsuario/tuRepositorio.git (fetch)
origin  https://github.com/tuUsuario/tuRepositorio.git (push)
```

Otra opción para prescindir de `git clone` sería crear la carpeta nosotros mismos para luego inicializar `git` y luego vincular el _local_ y el _remote_ con

```bash
$ mkdir mi_carpeta
$ cd mi_carpeta
$ git init
$ git remote add https://github.com/tu_usuario/tu_repositorio.git
```

Donde la última órden, si no le especificamos ningún nombre es lo mismo que hacer

```bash
$ git remote add origin https://github.com/tu_usuario/tu_repositorio.git
```

Al igual que _master_ para nuestra _branch_ por defecto, _origin_ es el nombre por defecto de nuestro _remote_

# Stage y Commit

Una vez hayamos terminado el desarrollo de lo que decidamos, nuestro _workflow_ consistirá en

1. _stage_ via `git add *` o `git add tu_archivo.js`
2. _commit_ via `git commit -m "he añadido estos cambios"`
3. _push_ via `git push origin master`

El primer paso es para añadir a _index_ aquellos archivos que querremos hacer un _commit_ después

Si no queremos fraccionar nuestros avances en distintos _commit_ lo que haremos será añadir todos los archivos con un `git add *`

Después hacemos el _commit_ que es la copia real de los archivos en `git` (lo que nos permitirá tener un histórico)

El _commit_ nos obliga a poner un mensaje que describirá la justificación de este _commit_

Y el tercer paso es la sincronización con nuestro repositorio _remote_

# Sincronizando cambios

## Push

Una vez terminado el _commit_ tendremos `git` haciendo su trabajo en _local_, pero lo que queremos es propagar estos cambios a _remote_ por razones de seguridad y para poder trabajar con otros ordenadores u otras personas sin problemas

Esto lo hacemos con

```bash
$ git push origin master
```

O, puesto que tanto _origin_ como _master_ son los nombres por defecto de nuestro _remote_ y _branch_, podemos simplemente hacer

```bash
$ git push
```

Qué utilidad tiene el tener que especificar tanto el _branch_ como el _remote_?

Poder publicar en distintas ramas distintas, lo que puede por ejemplo ejecutar una compilación automática si vinculamos una rama concreta a servicios como _Netlify_

## Pull

Pero y cuando hemos desarrollado en otros ordenadores y queremos sincronizar en la dirección opuesta, esto es, que nuestro _local_ esté al dia de nuestro _remote_?

Lo hacemos con

```bash
$ git pull
```

Esto por defecto equivale a escribir

```bash
$ git pull origin master
```

Esto cogerá nuestro _remote_ _origin_, de allí cogerá nuestra _branch_ _master_, y lo copiará y fusionará con nuestro _local_

Algunas veces un `git pull` no funciona y nos pide que especifiquemos el _remote_ y el _branch_

> Con el `git clone` esto no debe suceder, pero si creamos un nuevo `branch` en `local` antes que en `remote`, entonces `git` no sabrá qué vinculación hay entre `local` y `remote`

Esto lo solucionamos especificando el vínculo entre _remote_ y _branch_ bien cada vez con `git pull origin master` o bien

```bash
$ git branch --set-upstream-to=origin/master master
$ git pull
```

# Añadir un directorio vacío con .gitignore

Para añadir un directorio vacío, tan sencillo como crearlo

Pero si esto lo sincronizamos al _remote_, veremos que el directorio no existe, no se ha sincronizado

Para forzar esa sincronización sin tener que añadir ningún archivo dentro, podemos añadir un archivo `.gitignore`

En este archivo se añade todo aquello que queremos que `git` nos ignore, y en este caso lo utilizamos como archivo que nos permitirá sincronizar la carpeta

Dentro nos limitamos a poner

```json
*
!.gitignore
```

Con esto le decimos a `git` que lo ignore todo (con el símbolo `*`) excepto el propio archivo `.gitignore` (con la segunda línea del código), con lo que al haber un archivo (el `.gitignore`) en el directorio (y por lo tanto no estar vacío) éste se sincronizará a _remote_ (tienes esta pregunta de [stack overflow](https://stackoverflow.com/questions/115983/how-can-i-add-an-empty-directory-to-a-git-repository))

La solución no es ideal, porque ahora cualquier cosa que añadas al directorio se ignorará (bastará con borrar el `.gitignore`)

La alternativa fácil es añadir cualquier `README.txt` para forzar lo mismo
