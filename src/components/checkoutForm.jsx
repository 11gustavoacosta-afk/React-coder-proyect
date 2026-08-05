import { useState } from 'react'
import { Button } from './button'

export const CheckoutForm = ({ onSubmit, onCancel, status, message }) => {
  // ======================
  // Estado local del formulario
  // ======================
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ customerName, customerEmail })
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h3>Finalizar compra</h3>
      <input
        type="text"
        placeholder="Tu nombre"
        value={customerName}
        onChange={(event) => setCustomerName(event.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Tu email"
        value={customerEmail}
        onChange={(event) => setCustomerEmail(event.target.value)}
        required
      />

      <div className="checkout-actions">
        <Button text="Cancelar" className="secondary-button" onClick={onCancel} />
        <Button text="Confirmar compra" className="primary-button" />
      </div>

      {status === 'loading' && <p className="checkout-status">Procesando tu pedido...</p>}
      {status === 'success' && <p className="checkout-success">{message}</p>}
      {status === 'error' && <p className="checkout-error">{message}</p>}
    </form>
  )
}
