import React, { useState, useEffect } from 'react'

import './FontInspiration.css'

const number_of_fonts = 200

export const FontInspiration = () => {
  const [fonts, setFonts] = useState([{ family: 'Roboto' }])
  const [fonts_starting, setFonts_starting] = useState(0)
  const [allFonts, setAllFonts] = useState([]) // I need to use State, otherwise I am reading non-updated (the starting) values
  const [text, setText] = useState()

  const see_next_fonts = value => {
    if (typeof window !== 'undefined') {
      if (value === 0) window.localStorage.setItem('fonts_starting', 0)
      else window.localStorage.setItem('fonts_starting', fonts_starting + parseInt(value))
      window.location.reload()
    }
  }

  const fetch_fonts = async setFonts => {
    let googleFonts = await fetch(
      'https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyCdVaqGFp5FF9V6DamDfNCW2CgvVDAXbp0'
    )
    let googleFontsJson = await googleFonts.json()
    let fonts = googleFontsJson.items

    let stored_item
    if (typeof window !== `undefined`) stored_item = parseInt(window.localStorage.getItem('fonts_starting'))
    if (stored_item) setFonts_starting(stored_item)

    //  I don't use fonts_starting because it doesn't get updated with setFonts_starting (!!)
    if (stored_item) setFonts(fonts.slice(stored_item, stored_item + number_of_fonts))
    else setFonts(fonts.slice(fonts_starting, fonts_starting + number_of_fonts)) // the beginning
    setAllFonts(fonts)
    return fonts
  }

  useEffect(() => {
    ;(async () => {
      const fonts = await fetch_fonts(setFonts) // don't rely on setState

      const add_script = src => {
        const script = document.createElement('script')
        script.async = true
        script.type = 'text/javascript'
        script.src = src
        document.body.appendChild(script)
        return script
      }

      const webFontScript = add_script('/scripts/webfont.202011.js')

      const set_of_fonts = fonts.slice(fonts_starting, number_of_fonts)

      webFontScript.onload = () =>
        set_of_fonts.forEach((el, i) => {
          if (typeof window !== 'undefined') {
            window.WebFont.load({
              google: {
                families: [el.family],
              },
            })
            document.getElementById('font' + i) && (document.getElementById('font' + i).style.fontFamily = el.family)
          }
        })
    })()
  }, []) // only run once

  return (
    <div className="panel">
      <div>
        Fuentes {fonts_starting} - {fonts_starting + number_of_fonts} de {allFonts.length}
      </div>
      <div>
        <input className="input" id="text" placeholder="text" onChange={event => setText(event.target.value)}></input>
        <label htmlFor="text">(cambia el texto del título)</label>
      </div>

      <div className="buttons">
        {fonts_starting !== 0 && (
          <button className="action" onClick={() => see_next_fonts(0)}>
            Ir a primeras {number_of_fonts} fuentes
          </button>
        )}
        {fonts_starting > number_of_fonts ? (
          <button className="action" onClick={() => see_next_fonts(-number_of_fonts)}>
            Ir a {number_of_fonts} fuentes anteriores
          </button>
        ) : (
          ''
        )}
        {fonts_starting < allFonts.length - number_of_fonts ? (
          <button className="action" onClick={() => see_next_fonts(number_of_fonts)}>
            Ir a {number_of_fonts} fuentes siguientes
          </button>
        ) : (
          ''
        )}
      </div>

      {fonts.length === 1 && <div className="waiting">LEYENDO FUENTES ...</div>}

      <div className="grid">
        {fonts.map((el, i) => (
          <div key={i} id={`font${i}`} className="panel_font" data-fontfamily={el.family} font={el.family}>
            <h1>{text ? text : 'Sleep on dog bed, force dog to sleep'}</h1>
            <div className="link">
              <a target="_blank" rel="noopener noreferrer" href={'https://fonts.google.com/specimen/' + el.family}>
                [google font]
              </a>
              ,
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={'https://google-webfonts-helper.herokuapp.com/fonts/' + el.family}
              >
                [helper]
              </a>
            </div>

            <summary>
              Crusty butthole Gate keepers of hell pet me pet me don't pet me. Lies down cats woo. Lick master's hand at
              first then bite because im moody leave fur on owners clothes, but chill on the couch table.
            </summary>
          </div>
        ))}
      </div>
    </div>
  )
}
