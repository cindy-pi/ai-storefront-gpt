import { useCart } from '../context/CartContext.jsx'
import { formatGold } from '../utils/formatGold.js'
import WandPlaceholder from './WandPlaceholder.jsx'

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart()
  const { wand, quantity } = item

  return (
    <article className="cart-item">
      <WandPlaceholder wand={wand} small />
      <div>
        <h3>{wand.name}</h3>
        <p>{wand.alignment} alignment</p>
      </div>
      <span>{formatGold(wand.price)} each</span>
      <div className="quantity-stepper" aria-label={`Quantity for ${wand.name}`}>
        <button type="button" onClick={() => (quantity === 1 ? removeFromCart(wand.id) : updateQuantity(wand.id, quantity - 1))}>−</button>
        <strong>{quantity}</strong>
        <button type="button" onClick={() => updateQuantity(wand.id, quantity + 1)} disabled={quantity >= 10}>+</button>
      </div>
      <strong>{formatGold(wand.price * quantity)}</strong>
      <button className="remove-button" type="button" aria-label={`Remove ${wand.name}`} onClick={() => removeFromCart(wand.id)}>🗑</button>
    </article>
  )
}
