import { formatGold } from '../utils/formatGold.js'
import WandPlaceholder from './WandPlaceholder.jsx'

export default function MagicalReceipt({ order }) {
  return (
    <section className="magical-receipt">
      <div>
        <p className="eyebrow">📜 Magical Delivery Parchment</p>
        <h2>Dispatched via enchanted owl post</h2>
        <p>Your wand(s) have been dispatched via enchanted owl post.</p>
      </div>
      <div className="receipt-meta">
        <span>Order {order.orderNumber}</span>
        <span>{new Date(order.date).toLocaleString()}</span>
        <span>Traveler: {order.customer.name}</span>
      </div>
      <div className="receipt-items">
        {order.items.map((item) => (
          <article className="receipt-item" key={item.wand.id}>
            <WandPlaceholder wand={item.wand} />
            <div>
              <h3>{item.wand.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <strong>{formatGold(item.wand.price * item.quantity)} paid</strong>
            </div>
          </article>
        ))}
      </div>
      <div className="receipt-footer-row">
        <div className="wax-seal">M</div>
        <p>Expected arrival: 3–5 owl post days</p>
        <strong>Total paid: {formatGold(order.total)}</strong>
      </div>
    </section>
  )
}
