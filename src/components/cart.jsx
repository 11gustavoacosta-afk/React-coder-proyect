import { Button } from './button'
import { CartActions } from './cartActions'
import { CartItem } from './cartItem'

export const Cart = ({ items, total, onClose, onAdd, onRemove, onClear, onBuy }) => {
  return (
    <section className="cart-panel">
      <div className="cart-panel-header">
        <h2>Carrito de compras</h2>
        <Button text="X" className="close-cart" onClick={onClose} />
      </div>

      <div className="cart-panel-body">
        {items.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          items.map((item) => (
            <CartItem key={item.id} item={item} onAdd={onAdd} onRemove={onRemove} />
          ))
        )}
      </div>

      <div className="cart-panel-footer">
        <p>Total: ${total.toFixed(2)}</p>
        <CartActions onClearCart={onClear} onBuyCart={onBuy} />
      </div>
    </section>
  )
}
