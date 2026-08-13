import { Button } from './button'

export const ItemCount = ({ quantity, max, onDecrease, onIncrease, onAdd, disabled = false }) => {
  return (
    <div className="item-count" aria-label="Selector de cantidad">
      <Button
        text="-"
        className="secondary-button"
        onClick={onDecrease}
      />
      <span>{quantity}</span>
      <Button
        text="+"
        className="primary-button"
        onClick={onIncrease}
      />
      <Button
        text="Agregar al carrito"
        className="primary-button"
        onClick={onAdd}
        disabled={disabled}
      />
    </div>
  )
}
