import { useState } from 'react'
import AlignmentFilter from '../components/AlignmentFilter.jsx'
import WandCard from '../components/WandCard.jsx'
import WandModal from '../components/WandModal.jsx'
import { rarityRank, wands } from '../data/wands.js'

export default function CatalogPage() {
  const [alignment, setAlignment] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [selectedWand, setSelectedWand] = useState(null)

  const counts = {
    All: wands.length,
    Good: wands.filter((wand) => wand.alignment === 'Good').length,
    Neutral: wands.filter((wand) => wand.alignment === 'Neutral').length,
    Evil: wands.filter((wand) => wand.alignment === 'Evil').length,
  }

  const filteredWands = alignment === 'All' ? wands : wands.filter((wand) => wand.alignment === alignment)
  const sortedWands = [...filteredWands].sort((first, second) => {
    if (sortBy === 'price-low') return first.price - second.price
    if (sortBy === 'price-high') return second.price - first.price
    if (sortBy === 'rarity') return rarityRank[second.rarity] - rarityRank[first.rarity] || first.name.localeCompare(second.name)
    return first.name.localeCompare(second.name)
  })

  return (
    <>
      <section className="catalog-header page-section">
        <div>
          <p className="eyebrow">The Collection</p>
          <h1>The Collection</h1>
          <p>Browse 36 handcrafted wands by alignment, price, rarity, and name.</p>
        </div>
        <div className="catalog-controls">
          <AlignmentFilter activeAlignment={alignment} counts={counts} onChange={setAlignment} />
          <label className="sort-control">
            Sort
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="name">Name</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rarity">Rarity</option>
            </select>
          </label>
        </div>
      </section>
      <section className="wand-grid catalog-grid">
        {sortedWands.map((wand) => <WandCard key={wand.id} wand={wand} onDetails={setSelectedWand} />)}
      </section>
      <WandModal wand={selectedWand} onClose={() => setSelectedWand(null)} />
    </>
  )
}
