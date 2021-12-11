import React, { useState, useEffect, useRef } from 'react'

import './CssGradients.css'

const wait = ms => new Promise((res, rej) => setTimeout(() => res('timed'), ms))

const get_random_gradient = () => {
  let randomColour = () => '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16))
  let randomAngle = () => Math.round(Math.random() * 360)
  return 'linear-gradient(' + randomAngle() + 'deg, ' + randomColour() + ', ' + randomColour() + ')'
}
const number_of_gradients = 20

export const CssGradients = data => {
  const [gradients, setGradients] = useState([])
  const [display, setDisplay] = useState('')
  const refs = useRef([])
  const getRef = el => el && !refs.current.includes(el) && refs.current.push(el)

  let these_gradients = [...Array(parseInt(number_of_gradients))].map(el => get_random_gradient())

  useEffect(() => setGradients(these_gradients), []) // only run once
  useEffect(() => {
    document.getElementById('refresh').style.background = display
  }, [display])
  useEffect(() => {
    gradients.forEach((el, i) => (document.getElementById('gradient' + i).style.background = el))
  }, [gradients])

  const refresh = () => {
    console.time('e')
    these_gradients = [...Array(parseInt(number_of_gradients))].map(el => get_random_gradient())
    console.timeEnd('e')
    setGradients(these_gradients)
  }

  const copy_to_clipboard = async (el, grad) => {
    setDisplay(grad)
    await wait(100)
    const range = new Range()
    range.selectNodeContents(el)
    const sel = document.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
    document.execCommand('copy')
  }

  // add the background inline not to generate new classes that slows down the rendering (a lot)

  return (
    <div className="room">
      <button onClick={refresh} id="refresh" class="refresh">
        <span>click para generar nuevos gradientes</span>
      </button>

      <div className="grid">
        {gradients.map((el, i) => (
          <div className="box" key={i} onClick={e => copy_to_clipboard(refs.current[i], el)}>
            <div className="gradients" id={`gradient${i}`}></div>
            <div className="code" onClick={() => copy_to_clipboard(refs.current[i], el)} ref={getRef}>
              <div>background: {el}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
