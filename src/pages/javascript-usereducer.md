---
date: '2021-12-08'
title: 'Utilizando #useReducer#'
tags: ['javascript']
snippet: 'Cómo y para qué se utiliza el hook #useReducer# | kuworking 🖖'
layout: ../layouts/Posts.astro
---

Si `reduce` es la versión completa de `forEach` y demás, `useReducer` vendría a ser la versión completa de `useState`

Por ejemplo, tenemos esta aplicación para añadir y quitar elementos de una variable controlada por `useState`

```jsx
import React, { useRef, useState } from 'react'

export const App = () => {
  // referencia para gestionar el input
  const inputRef = useRef()

  // el estado, con un valor inicial de []
  const [elements, setElements] = useState([])

  // funciones para añadir y quitar elementos del estado
  const addElement = () => setElements([inputRef.current.value, ...elements])
  const removeElement = i => setElements([...elements.slice(0, i), ...elements.slice(i + 1)])

  // el jsx que gestiona la interfaz
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={addElement}>✏️</button>
      {elements.map((el, i) => (
        <div key={'element' + i}>
          <span>{el}</span>
          <button onClick={() => removeElement(i)}>✔️</button>
        </div>
      ))}
    </div>
  )
}
```

Ahora lo refactorizo para extraer la lógica y hacerlo más legible (o no)

```jsx
import React, { useRef, useState } from 'react'

export const App = () => {
  const inputRef = useRef()
  const [elements, setElements] = useState([])

  const changeElements = action =>
    action.type === 'add'
      ? [action.value, ...elements]
      : action.type === 'remove'
      ? [...elements.slice(0, action.i), ...elements.slice(action.i + 1)]
      : []

  const addElement = () => setElements(changeElements({ type: 'add', value: inputRef.current.value }))
  const removeElement = i => setElements(changeElements({ type: 'remove', i: i }))

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={addElement}>✏️</button>
      {elements.map((el, i) => (
        <div key={'element' + i}>
          <span>{el}</span>
          <button onClick={() => removeElement(i)}>✔️</button>
        </div>
      ))}
    </div>
  )
}
```

Creo la función `changeElements` para poder simplificar las funciones `addElement` y `removeElement`, lo cual no me queda claro que mejore o empeore la legibilidad del tema pero ahí está

El ejemplo me viene bien porque puedo utilizar `useReducer` para juntar el `useState` con el `changeElements`

```jsx
import React, { useRef, useReducer } from 'react'

export const App = () => {
  const inputRef = useRef()

  const [elements, setElements] = useReducer(
    (state, action) =>
      action.type === 'add'
        ? [action.value, ...state]
        : action.type === 'remove'
        ? [...state.slice(0, action.i), ...state.slice(action.i + 1)]
        : [],
    []
  )

  const addElement = () => setElements({ type: 'add', value: inputRef.current.value })
  const removeElement = i => setElements({ type: 'remove', i: i })

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={addElement}>✏️</button>
      {elements.map((el, i) => (
        <div key={'element' + i}>
          <span>{el}</span>
          <button onClick={() => removeElement(i)}>✔️</button>
        </div>
      ))}
    </div>
  )
}
```

Conceptualmente estoy juntando todo lo ofuscado dentro del `useReducer` mientras el resto del código es fácil de entender

Esto en general es bueno, y mejora en cuanto acostumbras la vista al `reduce` y al `useReduce`
