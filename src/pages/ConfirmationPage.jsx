import { Link, useLocation } from 'react-router-dom'
import GoldBalance from '../components/GoldBalance.jsx'
import MagicalReceipt from '../components/MagicalReceipt.jsx'
import { useShop } from '../context/ShopContext.jsx'

export default function ConfirmationPage() {
  const location = useLocation()
  const { purchaseHistory } = useShop()
  const order = purchaseHistory.find((item) => item.orderNumber === location.state?.orderNumber) ?? purchaseHistory[0]

  return (
    <section className="page-section confirmation-page">
      <div className="section-heading centered">
        <p className="eyebrow">Order Confirmation</p>
        <h1>✨ Your Order is Complete! ✨</h1>
        {order && <p>Order {order.orderNumber} · {new Date(order.date).toLocaleDateString()} · {order.customer.name}</p>}
      </div>
      {order ? (
        <>
          <MagicalReceipt order={order} />
          <GoldBalance />
          <div className="confirmation-actions">
            <Link className="button primary" to="/catalog">Shop More Wands</Link>
            <button
              className="button secondary"
              type="button"
              onClick={() => document.getElementById('purchase-history')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Purchase History
            </button>
          </div>
          <section id="purchase-history" className="purchase-history panel-card">
            <h2>Purchase History</h2>
            {purchaseHistory.map((historyOrder) => (
              <div className="history-row" key={historyOrder.orderNumber}>
                <span>{historyOrder.orderNumber}</span>
                <span>{historyOrder.items.length} wand type{historyOrder.items.length === 1 ? '' : 's'}</span>
                <strong>{new Date(historyOrder.date).toLocaleDateString()}</strong>
              </div>
            ))}
          </section>
        </>
      ) : (
        <div className="empty-state">
          <p>No magical receipt has been conjured yet.</p>
          <Link className="button primary" to="/catalog">Find a Wand</Link>
        </div>
      )}
    </section>
  )
}
