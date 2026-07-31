export const Button = ({ className, text, onClick, colour }) => {
  return (
    <button className={className} onClick={onClick} style={{ color: colour }}>
      {text}
    </button>
  )
}
//Puedo crear componentes separandolas en archivos diferentes y exportarlos para luego importarlos al archivo principal (En este caso App.jsx).
