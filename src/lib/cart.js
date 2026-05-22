export const STARTING_BALANCE = 1000

export function getCartTotal(cart, products) {
  return cart.reduce((sum, item) => {
    const product = products.find((wand) => wand.id === item.id)
    return product ? sum + product.price * item.quantity : sum
  }, 0)
}

export function getCartItems(cart, products) {
  return cart
    .map((item) => {
      const product = products.find((wand) => wand.id === item.id)
      return product ? { ...product, quantity: item.quantity, lineTotal: product.price * item.quantity } : null
    })
    .filter(Boolean)
}

export function addToCart(cart, id) {
  const existing = cart.find((item) => item.id === id)
  if (existing) {
    return cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
  }
  return [...cart, { id, quantity: 1 }]
}

export function updateQuantity(cart, id, quantity) {
  if (quantity <= 0) {
    return cart.filter((item) => item.id !== id)
  }
  return cart.map((item) => (item.id === id ? { ...item, quantity } : item))
}

export function canCheckout(balance, cart, products) {
  return cart.length > 0 && getCartTotal(cart, products) <= balance
}

export function createOrder(balance, cart, products) {
  const items = getCartItems(cart, products)
  const total = getCartTotal(cart, products)
  if (items.length === 0) {
    throw new Error('Cart is empty')
  }
  if (total > balance) {
    throw new Error('Insufficient gold')
  }

  return {
    id: `fizban-${Date.now()}`,
    createdAt: new Date().toISOString(),
    items,
    total,
    remainingBalance: balance - total,
  }
}
