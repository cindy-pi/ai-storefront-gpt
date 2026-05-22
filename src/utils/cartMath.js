export const TAX_RATE = 0.1

export function clampQuantity(quantity) {
  const numericQuantity = Number(quantity)
  if (!Number.isFinite(numericQuantity)) {
    return 1
  }
  return Math.min(10, Math.max(1, Math.floor(numericQuantity)))
}

export function getCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.wand.price * item.quantity, 0)
}

export function getTax(subtotal) {
  return Math.round(subtotal * TAX_RATE)
}

export function getCartTotal(cart) {
  const subtotal = getCartSubtotal(cart)
  return subtotal + getTax(subtotal)
}

export function getCartCount(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}
