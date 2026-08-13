import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProducts } from '../firebase'
import { useCart } from '../context/cartContext'
import { formatPrice, getAvailableStock } from '../helpers'
import { ItemCount } from './itemCount'

export const ItemDetailContainer = () => {
  const { id } = useParams()
  const { addToCart, cartItems } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadProduct = async () => {
      setLoading(true)
      const products = await fetchProducts()

      if (isMounted) {
        const match = products.find((item) => String(item.id) === String(id))
        setProduct(match ?? null)
        setLoading(false)
      }
    }

    loadProduct()

    return () => {
      isMounted = false
    }
  }, [id])

  const remainingStock = getAvailableStock(product, cartItems)

  const handleAdd = () => {
    if (!product) return

    if (quantity > remainingStock) {
      return
    }

    setAdded(true)
    addToCart(product, quantity)
  }

  if (loading) {
    return <p className="empty-state">Cargando detalle del producto...</p>
  }

  if (!product) {
    return <p className="empty-state">Producto no encontrado.</p>
  }

  return (
    <section className="product-detail">
      <div className="detail-card">
        <h2>{product.name}</h2>
        <p className="detail-category">Categoría: {product.category}</p>
        <p className="detail-price">{formatPrice(product.price)}</p>
        <p className="detail-stock">
          {remainingStock > 0 ? `Stock disponible: ${remainingStock}` : 'Producto sin stock'}
        </p>

        {remainingStock > 0 && !added ? (
          <ItemCount
            quantity={quantity}
            max={remainingStock}
            disabled={quantity > remainingStock}
            onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
            onIncrease={() => setQuantity((current) => Math.min(remainingStock, current + 1))}
            onAdd={handleAdd}
          />
        ) : null}

        {added ? (
          <p className="checkout-success">Producto agregado al carrito.</p>
        ) : null}

        <Link to="/" className="nav-link inline-link">
          Volver al catálogo
        </Link>
      </div>
    </section>
  )
}
