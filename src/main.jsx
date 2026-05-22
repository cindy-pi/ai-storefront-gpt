import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ShopProvider } from './context/ShopContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShopProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ShopProvider>
  </React.StrictMode>,
)
