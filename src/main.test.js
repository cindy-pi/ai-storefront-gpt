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
