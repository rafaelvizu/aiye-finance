import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
