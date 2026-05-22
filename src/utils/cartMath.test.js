import { describe, expect, it } from 'vitest'
import { clampQuantity, getCartCount, getCartSubtotal, getCartTotal, getTax } from './cartMath.js'

const cart = [
  { wand: { id: 'sunbrand', price: 450 }, quantity: 2 },
  { wand: { id: 'peaceweald', price: 130 }, quantity: 1 },
]

describe('cart math', () => {
  it('getCartSubtotal sums wand prices by quantity', () => {
    expect(getCartSubtotal(cart)).toBe(1030)
  })

  it('getTax applies rounded ten percent tax', () => {
    expect(getTax(555)).toBe(56)
  })

  it('getCartTotal includes subtotal and tax', () => {
    expect(getCartTotal(cart)).toBe(1133)
  })

  it('getCartCount returns the total quantity of wands', () => {
    expect(getCartCount(cart)).toBe(3)
  })

  it('clampQuantity keeps quantities between one and ten', () => {
    expect(clampQuantity(0)).toBe(1)
    expect(clampQuantity(14)).toBe(10)
    expect(clampQuantity('3')).toBe(3)
  })
})
