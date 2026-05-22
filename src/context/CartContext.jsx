import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { clampQuantity, getCartCount, getCartSubtotal, getCartTotal, getTax } from '../utils/cartMath.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('fizban_cart', [])

  const addToCart = (wand, quantity = 1) => {
    const requestedQuantity = clampQuantity(quantity)
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.wand.id === wand.id)
      if (!existingItem) {
        return [...currentCart, { wand, quantity: requestedQuantity }]
      }

      return currentCart.map((item) =>
        item.wand.id === wand.id ? { ...item, quantity: clampQuantity(item.quantity + requestedQuantity) } : item,
      )
    })
  }

  const removeFromCart = (wandId) => {
    setCart((currentCart) => currentCart.filter((item) => item.wand.id !== wandId))
  }

  const updateQuantity = (wandId, quantity) => {
    setCart((currentCart) =>
      currentCart.map((item) => (item.wand.id === wandId ? { ...item, quantity: clampQuantity(quantity) } : item)),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const cartSubtotal = getCartSubtotal(cart)
  const tax = getTax(cartSubtotal)
  const cartTotal = getCartTotal(cart)
  const cartCount = getCartCount(cart)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartSubtotal, tax, cartTotal, cartCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
