import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const ShopContext = createContext(null)
const STARTING_BALANCE = 1000

export function ShopProvider({ children }) {
  const [goldBalance, setGoldBalance] = useLocalStorage('fizban_balance', STARTING_BALANCE)
  const [purchaseHistory, setPurchaseHistory] = useLocalStorage('fizban_history', [])

  const deductGold = (amount) => {
    if (amount > goldBalance) {
      return false
    }
    setGoldBalance((currentBalance) => currentBalance - amount)
    return true
  }

  const addPurchase = (order) => {
    setPurchaseHistory((currentHistory) => [order, ...currentHistory])
  }

  return (
    <ShopContext.Provider value={{ goldBalance, deductGold, purchaseHistory, addPurchase }}>
      {children}
    </ShopContext.Provider>
  )
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop must be used within ShopProvider')
  }
  return context
}
