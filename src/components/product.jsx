import { Button } from './button'


export const products = [
  { id: 1, name: 'GeForce RTX 4070', category: 'graficas', price: 649.99 },
  { id: 2, name: 'Radeon RX 7700 XT', category: 'graficas', price: 499.99 },
  { id: 3, name: 'GeForce RTX 4060 Ti', category: 'graficas', price: 399.99 },
  { id: 4, name: 'Kingston 32GB DDR5', category: 'ram', price: 149.99 },
  { id: 5, name: 'Corsair Vengeance 16GB', category: 'ram', price: 89.99 },
  { id: 6, name: 'G.Skill Trident Z5 32GB', category: 'ram', price: 169.99 },
  { id: 7, name: 'Corsair 750W PSU', category: 'fuentes', price: 109.99 },
  { id: 8, name: 'be quiet! Pure Power 12M', category: 'fuentes', price: 129.99 },
  { id: 9, name: 'MSI MAG A750GL', category: 'fuentes', price: 99.99 },
  { id: 10, name: 'NZXT H7 Flow', category: 'carcasa', price: 129.99 },
  { id: 11, name: 'Lian Li Lancool 205', category: 'carcasa', price: 89.99 },
  { id: 12, name: 'Fractal Pop Air', category: 'carcasa', price: 109.99 },
  { id: 13, name: 'Samsung Odyssey G6', category: 'pantallas', price: 499.99 },
  { id: 14, name: 'Gigabyte M32U', category: 'pantallas', price: 699.99 },
  { id: 15, name: 'AOC 27G4', category: 'pantallas', price: 249.99 },
  { id: 16, name: 'WD Black SN770 1TB', category: 'almacenamiento', price: 99.99 },
  { id: 17, name: 'Crucial P3 Plus 2TB', category: 'almacenamiento', price: 159.99 },
  { id: 18, name: 'Seagate BarraCuda 4TB', category: 'almacenamiento', price: 129.99 },
]

export const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="prodCard">
      <h2>{product.name}</h2>
      <ul>
        <li>
          <Button text="Comprar" className="primary-button" onClick={() => onAddToCart(product)} />
        </li>
        <li>${product.price.toFixed(2)}</li>
      </ul>
    </div>
  )
}
