import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Las animaciones de la señal solo se activan si la persona no pidió movimiento reducido.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
