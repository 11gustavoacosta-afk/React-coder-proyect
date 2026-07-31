import cartIcon from '../assets/carrito.png'

export const CartToggleButton = ({ totalUnits, onOpen }) => {
  return (
    <button className="cart-fab" onClick={onOpen}>
      <img src={cartIcon} alt="Carrito de compras" className="cart-icon" />
      <span className="cart-count">{totalUnits}</span>
    </button>
  )
}
