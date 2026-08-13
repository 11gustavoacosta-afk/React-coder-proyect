import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import './App.css'
import { Cart } from './components/cart'
import { CartToggleButton } from './components/cartToggleButton'
import { CheckoutForm } from './components/checkoutForm'
import { ItemDetailContainer } from './components/itemDetailContainer'
import { ItemListContainer } from './components/itemListContainer'
import { NavBar } from './components/navBar'
import { CartProvider, useCart } from './context/cartContext'

function CatalogPage() {
  const { category } = useParams()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(category || 'all')
  const { addToCart } = useCart()

  const activeCategory = category || selectedCategory

  return (
    <ItemListContainer
      search={search}
      category={activeCategory}
      onSearchChange={setSearch}
      onCategoryChange={setSelectedCategory}
      onAddToCart={addToCart}
    />
  )
}

function CartPage() {
  const navigate = useNavigate()
  const {
    cartItems,
    total,
    purchaseStatus,
    purchaseMessage,
    orders,
    addToCart,
    removeFromCart,
    clearCart,
    cancelOrder,
    setCartOpen,
    setCurrentView,
  } = useCart()

  return (
    <div className="page-shell">
      <Cart
        items={cartItems}
        total={total}
        onClose={() => {
          setCartOpen(false)
          setCurrentView('catalog')
          navigate('/')
        }}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onClear={clearCart}
        onBuy={() => {
          setCurrentView('checkout')
          navigate('/checkout')
        }}
        purchaseMessage={purchaseMessage}
        purchaseStatus={purchaseStatus}
        orders={orders}
        onCancelOrder={cancelOrder}
      />
    </div>
  )
}

function CheckoutPage() {
  const navigate = useNavigate()
  const {
    completePurchase,
    purchaseStatus,
    purchaseMessage,
    setPurchaseStatus,
    setPurchaseMessage,
    setCartOpen,
    setCurrentView,
  } = useCart()

  return (
    <div className="page-shell">
      <CheckoutForm
        onSubmit={async (values) => {
          const completed = await completePurchase(values)
          if (completed) {
            setCurrentView('catalog')
            setCartOpen(false)
            navigate('/')
          }
        }}
        onCancel={() => {
          setPurchaseStatus('idle')
          setPurchaseMessage('')
          setCartOpen(false)
          setCurrentView('catalog')
          navigate('/')
        }}
        status={purchaseStatus}
        message={purchaseMessage}
      />
    </div>
  )
}

function AppContent() {
  const {
    totalUnits,
    setCartOpen,
    setCurrentView,
  } = useCart()
  const navigate = useNavigate()

  return (
    <main>
      {/* ====================== */}
      {/* Encabezado y navegación */}
      {/* ====================== */}
      <NavBar />

      <header>
        <div className="title-container">
          <h1 className="title">TechStore</h1>
          <p className="subtitle">Tecnología para tu día a día</p>
        </div>
        <div className="banner">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
            alt="Tecnología moderna"
          />
        </div>
      </header>

      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/categoria/:category" element={<CatalogPage />} />
        <Route path="/producto/:id" element={<ItemDetailContainer />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>

      <CartToggleButton
        totalUnits={totalUnits}
        onOpen={() => {
          setCartOpen(true)
          setCurrentView('cart')
          navigate('/carrito')
        }}
      />
    </main>
  )
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App

//El archivo App.jsx es el punto de entrada de la UI y centraliza la navegación de la tienda.
//El comando para activar la app es: npm run dev
//Salir del servidor con: q