import { Button } from './button'

export const SearchBar = ({ value, onChange, onSearch }) => {
  return (
    <div className="search-controls">
      <input
        type="text"
        placeholder="Buscar producto"
        className="search-input"
        value={value}
        onChange={onChange}
      />

      <Button text="Buscar" className="primary-button" onClick={onSearch} />
    </div>
  )
}
