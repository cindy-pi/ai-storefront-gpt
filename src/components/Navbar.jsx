import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import GoldBalance from './GoldBalance.jsx'

export default function Navbar() {
  const { cartCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="navbar">
      <Link className="logo" to="/" onClick={closeMenu}>
        ⚡ <span>Fizban's Wands</span>
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/catalog" onClick={closeMenu}>Catalog</NavLink>
        <NavLink to="/cart" onClick={closeMenu}>
          Cart <span className="cart-count">{cartCount}</span>
        </NavLink>
        <GoldBalance compact />
      </nav>
    </header>
  )
}
