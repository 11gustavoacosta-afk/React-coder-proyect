export const FilterSelect = ({ value, onChange }) => {
  return (
    <select className="filter-select" value={value} onChange={onChange}>
      <option value="all">Todos</option>
      <option value="graficas">Gráficas</option>
      <option value="ram">Memorias RAM</option>
      <option value="fuentes">Fuentes</option>
      <option value="carcasa">Carcasas</option>
      <option value="pantallas">Pantallas</option>
      <option value="almacenamiento">Almacenamiento</option>
    </select>
  )
}
