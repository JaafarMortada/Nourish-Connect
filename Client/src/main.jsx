import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StoreDataProvider } from './global/store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreDataProvider>
      <App />
    </StoreDataProvider>
  </React.StrictMode>,
)
