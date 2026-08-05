import { Button } from './button'
import { CartActions } from './cartActions'
import { CartItem } from './cartItem'

export const Cart = ({ items, total, onClose, onAdd, onRemove, onClear, onBuy, purchaseMessage, purchaseStatus, orders, onCancelOrder }) => {
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
        {purchaseStatus === 'success' && <p className="checkout-success">{purchaseMessage}</p>}
        {purchaseStatus === 'error' && <p className="checkout-error">{purchaseMessage}</p>}

        <div className="orders-section">
          <h3>Pedidos realizados</h3>
          {orders.length === 0 ? (
            <p>No hay pedidos todavía.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-card">
                <div>
                  <strong>{order.customerName}</strong>
                  <p>{order.items.length} productos</p>
                  <p>${order.total.toFixed(2)}</p>
                </div>
                <Button text="Cancelar" className="secondary-button" onClick={() => onCancelOrder(order.id)} />
              </div>
            ))
          )}
        </div>

        <CartActions onClearCart={onClear} onBuyCart={onBuy} />
      </div>
    </section>
  )
}
