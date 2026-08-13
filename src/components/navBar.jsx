import { NavLink } from 'react-router-dom'

export const NavBar = () => {
  return (
    <nav className="main-nav" aria-label="Navegación principal">
      <NavLink className="nav-link" to="/">Catálogo</NavLink>
      <NavLink className="nav-link" to="/carrito">Carrito</NavLink>
      <NavLink className="nav-link" to="/checkout">Checkout</NavLink>
    </nav>
  )
}
