import React, { useRef } from 'react'
import './LikePost.css'

export const LikePost = () => {
  const previous = (typeof window !== 'undefined' && document.referrer.replace(/^https?\:\/\//i, '')) || ''

  const gtm = msg => {
    document.getElementsByClassName('like').classList.add('hide')
    if (msg == '') document.getElementsByClassName('likeempty').classList.add('show')
    else {
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'UserFeedback', // the name of the event matches the one present in GTM
          user_message: msg + '>>' + previous,
        })
        document.getElementsByClassName('likeend').classList.add('show')
      }
    }
  }

  const inputRef = useRef()

  return (
    <div id="likepost">
      <div className="like">
        <h2>Feedback</h2>
        <label htmlFor="input">Qué tal? bien? O hay algún error?</label>
        <div className="input" id="input" name="input">
          <input type="text" ref={inputRef} />
          <button onClick={() => gtm(inputRef.current.value)}>Enviar</button>
        </div>
      </div>

      <div className="likeempty">
        <div>El texto está en blanco!</div>
      </div>

      <div className="likeend">
        <div>Enviado!</div>
      </div>
    </div>
  )
}
