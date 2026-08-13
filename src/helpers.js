export const formatPrice = (value = 0) => `$${Number(value).toFixed(2)}`

export const getBaseStock = (product) => {
  const parsed = Number(product?.stock ?? 100)
  return Number.isFinite(parsed) && parsed > 0 ? 100 : 0
}

export const getAvailableStock = (product, cartItems = []) => {
  const baseStock = getBaseStock(product)
  const cartQuantity = cartItems.find((item) => String(item.id) === String(product?.id))?.quantity ?? 0

  return Math.max(0, baseStock - cartQuantity)
}

export const filterProducts = (products = [], search = '', category = 'all') => {
  const term = search.trim().toLowerCase()

  return products.filter((product) => {
    const matchesSearch =
      term.length === 0 || product.name.toLowerCase().includes(term)

    const matchesCategory = category === 'all' || product.category === category

    return matchesSearch && matchesCategory
  })
}
