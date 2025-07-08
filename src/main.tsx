import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure Futura font is loaded before rendering
const ensureFontLoaded = () => {
  return new Promise<void>((resolve) => {
    const testElement = document.createElement('span')
    testElement.style.fontFamily = 'Futura Std, sans-serif'
    testElement.style.fontSize = '16px'
    testElement.style.visibility = 'hidden'
    testElement.style.position = 'absolute'
    testElement.style.top = '-9999px'
    testElement.textContent = 'Font loading test'
    document.body.appendChild(testElement)
    
    // Force a layout
    testElement.offsetHeight
    
    // Clean up
    document.body.removeChild(testElement)
    
    // Give fonts time to load
    setTimeout(() => {
      resolve()
    }, 100)
  })
}

// Load fonts then render app
ensureFontLoaded().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}) 