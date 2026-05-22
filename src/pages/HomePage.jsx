import { Link } from 'react-router-dom'
import { wands } from '../data/wands.js'
import WandCard from '../components/WandCard.jsx'
import WandModal from '../components/WandModal.jsx'
import { useState } from 'react'

export default function HomePage() {
  const [selectedWand, setSelectedWand] = useState(null)
  const featuredWands = [
    wands.find((wand) => wand.id === 'good-007'),
    wands.find((wand) => wand.id === 'neutral-007'),
    wands.find((wand) => wand.id === 'evil-004'),
  ]

  return (
    <>
      <section className="hero-section">
        <div className="star-field" aria-hidden="true"></div>
        <div className="hero-content">
          <p className="eyebrow">Est. in the Age of Mortals · Master Wandcrafter</p>
          <h1>Fizban's Wands</h1>
          <p>
            Whimsical implements for brave heroes, practical wanderers, and customers who promise they are not plotting
            anything too catastrophic.
          </p>
          <Link className="button primary hero-cta" to="/catalog">Browse the Collection</Link>
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <p className="eyebrow">Featured relics</p>
          <h2>One wand from every moral weather pattern</h2>
        </div>
        <div className="wand-grid featured-grid">
          {featuredWands.map((wand) => <WandCard key={wand.id} wand={wand} onDetails={setSelectedWand} />)}
        </div>
      </section>

      <section className="page-section feature-panel">
        <div className="feature-card">
          <h3>Authentically Enchanted</h3>
          <p>Every wand is inspected by Fizban, a brass owl, and one nervous apprentice with excellent handwriting.</p>
        </div>
        <div className="feature-card">
          <h3>Satisfaction Guaranteed</h3>
          <p>If your wand does not sparkle, hum, warn, glow, or complain, bring it back within seven moons.</p>
        </div>
        <div className="feature-card">
          <h3>Ancient Craftsmanship</h3>
          <p>Rowan, ebony, crystal ash, dragon heartstrings, and other questionable materials are shaped with care.</p>
        </div>
      </section>

      <section className="page-section testimonials">
        <div className="section-heading">
          <p className="eyebrow">Testimonials</p>
          <h2>Kind words from suspiciously alive customers</h2>
        </div>
        <blockquote>“My Sunbrand made the crypt glow and my companions stop screaming.” <cite>— Sir Loras of the Lantern Road</cite></blockquote>
        <blockquote>“Shimmer was worth every coin and only stole two spoons.” <cite>— Merra Quickpocket</cite></blockquote>
        <blockquote>“Voidtouched is perfect. Please stop asking where I got it.” <cite>— Anonymous in a hood</cite></blockquote>
      </section>

      <WandModal wand={selectedWand} onClose={() => setSelectedWand(null)} />
    </>
  )
}
