import { describe, expect, it } from 'vitest'
import { filterProducts, formatPrice } from './helpers'

describe('helpers', () => {
  it('formatea precios con dos decimales y símbolo de moneda', () => {
    expect(formatPrice(129.99)).toBe('$129.99')
  })

  it('filtra productos por texto y categoría', () => {
    const products = [
      { id: 'p1', name: 'RTX 4070', category: 'graficas', price: 649 },
      { id: 'p2', name: 'Kingston RAM 32GB', category: 'ram', price: 140 },
    ]

    expect(filterProducts(products, 'rtx', 'all')).toHaveLength(1)
    expect(filterProducts(products, '', 'ram')).toHaveLength(1)
  })
})
