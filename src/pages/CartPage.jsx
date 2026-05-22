import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem.jsx'
import GoldBalance from '../components/GoldBalance.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useShop } from '../context/ShopContext.jsx'
import { formatGold } from '../utils/formatGold.js'

export default function CartPage() {
  const { cart, cartCount, cartSubtotal, tax, cartTotal } = useCart()
  const { goldBalance } = useShop()
  const insufficientFunds = cartTotal > goldBalance
  const checkoutDisabled = cart.length === 0 || insufficientFunds

  return (
    <section className="page-section cart-page">
      <div className="section-heading">
        <p className="eyebrow">Your Cart</p>
        <h1>Your Cart</h1>
        <p>{cartCount} magical item{cartCount === 1 ? '' : 's'} waiting in your satchel.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {cart.length === 0 ? (
            <div className="empty-state">Your cart is empty. A wand somewhere is practicing a disappointed sparkle.</div>
          ) : (
            cart.map((item) => <CartItem key={item.wand.id} item={item} />)
          )}
          <Link className="text-link" to="/catalog">Continue Shopping</Link>
        </div>

        <aside className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Item count</span><strong>{cartCount}</strong></div>
          <div className="summary-row"><span>Subtotal</span><strong>{formatGold(cartSubtotal)}</strong></div>
          <div className="summary-row"><span>Tax (10%)</span><strong>{formatGold(tax)}</strong></div>
          <div className="summary-row grand-total"><span>Grand total</span><strong>{formatGold(cartTotal)}</strong></div>
          <GoldBalance />
          {insufficientFunds && <p className="warning">Insufficient funds: Fizban accepts gold, not dramatic promises.</p>}
          {checkoutDisabled ? (
            <button className="button primary" type="button" disabled>Proceed to Checkout</button>
          ) : (
            <Link className="button primary" to="/checkout">Proceed to Checkout</Link>
          )}
        </aside>
      </div>
    </section>
  )
}
