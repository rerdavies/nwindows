import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='nwindows'> {/* HashRouter */}

        <ErrorBoundary>
          <App />
        </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
)
