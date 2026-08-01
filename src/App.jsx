import { useState } from 'react'
import './App.css'
import { Cart } from './components/cart'
import { CartToggleButton } from './components/cartToggleButton'
import { FilterSelect } from './components/filterSelect'
import { ProductGrid } from './components/productGrid'
import { SearchBar } from './components/searchBar'
import { products } from './components/product'
// ======================
// Datos de la tienda
// ======================


function App() {
  // ======================
  // Estado del carrito
  // ======================
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  // ======================
  // Estado de búsqueda y filtros
  // ======================
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

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
  }

  const buyCart = () => {
    alert('Gracias por tu compra!')
    setCartItems([])
    setCartOpen(false)
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // ======================
  // Filtro de productos
  // ======================
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || product.category === category
    return matchesSearch && matchesCategory
  })

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
      <CartToggleButton totalUnits={totalUnits} onOpen={() => setCartOpen(true)} />

      {/* ====================== */}
      {/* Panel del carrito */}
      {/* ====================== */}
      {cartOpen && (
        <Cart
          items={cartItems}
          total={total}
          onClose={() => setCartOpen(false)}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onClear={clearCart}
          onBuy={buyCart}
        />
      )}
    </main>
  )
}

export default App

//El archivo jsx de App.jsx es el archivo principal de la app, importa todos los componentes que se van a usar en la app y los renderiza.

//El comando para activar npm en el repositorio es: npm run dev
//Quitear npm con: q