import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useShop } from '../context/ShopContext.jsx'
import { formatGold } from '../utils/formatGold.js'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, cartTotal, clearCart } = useCart()
  const { goldBalance, deductGold, addPurchase } = useShop()
  const [traveler, setTraveler] = useState({ name: '', email: '' })
  const [error, setError] = useState('')
  const insufficientFunds = cartTotal > goldBalance

  const updateTraveler = (field, value) => {
    setTraveler((current) => ({ ...current, [field]: value }))
  }

  const completePurchase = (event) => {
    event.preventDefault()
    if (!traveler.name.trim() || !traveler.email.trim() || !traveler.email.includes('@')) {
      setError('Name and a valid email are required for owl-post records.')
      return
    }
    if (cart.length === 0) {
      setError('Your cart is empty.')
      return
    }
    if (insufficientFunds || !deductGold(cartTotal)) {
      setError('Insufficient gold for this purchase.')
      return
    }

    const order = {
      orderNumber: `FW-${Date.now()}`,
      date: new Date().toISOString(),
      customer: traveler,
      items: cart,
      total: cartTotal,
      remainingBalance: goldBalance - cartTotal,
    }
    addPurchase(order)
    clearCart()
    navigate('/confirmation', { state: { orderNumber: order.orderNumber } })
  }

  if (cart.length === 0) {
    return (
      <section className="page-section empty-checkout">
        <h1>Checkout</h1>
        <p>Your cart is empty. Choose a wand before summoning the owl-post clerk.</p>
        <Link className="button primary" to="/catalog">Browse Wands</Link>
      </section>
    )
  }

  return (
    <section className="page-section checkout-page">
      <div className="section-heading">
        <p className="eyebrow">Traveler's Details</p>
        <h1>Checkout</h1>
      </div>
      <form className="checkout-layout" onSubmit={completePurchase}>
        <div className="checkout-form panel-card">
          <label>
            Name
            <input value={traveler.name} onChange={(event) => updateTraveler('name', event.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={traveler.email} onChange={(event) => updateTraveler('email', event.target.value)} required />
          </label>
          {error && <p className="warning">{error}</p>}
        </div>

        <aside className="panel-card payment-review">
          <h2>Order Review</h2>
          {cart.map((item) => (
            <div className="review-row" key={item.wand.id}>
              <span>{item.wand.name} × {item.quantity}</span>
              <strong>{formatGold(item.wand.price * item.quantity)}</strong>
            </div>
          ))}
          <div className="summary-row"><span>Available balance</span><strong>{formatGold(goldBalance)}</strong></div>
          <div className="summary-row"><span>Order total</span><strong>{formatGold(cartTotal)}</strong></div>
          <div className="summary-row grand-total"><span>Balance after purchase</span><strong>{formatGold(Math.max(goldBalance - cartTotal, 0))}</strong></div>
          {insufficientFunds && <p className="warning">Insufficient funds. Remove a wand or seek a dragon hoard.</p>}
          <button className="button primary" type="submit" disabled={insufficientFunds}>Complete Purchase</button>
        </aside>
      </form>
    </section>
  )
}
