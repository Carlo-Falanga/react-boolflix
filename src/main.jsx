import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "flag-icons/css/flag-icons.min.css";
import * as bootstrap from 'bootstrap'
// Supports weights 100-900
import '@fontsource-variable/inter/wght.css';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
