import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('app context wiring', () => {
  it('src/main.jsx wraps App with shop and cart providers', () => {
    const mainSource = readFileSync(new URL('./main.jsx', import.meta.url), 'utf8')

    expect(mainSource).toContain("import { ShopProvider } from './context/ShopContext.jsx'")
    expect(mainSource).toContain("import { CartProvider } from './context/CartContext.jsx'")
    expect(mainSource).toMatch(/<ShopProvider>\s*<CartProvider>\s*<App \/>\s*<\/CartProvider>\s*<\/ShopProvider>/)
  })
})

describe('ui polish requirements', () => {
  it('index.html loads the fantasy Google Fonts with required weights and styles', () => {
    const htmlSource = readFileSync(new URL('../index.html', import.meta.url), 'utf8')

    expect(htmlSource).toContain('<link rel="preconnect" href="https://fonts.googleapis.com" />')
    expect(htmlSource).toContain('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />')
    expect(htmlSource).toContain(
      'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap',
    )
  })

  it('src/index.css keeps the catalog grid responsive from desktop to mobile', () => {
    const cssSource = readFileSync(new URL('./index.css', import.meta.url), 'utf8')

    expect(cssSource).toContain('.catalog-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }')
    expect(cssSource).toContain('.catalog-grid, .wand-grid, .feature-panel, .receipt-items { grid-template-columns: repeat(2, minmax(0, 1fr)); }')
    expect(cssSource).toContain('.catalog-grid, .wand-grid, .feature-panel, .receipt-items, .receipt-item, .wand-specs { grid-template-columns: 1fr; }')
  })

  it('WandPlaceholder uses wand color and id-seeded SVG definitions', () => {
    const placeholderSource = readFileSync(new URL('./components/WandPlaceholder.jsx', import.meta.url), 'utf8')

    expect(placeholderSource).toContain("wand.id.split('').reduce")
    expect(placeholderSource).toContain('stopColor={wand.color}')
    expect(placeholderSource).toContain('fill={wand.color}')
    expect(placeholderSource).toContain('<g fill={sparkleColor}')
  })
})
