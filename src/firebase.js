import { initializeApp } from 'firebase/app'
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyB4d2C4ntlZ5MHEaIk6TrBcDuW9tXY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'proyecto-react-ff285.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'proyecto-react-ff285',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'proyecto-react-ff285.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '450886930519',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:450886930519:web:fe25b19c7196439032932',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-86NFD6F5E',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const productsCollection = collection(db, 'products')
const ordersCollection = collection(db, 'orders')

const normalizeProduct = (product) => ({
  ...product,
  stock: 100,
})

const fallbackProducts = [
  { id: '1', name: 'GeForce RTX 4070', category: 'graficas', price: 649.99, stock: 100 },
  { id: '2', name: 'Radeon RX 7700 XT', category: 'graficas', price: 499.99, stock: 100 },
  { id: '3', name: 'GeForce RTX 4060 Ti', category: 'graficas', price: 399.99, stock: 100 },
  { id: '4', name: 'Kingston 32GB DDR5', category: 'ram', price: 149.99, stock: 100 },
  { id: '5', name: 'Corsair Vengeance 16GB', category: 'ram', price: 89.99, stock: 100 },
  { id: '6', name: 'G.Skill Trident Z5 32GB', category: 'ram', price: 169.99, stock: 100 },
  { id: '7', name: 'Corsair 750W PSU', category: 'fuentes', price: 109.99, stock: 100 },
  { id: '8', name: 'be quiet! Pure Power 12M', category: 'fuentes', price: 129.99, stock: 100 },
  { id: '9', name: 'MSI MAG A750GL', category: 'fuentes', price: 99.99, stock: 100 },
  { id: '10', name: 'NZXT H7 Flow', category: 'carcasa', price: 129.99, stock: 100 },
  { id: '11', name: 'Lian Li Lancool 205', category: 'carcasa', price: 89.99, stock: 100 },
  { id: '12', name: 'Fractal Pop Air', category: 'carcasa', price: 109.99, stock: 100 },
  { id: '13', name: 'Samsung Odyssey G6', category: 'pantallas', price: 499.99, stock: 100 },
  { id: '14', name: 'Gigabyte M32U', category: 'pantallas', price: 699.99, stock: 100 },
  { id: '15', name: 'AOC 27G4', category: 'pantallas', price: 249.99, stock: 100 },
  { id: '16', name: 'WD Black SN770 1TB', category: 'almacenamiento', price: 99.99, stock: 100 },
  { id: '17', name: 'Crucial P3 Plus 2TB', category: 'almacenamiento', price: 159.99, stock: 100 },
  { id: '18', name: 'Seagate BarraCuda 4TB', category: 'almacenamiento', price: 129.99, stock: 100 },
]

export const fetchProducts = async () => {
  const getCachedProducts = () => {
    if (typeof window === 'undefined') return null

    try {
      const cached = window.localStorage.getItem('techstore-products')
      if (!cached) return null

      const parsed = JSON.parse(cached)
      return Array.isArray(parsed) ? parsed.map((product) => normalizeProduct(product)) : null
    } catch (error) {
      console.error('No se pudo leer el caché local de productos', error)
      return null
    }
  }

  const cachedProducts = getCachedProducts()
  if (cachedProducts && cachedProducts.length > 0) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('techstore-products', JSON.stringify(cachedProducts))
    }
    return cachedProducts
  }

  try {
    const snapshot = await Promise.race([
      getDocs(productsCollection),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Firestore timeout')), 1800)
      }),
    ])

    if (snapshot && !snapshot.empty) {
      const data = snapshot.docs.map((document) => normalizeProduct({
        id: document.id,
        ...document.data(),
      }))

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('techstore-products', JSON.stringify(data))
      }

      return data
    }
  } catch (error) {
    console.warn('Firestore tardó demasiado o falló; se usa la lista local.', error)
  }

  const normalizedFallback = fallbackProducts.map((product) => normalizeProduct(product))

  if (typeof window !== 'undefined') {
    window.localStorage.setItem('techstore-products', JSON.stringify(normalizedFallback))
  }

  return normalizedFallback
}

export const saveOrder = async (order) => {
  const docRef = await addDoc(ordersCollection, order)
  return docRef.id
}

export default app;