import { useMemo, useState } from 'react'
import './App.css'
import { Cart } from './components/cart'
import { CartToggleButton } from './components/cartToggleButton'
import { CheckoutForm } from './components/checkoutForm'
import { FilterSelect } from './components/filterSelect'
import { ProductGrid } from './components/productGrid'
import { SearchBar } from './components/searchBar'
import { CartProvider, useCart } from './context/cartContext'
import { products } from './components/product'
// ======================
// Datos de la tienda
// ======================

function AppContent() {
  // ======================
  // Estado del carrito y navegación
  // ======================
  const {
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
  } = useCart()

  // ======================
  // Estado de búsqueda y filtros
  // ======================
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  // ======================
  // Filtro de productos con memoización
  // ======================
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'all' || product.category === category
      return matchesSearch && matchesCategory
    })
  }, [search, category])

  return (
    <main>
      {/* ====================== */}
      {/* Encabezado y banner */}
      {/* ====================== */}
      <header>
        <div className="title-container">
          <h1 className="title">TechStore</h1>
          <p className="subtitle">Tecnología para tu día a día</p>
        </div>
        <div className="banner">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" alt="Tecnología moderna" />
        </div>
      </header>

      {/* ====================== */}
      {/* Barra de búsqueda y filtros */}
      {/* ====================== */}
      <section className="controls">
        <SearchBar
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onSearch={() => {}}
        />

        <FilterSelect value={category} onChange={(event) => setCategory(event.target.value)} />
      </section>

      {/* ====================== */}
      {/* Catálogo de productos */}
      {/* ====================== */}
      <ProductGrid products={filteredProducts} onAddToCart={addToCart} />

      {/* ====================== */}
      {/* Botón flotante del carrito */}
      {/* ====================== */}
      <CartToggleButton
        totalUnits={totalUnits}
        onOpen={() => {
          setCartOpen(true)
          setCurrentView('cart')
        }}
      />

      {/* ====================== */}
      {/* Panel del carrito y checkout */}
      {/* ====================== */}
      {currentView === 'cart' && cartOpen && (
        <Cart
          items={cartItems}
          total={total}
          onClose={() => {
            setCartOpen(false)
            setCurrentView('catalog')
          }}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onClear={clearCart}
          onBuy={() => setCurrentView('checkout')}
          purchaseMessage={purchaseMessage}
          purchaseStatus={purchaseStatus}
          orders={orders}
          onCancelOrder={cancelOrder}
        />
      )}

      {currentView === 'checkout' && (
        <CheckoutForm
          onSubmit={async (values) => {
            const completed = await completePurchase(values)
            if (completed) {
              setCurrentView('catalog')
              setCartOpen(false)
            }
          }}
          onCancel={() => {
            setPurchaseStatus('idle')
            setPurchaseMessage('')
            setCartOpen(false)
            setCurrentView('catalog')
          }}
          status={purchaseStatus}
          message={purchaseMessage}
        />
      )}
    </main>
  )
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}

export default App

//El archivo jsx de App.jsx es el archivo principal de la app, importa todos los componentes que se van a usar en la app y los renderiza.

//El comando para activar npm en el repositorio es: npm run dev
//Quitear npm con: q