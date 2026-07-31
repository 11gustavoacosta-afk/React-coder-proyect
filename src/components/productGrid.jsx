import { ProductCard } from './product'

export const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <section className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </section>
  )
}
