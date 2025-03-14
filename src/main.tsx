import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ReduxProviders } from './redux/provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProviders>
      <App />
    </ReduxProviders>
  </StrictMode>,
)
