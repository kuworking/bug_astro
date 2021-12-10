import React, { useEffect } from 'react'
import './SwitchTheme3.css'

const wait = ms => new Promise((res, rej) => setTimeout(() => res('timed'), ms))

const changeTheme = (pre, curr) => {
  document.documentElement.classList.remove(pre)
  document.getElementById('switcher_theme3').classList.remove(pre)
  document.documentElement.classList.add(curr)
  document.getElementById('switcher_theme3').classList.add(curr)
}
const changeTypo = (pre, curr) => {
  document.documentElement.classList.remove(pre)
  document.getElementById('switcher_typo3').classList.remove(pre)
  document.documentElement.classList.add(curr)
  document.getElementById('switcher_typo3').classList.add(curr)
}

export const SwitchTheme3 = () => {
  const switchTheme = () => {
    document.documentElement.classList.contains('theme1')
      ? changeTheme('theme1', 'theme2')
      : document.documentElement.classList.contains('theme2')
      ? changeTheme('theme2', 'theme3')
      : document.documentElement.classList.contains('theme3')
      ? changeTheme('theme3', 'theme4')
      : document.documentElement.classList.contains('theme4')
      ? changeTheme('theme4', 'theme5')
      : document.documentElement.classList.contains('theme5')
      ? changeTheme('theme5', 'theme1')
      : 1
  }
  const switchTypo = () => {
    document.documentElement.classList.contains('typo1')
      ? changeTypo('typo1', 'typo2')
      : document.documentElement.classList.contains('typo2')
      ? changeTypo('typo2', 'typo3')
      : document.documentElement.classList.contains('typo3')
      ? changeTypo('typo3', 'typo4')
      : document.documentElement.classList.contains('typo4')
      ? changeTypo('typo4', 'typo1')
      : 1
  }

  useEffect(() => {
    ;(async () => {
      await wait(1000)
      for (let el of document.getElementsByClassName('switcher')) {
        el.classList.remove('disabled')
      }
    })()
  }, [])

  return (
    <>
      <div className="switcher disabled theme" onClick={switchTheme}>
        <div id="switcher_theme3" className="theme1"></div>
      </div>
      <div className="switcher disabled typo" onClick={switchTypo}>
        <div id="switcher_typo3" className="typo1"></div>
      </div>
    </>
  )
}
