import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SearchProvider } from './context/SearchContext';
import './index.css'
import App from './App.jsx'
import { FavoritosProvider } from './context/FavoritosContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FavoritosProvider>
          <CarritoProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </CarritoProvider>
        </FavoritosProvider>
      </AuthProvider>
    </BrowserRouter>  
  </StrictMode>
)
