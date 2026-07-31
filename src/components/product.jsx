import { Button } from './button'

export const Product = ({ className, id, name, price, buttonText = 'Comprar', onAdd }) => {
  return (
    <div className={className} id={id}>
      <h2>{name}</h2>
      <ul>
        <li>
          <Button text={buttonText} className="primary-button" onClick={onAdd} />
        </li>
        <li>${price.toFixed(2)}</li>
      </ul>
    </div>
  )
}

export const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="prodCard">
      <h2>{product.name}</h2>
      <ul>
        <li>
          <Button text="Comprar" className="primary-button" onClick={() => onAddToCart(product)} />
        </li>
        <li>${product.price.toFixed(2)}</li>
      </ul>
    </div>
  )
}
