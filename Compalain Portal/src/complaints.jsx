import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ComplaintManagement from './pages/ComplaintManagement/ComplaintManagement'
import './pages/ComplaintManagement/ComplaintManagement.css'

createRoot(document.getElementById('complaint-root')).render(
  <StrictMode>
    <ComplaintManagement />
  </StrictMode>,
)
