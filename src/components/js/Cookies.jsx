import React, { useEffect } from 'react'
import './Cookies.css'

const wait = ms => new Promise((res, rej) => setTimeout(() => res('timed'), ms))

const grantit = () => {
  console.log('grantit')
  if (typeof window !== 'undefined') {
    if (window.dataLayer)
      window.dataLayer.push('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      })
    // if (window.fbq) window.fbq('consent', 'grant') facebook
  }
}

export const Cookies = () => {
  // show the panel, only if js is enabled and cookie not there
  useEffect(() => {
    const item = window.localStorage.getItem('kuworking_cookies')
    console.log(item)
    if (!item) {
      ;(async () => {
        await wait(1000)
        console.log(document.getElementById('cookie_panel').style.display)
        document.getElementById('cookie_panel').style.display = 'flex'
        await wait(50)
        document.getElementById('cookie_panel').style.opacity = 1
      })()
    } else if (item === 'granted') grantit()
  }, [])

  // hide the panel and send the consent to google
  const agree = (agree = true) => {
    document.getElementById('cookie_panel').style.display = 'none'

    if (agree) {
      window.localStorage.setItem('kuworking_cookies', 'granted')
      grantit()
    }
  }

  const disagree = () => agree(false)

  return (
    <div id="cookie_panel" data-nosnippet="data-nosnippet">
      <h2>Show</h2>
      <div>Message</div>
      <div>
        <button id="cookie_ok" className="OK" onClick={agree}>
          yes
        </button>
        <button id="cookie_no" onClick={disagree}>
          no
        </button>
      </div>
    </div>
  )
}
