import { useShop } from '../context/ShopContext.jsx'
import { formatGold } from '../utils/formatGold.js'

export default function GoldBalance({ compact = false }) {
  const { goldBalance } = useShop()

  return (
    <div className={compact ? 'gold-balance compact' : 'gold-balance'} aria-label={`Gold balance ${goldBalance} gold pieces`}>
      <span>🪙</span>
      <strong>{formatGold(goldBalance)}</strong>
    </div>
  )
}
