import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

//El comando para activar npm en el repositorio es: npm run dev
//Tengo un jsx de react que se ejecuta en el archivo main.jsx y que importa el componente App.jsx, que a su vez importa los componentes que puedo crear.