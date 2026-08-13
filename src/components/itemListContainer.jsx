import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProducts } from '../firebase'
import { useCart } from '../context/cartContext'
import { filterProducts, formatPrice, getAvailableStock } from '../helpers'
import { Button } from './button'

export const ItemListContainer = ({
  search,
  category,
  onSearchChange,
  onCategoryChange,
  onAddToCart,
}) => {
  const { category: categoryFromRoute } = useParams()
  const { cartItems } = useCart()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      setLoading(true)
      const data = await fetchProducts()

      if (isMounted) {
        setProducts(data)
        setLoading(false)
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  const activeCategory = category || categoryFromRoute || 'all'

  const filteredProducts = useMemo(
    () => filterProducts(products, search, activeCategory),
    [products, search, activeCategory],
  )

  return (
    <section className="catalog-section">
      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar producto"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        <select
          className="filter-select"
          value={activeCategory}
          onChange={(event) => {
            onCategoryChange?.(event.target.value)
          }}
        >
          <option value="all">Todos</option>
          <option value="graficas">Gráficas</option>
          <option value="ram">Memorias RAM</option>
          <option value="fuentes">Fuentes</option>
          <option value="carcasa">Carcasas</option>
          <option value="pantallas">Pantallas</option>
          <option value="almacenamiento">Almacenamiento</option>
        </select>
      </div>

      {loading ? (
        <p className="empty-state">Cargando productos...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="empty-state">No hay productos disponibles para ese filtro.</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const remainingStock = getAvailableStock(product, cartItems)

            return (
              <article key={product.id} className="prodCard">
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>{formatPrice(product.price)}</p>
                <p>Stock: {remainingStock}</p>

                <div className="product-actions">
                  <Link to={`/producto/${product.id}`} className="nav-link inline-link">
                    Ver detalle
                  </Link>
                  <Button
                    text={remainingStock > 0 ? 'Agregar' : 'Sin stock'}
                    className="primary-button"
                    onClick={() => remainingStock > 0 && onAddToCart(product, 1)}
                    disabled={remainingStock <= 0}
                  />
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
