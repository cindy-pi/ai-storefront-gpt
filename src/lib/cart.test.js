import { describe, expect, it } from 'vitest'
import { addToCart, canCheckout, createOrder, getCartTotal, updateQuantity } from './cart.js'

const products = [
  { id: 'oak', price: 120 },
  { id: 'ash', price: 250 },
]

describe('cart helpers', () => {
  it('addToCart existing wand increases quantity', () => {
    expect(addToCart([{ id: 'oak', quantity: 1 }], 'oak')).toEqual([{ id: 'oak', quantity: 2 }])
  })

  it('updateQuantity zero quantity removes the item', () => {
    expect(updateQuantity([{ id: 'oak', quantity: 1 }], 'oak', 0)).toEqual([])
  })

  it('getCartTotal multiple items returns gold total', () => {
    expect(
      getCartTotal(
        [
          { id: 'oak', quantity: 2 },
          { id: 'ash', quantity: 1 },
        ],
        products,
      ),
    ).toBe(490)
  })

  it('canCheckout insufficient balance blocks purchase', () => {
    expect(canCheckout(100, [{ id: 'ash', quantity: 1 }], products)).toBe(false)
  })

  it('createOrder valid cart deducts gold and keeps receipt items', () => {
    const order = createOrder(500, [{ id: 'ash', quantity: 1 }], products)

    expect(order.total).toBe(250)
    expect(order.remainingBalance).toBe(250)
    expect(order.items).toHaveLength(1)
  })
})
