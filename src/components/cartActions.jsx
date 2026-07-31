import { Button } from './button'

export const CartActions = ({ onClearCart, onBuyCart }) => {
  return (
    <div className="cart-actions">
      <Button text="Vaciar carrito" className="secondary-button" onClick={onClearCart} />
      <Button text="Comprar" className="primary-button" onClick={onBuyCart} />
    </div>
  )
}
