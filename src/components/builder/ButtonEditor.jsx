export default function ButtonEditor({ buttons, onAdd, onRemove, onUpdate }) {
  const styles = [
    { value: 'primary', label: 'Primario' },
    { value: 'secondary', label: 'Secundario' },
    { value: 'outline', label: 'Outline' },
  ]

  return (
    <div className="builder-field">
      <label className="builder-label">Botones</label>
      {buttons.map((btn) => (
        <div key={btn.id} className="section-item">
          <div className="section-item-header">
            <div className="section-item-actions">
              <button
                onClick={() => onRemove(btn.id)}
                className="builder-btn-sm danger"
              >&times;</button>
            </div>
          </div>

          <input
            type="text"
            className="builder-input"
            placeholder="Texto del boton"
            value={btn.text}
            onChange={(e) => onUpdate(btn.id, 'text', e.target.value)}
          />
          <input
            type="url"
            className="builder-input"
            placeholder="https://..."
            value={btn.url}
            onChange={(e) => onUpdate(btn.id, 'url', e.target.value)}
          />

          <div className="section-option-group">
            <span className="section-option-label">Estilo</span>
            <div className="section-toggle-group">
              {styles.map((s) => (
                <button
                  key={s.value}
                  className={`section-toggle wide ${btn.style === s.value ? 'active' : ''}`}
                  onClick={() => onUpdate(btn.id, 'style', s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
      <button onClick={onAdd} className="builder-btn-add">+ Agregar Boton</button>
    </div>
  )
}
