import { useEffect, useState } from 'react'
import { alignments, wands } from './data/wands.js'
import { addToCart, canCheckout, createOrder, getCartItems, getCartTotal, STARTING_BALANCE, updateQuantity } from './lib/cart.js'

const storageKeys = {
  cart: 'fizbans-wands-cart',
  balance: 'fizbans-wands-balance',
  orders: 'fizbans-wands-orders',
}

function loadStoredValue(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export default function App() {
  const [view, setView] = useState('home')
  const [filter, setFilter] = useState('All')
  const [selectedWand, setSelectedWand] = useState(null)
  const [cart, setCart] = useState(() => loadStoredValue(storageKeys.cart, []))
  const [balance, setBalance] = useState(() => loadStoredValue(storageKeys.balance, STARTING_BALANCE))
  const [orders, setOrders] = useState(() => loadStoredValue(storageKeys.orders, []))
  const [checkoutMessage, setCheckoutMessage] = useState('')

  const featuredWands = wands.filter((wand) => wand.rarity === 'Legendary').slice(0, 3)
  const visibleWands = filter === 'All' ? wands : wands.filter((wand) => wand.alignment === filter)
  const cartItems = getCartItems(cart, wands)
  const cartTotal = getCartTotal(cart, wands)
  const latestOrder = orders[0]

  useEffect(() => {
    localStorage.setItem(storageKeys.cart, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem(storageKeys.balance, JSON.stringify(balance))
  }, [balance])

  useEffect(() => {
    localStorage.setItem(storageKeys.orders, JSON.stringify(orders))
  }, [orders])

  function handleAddToCart(id) {
    setCart((current) => addToCart(current, id))
    setCheckoutMessage('Added to cart. Fizban approves, cautiously.')
  }

  function handleCheckout() {
    if (!canCheckout(balance, cart, wands)) {
      setCheckoutMessage(cart.length === 0 ? 'Your satchel is empty.' : 'Insufficient gold for this enchantment.')
      return
    }

    const order = createOrder(balance, cart, wands)
    setBalance(order.remainingBalance)
    setOrders((current) => [order, ...current])
    setCart([])
    setView('receipt')
    setCheckoutMessage('Magical delivery receipt conjured.')
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={() => setView('home')}>
          <span className="brand-mark">F</span>
          <span>
            <strong>Fizban's Wands</strong>
            <small>Arcane Implements Since Year 0-ish</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <button className={view === 'home' ? 'active' : ''} onClick={() => setView('home')}>Home</button>
          <button className={view === 'catalog' ? 'active' : ''} onClick={() => setView('catalog')}>Catalog</button>
          <button className={view === 'cart' ? 'active' : ''} onClick={() => setView('cart')}>Cart ({cartItems.length})</button>
          <button className={view === 'receipt' ? 'active' : ''} onClick={() => setView('receipt')}>Receipts</button>
        </nav>
        <div className="coin-purse" aria-label={`Gold balance ${balance} gold pieces`}>
          {balance}gp
        </div>
      </header>

      <main>
        {view === 'home' && (
          <>
            <section className="hero">
              <div>
                <p className="eyebrow">Grand opening on the Astral High Street</p>
                <h1>Choose a wand before the wand chooses someone louder.</h1>
                <p>
                  Browse 36 enchanted wands sorted by Good, Neutral, and Evil alignments. Every purchase starts from a
                  1,000gp adventurer balance and arrives with a simulated magical delivery receipt.
                </p>
                <div className="hero-actions">
                  <button className="primary" onClick={() => setView('catalog')}>Enter the Catalog</button>
                  <button className="secondary" onClick={() => setView('cart')}>Review Cart</button>
                </div>
              </div>
              <aside className="hero-card">
                <span>Today's Omen</span>
                <strong>{wands.length} wands inventoried</strong>
                <p>Good for rescuers, Neutral for scholars, Evil for shoppers with questionable references.</p>
              </aside>
            </section>

            <section className="section-heading">
              <p className="eyebrow">Featured relics</p>
              <h2>Fizban's most dramatic recommendations</h2>
            </section>
            <WandGrid wands={featuredWands} onAdd={handleAddToCart} onDetails={setSelectedWand} />
          </>
        )}

        {view === 'catalog' && (
          <>
            <section className="catalog-head">
              <div>
                <p className="eyebrow">Catalog</p>
                <h1>All Wands</h1>
                <p>Filter by alignment and inspect wood, core, temperament, rarity, and magical effect.</p>
              </div>
              <div className="filters" aria-label="Filter by alignment">
                {alignments.map((alignment) => (
                  <button key={alignment} className={filter === alignment ? 'active' : ''} onClick={() => setFilter(alignment)}>
                    {alignment}
                  </button>
                ))}
              </div>
            </section>
            <WandGrid wands={visibleWands} onAdd={handleAddToCart} onDetails={setSelectedWand} />
          </>
        )}

        {view === 'cart' && (
          <section className="cart-panel">
            <div>
              <p className="eyebrow">Checkout</p>
              <h1>Cart and Gold Ledger</h1>
              <p>Starting balance is 1,000gp. Purchases deduct immediately and persist in this browser.</p>
            </div>
            {cartItems.length === 0 ? (
              <div className="empty-state">Your cart is empty. A lonely wand somewhere is sighing.</div>
            ) : (
              <div className="cart-list">
                {cartItems.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.alignment} alignment - {item.price}gp each</p>
                    </div>
                    <label>
                      Qty
                      <input
                        min="0"
                        type="number"
                        value={item.quantity}
                        onChange={(event) => setCart((current) => updateQuantity(current, item.id, Number(event.target.value)))}
                      />
                    </label>
                    <strong>{item.lineTotal}gp</strong>
                    <button className="ghost" onClick={() => setCart((current) => updateQuantity(current, item.id, 0))}>Remove</button>
                  </article>
                ))}
              </div>
            )}
            <div className="checkout-box">
              <span>Cart total: <strong>{cartTotal}gp</strong></span>
              <span>Balance after purchase: <strong>{Math.max(balance - cartTotal, 0)}gp</strong></span>
              <button className="primary" onClick={handleCheckout}>Complete Checkout</button>
            </div>
            {checkoutMessage && <p className="message">{checkoutMessage}</p>}
          </section>
        )}

        {view === 'receipt' && (
          <section className="receipt-panel">
            <div>
              <p className="eyebrow">Magical delivery</p>
              <h1>Order Confirmation</h1>
              <p>Receipts are saved locally with wand images for easy owl post inspection.</p>
            </div>
            {!latestOrder ? (
              <div className="empty-state">No receipts yet. Complete checkout to summon one.</div>
            ) : (
              <article className="receipt">
                <div className="receipt-stamp">Delivered by impatient pseudodragon</div>
                <h2>Receipt {latestOrder.id}</h2>
                <p>{new Date(latestOrder.createdAt).toLocaleString()}</p>
                <div className="receipt-grid">
                  {latestOrder.items.map((item) => (
                    <div className="receipt-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <strong>{item.name}</strong>
                      <span>{item.quantity} x {item.price}gp</span>
                    </div>
                  ))}
                </div>
                <footer>
                  <span>Total paid: {latestOrder.total}gp</span>
                  <span>Remaining balance: {latestOrder.remainingBalance}gp</span>
                </footer>
              </article>
            )}
          </section>
        )}
      </main>

      {selectedWand && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelectedWand(null)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="wand-title" onClick={(event) => event.stopPropagation()}>
            <button className="close" aria-label="Close wand details" onClick={() => setSelectedWand(null)}>x</button>
            <img src={selectedWand.image} alt={selectedWand.name} />
            <p className="eyebrow">{selectedWand.alignment} - {selectedWand.rarity}</p>
            <h2 id="wand-title">{selectedWand.name}</h2>
            <dl>
              <div><dt>Wood</dt><dd>{selectedWand.wood}</dd></div>
              <div><dt>Core</dt><dd>{selectedWand.core}</dd></div>
              <div><dt>Length</dt><dd>{selectedWand.length}</dd></div>
              <div><dt>Temperament</dt><dd>{selectedWand.temperament}</dd></div>
            </dl>
            <p>{selectedWand.power}</p>
            <button className="primary" onClick={() => handleAddToCart(selectedWand.id)}>Add for {selectedWand.price}gp</button>
          </section>
        </div>
      )}
    </div>
  )
}

function WandGrid({ wands: catalog, onAdd, onDetails }) {
  return (
    <div className="wand-grid">
      {catalog.map((wand) => (
        <article className={`wand-card ${wand.alignment.toLowerCase()}`} key={wand.id}>
          <img src={wand.image} alt={wand.name} />
          <div className="wand-body">
            <span className="badge">{wand.alignment}</span>
            <h3>{wand.name}</h3>
            <p>{wand.power}</p>
            <div className="card-meta">
              <span>{wand.wood}</span>
              <strong>{wand.price}gp</strong>
            </div>
            <div className="card-actions">
              <button className="secondary" onClick={() => onDetails(wand)}>Details</button>
              <button className="primary" onClick={() => onAdd(wand.id)}>Add</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
