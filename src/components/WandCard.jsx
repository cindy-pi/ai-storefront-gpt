import { useCart } from '../context/CartContext.jsx'
import { formatGold } from '../utils/formatGold.js'
import WandPlaceholder from './WandPlaceholder.jsx'

export default function WandCard({ wand, onDetails }) {
  const { addToCart } = useCart()

  return (
    <article className={`wand-card ${wand.alignment.toLowerCase()}`}>
      <WandPlaceholder wand={wand} />
      <div className="wand-card-body">
        <div className="badge-row">
          <span className={`alignment-badge ${wand.alignment.toLowerCase()}`}>{wand.alignment}</span>
          <span className={`rarity-badge rarity-${wand.rarity.toLowerCase().replaceAll(' ', '-')}`}>{wand.rarity}</span>
        </div>
        <h3>{wand.name}</h3>
        <p>{wand.description.slice(0, 128)}...</p>
        <strong className="price">🪙 {formatGold(wand.price)}</strong>
        <div className="card-actions">
          <button className="button secondary" type="button" onClick={() => onDetails(wand)}>Details</button>
          <button className="button primary" type="button" onClick={() => addToCart(wand)}>Add to Cart</button>
        </div>
      </div>
    </article>
  )
}
