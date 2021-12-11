---
date: '2021-12-08'
title: 'Caos con LF y CRLF y #vscode#'
tags: ['vscode']
snippet: 'Caos con LF y CRLF y #vscode#'
layout: ../layouts/Posts.astro
---

El origen del problema es de sistemas operativos, Windows genera la combinación `CRLF` para una nueva línea, mientras que Linux genera sólo la parte `LF`

- CR: Carriage Return, \r
- LF: Line Feed, \n

Con `prettier` y su [versión 2.0.0](https://prettier.io/docs/en/options.html#end-of-line) se cambió las preferencias de `auto` a `LF` para evitar que `git` se llene de cambios innecesarios

Y con esto, miles de repositorios bajo entorno Windows que ahora tienen que cambiar sus `CRLF` a `LF`, y que con _vscode_ esto solo se puede hacer manualmente y de un archivo en un archivo

Un infierno

La solución la encuentras en [warlord0blog](https://warlord0blog.wordpress.com/2019/09/04/vscode-crlf-vs-lf-battle/) y añadir o editar los archivos siguientes para `git` y `vscode`

`.gitattributes`

```git
 text=lf
 *.css linguist-vendored eol=lf
 *.scss linguist-vendored eol=lf
 *.js linguist-vendored eol=lf
 *.php eol=lf
 *.twig eol=lf
 *.md eol=lf
 *.mdx eol=lf
 CHANGELOG.md export-ignore
```

`.gitconfig`

```git
[core]
         autocrlf = false
```

`.settings.json` de vscode

```git
"files.eol": "\n",
```

Y luego, actualizar a `git` y ejecutar

```bash
git rm --cached -r .
git reset --hard
git pull --rebase
```

Y asunto resuelto
