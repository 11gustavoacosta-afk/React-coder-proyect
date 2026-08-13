import { Button } from './button'
import { CartActions } from './cartActions'
import { formatPrice } from '../helpers'

export const Cart = ({ items, total, onClose, onAdd, onRemove, onClear, onBuy, purchaseMessage, purchaseStatus, orders, onCancelOrder }) => {
  return (
    <section className="cart-page">
      <div className="cart-page-header">
        <h2>Carrito de compras</h2>
        {onClose && <Button text="X" className="close-cart" onClick={onClose} />}
      </div>

      {items.length === 0 ? (
        <p className="empty-state">Tu carrito está vacío.</p>
      ) : (
        <div className="cart-page-grid">
          {items.map((item) => (
            <article key={item.id} className="prodCard cart-product-card">
              <h3>{item.name}</h3>
              <p>{item.quantity} × {formatPrice(item.price)}</p>
              <p>Subtotal: {formatPrice(item.quantity * item.price)}</p>

              <div className="product-actions">
                <Button text="-" className="secondary-button" onClick={() => onRemove(item.id)} />
                <Button text="+" className="primary-button" onClick={() => onAdd(item)} />
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="cart-page-footer">
        <p>Total: {formatPrice(total)}</p>
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
                  <p>{formatPrice(order.total)}</p>
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
