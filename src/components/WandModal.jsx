import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { formatGold } from '../utils/formatGold.js'
import WandPlaceholder from './WandPlaceholder.jsx'

export default function WandModal({ wand, onClose }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  if (!wand) {
    return null
  }

  const addSelection = () => {
    addToCart(wand, quantity)
    onClose()
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="wand-modal-title" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" aria-label="Close wand details" type="button" onClick={onClose}>×</button>
        <div className="modal-grid">
          <WandPlaceholder wand={wand} />
          <div>
            <div className="badge-row">
              <span className={`alignment-badge ${wand.alignment.toLowerCase()}`}>{wand.alignment}</span>
              <span className={`rarity-badge rarity-${wand.rarity.toLowerCase().replaceAll(' ', '-')}`}>{wand.rarity}</span>
            </div>
            <h2 id="wand-modal-title">{wand.name}</h2>
            <p>{wand.description}</p>
            <strong className="price">🪙 {formatGold(wand.price)}</strong>
            <dl className="wand-specs">
              <div><dt>Wood</dt><dd>{wand.wood}</dd></div>
              <div><dt>Core</dt><dd>{wand.core}</dd></div>
              <div><dt>Length</dt><dd>{wand.length}</dd></div>
            </dl>
          </div>
        </div>
        <div className="properties-panel">
          <h3>Magical Properties</h3>
          <ul className="spark-list">
            {wand.magicalProperties.map((property) => <li key={property}>✦ {property}</li>)}
          </ul>
        </div>
        <div className="modal-actions">
          <label>
            Quantity
            <select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
              {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <button className="button primary" type="button" onClick={addSelection}>Add to Cart</button>
        </div>
      </section>
    </div>
  )
}
