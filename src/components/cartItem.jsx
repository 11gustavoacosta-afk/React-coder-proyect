import { Button } from './button'

export const CartItem = ({ item, onAdd, onRemove }) => {
  return (
    <li className="cart-item">
      <div>
        <strong>{item.name}</strong>
        <p>
          {item.quantity} × ${item.price.toFixed(2)}
        </p>
      </div>

      <div className="cart-item-actions">
        <Button text="-" className="secondary-button" onClick={() => onRemove(item.id)} />
        <Button text="+" className="primary-button" onClick={() => onAdd(item)} />
      </div>
    </li>
  )
}
