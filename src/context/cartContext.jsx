import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { saveOrder } from '../firebase'

const CartContext = createContext(null)

const getStoredCart = () => {
  if (typeof window === 'undefined') {
    return []
  }

  const savedCart = window.localStorage.getItem('techstore-cart')
  return savedCart ? JSON.parse(savedCart) : []
}

export const CartProvider = ({ children }) => {
  // ======================
  // Estado global del carrito
  // ======================
  const [cartItems, setCartItems] = useState(getStoredCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [currentView, setCurrentView] = useState('catalog')
  const [purchaseStatus, setPurchaseStatus] = useState('idle')
  const [purchaseMessage, setPurchaseMessage] = useState('')
  const [orders, setOrders] = useState([])

  // ======================
  // Efectos de React para sincronizar datos
  // ======================
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('techstore-cart', JSON.stringify(cartItems))
    }
  }, [cartItems])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedOrders = window.localStorage.getItem('techstore-orders')
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders))
      }
    }
  }, [])

  useEffect(() => {
    document.title = cartItems.length > 0 ? `TechStore (${cartItems.length})` : 'TechStore'
  }, [cartItems])

  // ======================
  // Funciones del carrito
  // ======================
  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
    setPurchaseStatus('idle')
    setPurchaseMessage('')
  }

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => {
    setCartItems([])
    setPurchaseStatus('idle')
    setPurchaseMessage('')
  }

  const cancelOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId)
    setOrders(updatedOrders)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('techstore-orders', JSON.stringify(updatedOrders))
    }
  }

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  )

  const totalUnits = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  const completePurchase = async ({ customerName, customerEmail }) => {
    if (cartItems.length === 0) {
      setPurchaseStatus('error')
      setPurchaseMessage('Tu carrito está vacío.')
      return false
    }

    setPurchaseStatus('loading')
    setPurchaseMessage('Procesando tu pedido...')

    const order = {
      customerName,
      customerEmail,
      items: cartItems,
      total,
      createdAt: new Date().toISOString(),
    }

    try {
      const orderId = await Promise.race([
        saveOrder(order),
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('timeout')), 3000)
        }),
      ])

      const savedOrder = { id: orderId, ...order }
      const nextOrders = [savedOrder, ...orders]
      setOrders(nextOrders)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('techstore-orders', JSON.stringify(nextOrders))
      }

      setCartItems([])
      setCartOpen(false)
      setCurrentView('catalog')
      setPurchaseStatus('success')
      setPurchaseMessage(`Gracias ${customerName}. Tu compra fue registrada con el ID ${orderId}.`)
      return true
    } catch (error) {
      console.error('No se pudo guardar la compra', error)
      const fallbackOrder = { id: `local-${Date.now()}`, ...order }
      const nextOrders = [fallbackOrder, ...orders]
      setOrders(nextOrders)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('techstore-orders', JSON.stringify(nextOrders))
      }

      setCartItems([])
      setCartOpen(false)
      setCurrentView('catalog')
      setPurchaseStatus('error')
      setPurchaseMessage('No se pudo registrar la compra en Firebase, pero quedó guardada localmente.')
      return false
    }
  }

  const value = useMemo(
    () => ({
      cartItems,
      cartOpen,
      currentView,
      purchaseStatus,
      purchaseMessage,
      total,
      totalUnits,
      orders,
      addToCart,
      removeFromCart,
      clearCart,
      completePurchase,
      cancelOrder,
      setCartOpen,
      setCurrentView,
    }),
    [cartItems, cartOpen, currentView, purchaseStatus, purchaseMessage, total, totalUnits, orders],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider')
  }

  return context
}
