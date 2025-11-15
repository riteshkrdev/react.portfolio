import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import LayoutContent from './Layout'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LayoutContent />
  </StrictMode>,
)
