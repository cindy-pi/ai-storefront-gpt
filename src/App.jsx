import { HashRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { ShopProvider } from './context/ShopContext.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import CartPage from './pages/CartPage.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import ConfirmationPage from './pages/ConfirmationPage.jsx'
import HomePage from './pages/HomePage.jsx'

export default function App() {
  return (
    <HashRouter>
      <ShopProvider>
        <CartProvider>
          <div className="app-shell">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </ShopProvider>
    </HashRouter>
  )
}
