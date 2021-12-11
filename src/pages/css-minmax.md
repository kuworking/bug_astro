---
date: '2021-12-08'
title: 'Cómo funciona el #minmax()# en el css grid?'
tags: ['css']
snippet: 'Con el minmax podemos tener un comportamiento con css-grid similar al que tenemos con css-flex'
layout: ../layouts/Posts.astro
---

El `minmax` sirve para definir un valor dentro de un mínimo y un máximo, y tiene su aplicación dentro de `css grid`

```css
display: grid;
grid-template-columns: 150px 150px; // 2 columnas fijas
grid-template-columns: minmax(150px, 300px) minmax(150px, 300px); // 2 columnas dinámicas
```

Sin embargo, el número de columnas siempre será de 2, y esto es una limitación cuando pensamos en diseños _responsive_ donde no tiene sentido tener 2 columnas donde no caben 2 columnas

Por eso, la potencia de `minmax` la encontramos cuando lo combinamos con el `repeat()`, porque entonces conseguimos que el número de columnas sea también dinámico (es una alternativa a `css flex` o a `css grid` con `media queries`)

```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
```

Lo que nos dice esta norma viene a ser algo tipo "pinta tantas columnas como puedas que vayan de _300px_ hasta _1fr_ (el máximo espacio que esté disponible)"

Si tenemos _500px_ de ancho, allí sólo cabrá 1 columna (2 columnas de mínimo 300px ya serían 600px, no caben), por lo que pondrá sólo una columna y el resto ira para la siguiente línea

La columna tiene que tener mínimo de _300px_, pero el máximo es de _1fr_, así que como hay disponibles _500px_ la columna tendrá ese ancho de _500px_

La sintaxis es simple

```css
repeat(auto-fit|auto-fill, minmax(min,max))
```

La única duda es si utilizamos `auto-fit` o `auto-fill`, y luego tocará establecer los `min` y `max` como queramos (en _px_, en _fr_, en _%_, ...)

La diferencia entre `auto-fit` o `auto-fill`:

```css
width: 850px;
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
```

Aquí, con _850px_ tenemos espacio para colocar hasta 4 columnas de _200px_ que darían _800px_, quedando un espacio vacío de _50px_

El resultado con `auto-fit` es simplemente colocar los elementos aprovechando todo el espacio disponible, sin importar el cálculo anterior

![image](/images/posts/css-minmax/autofit.jpg)

En cambio, con `auto-fill`, sí que importa el cálculo anterior, y por lo tanto

- Caben 4 elementos de _200px_, que si aprovechamos todo el espacio son 4 elementos de _212px_
- Pero tenemos sólo 3 elementos
- Así que colocamos sólo 3 elementos de _212px_

![image](/images/posts/css-minmax/autofill.jpg)

Y si tenemos _700px_ disponibles?

En el caso de `auto-fill` el cálculo nos dice que caben sólo 3 elementos de _200px_, con lo que colocará esos 3 elementos aprovechando todo el espacio disponible, lo cual es exactamente lo mismo que hace `auto-fit` y por lo tanto no hay diferencia

Es decir, `auto-fill` y `auto-fit` sólo presentan diferencias cuando hay espacio disponible para colocar más elementos de los que tengo para ordenar

![image](/images/posts/css-minmax/01.gif)
