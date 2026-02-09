export default function NavEditor({ nav, navStyle = {}, sections, dispatch }) {
  const update = (id, field, value) =>
    dispatch({ type: 'UPDATE_NAV_ITEM', payload: { id, field, value } })

  const styleUpdate = (field, value) =>
    dispatch({ type: 'SET_NAV_STYLE', payload: { field, value } })

  return (
    <div className="builder-field">
      <label className="builder-label">Menu de Navegacion</label>

      {/* Nav style options */}
      <div className="section-options">
        <div className="section-option-group">
          <span className="section-option-label">Fondo</span>
          <input
            type="color"
            className="section-color-input"
            value={navStyle.bgColor || '#0a0a0a'}
            onChange={(e) => styleUpdate('bgColor', e.target.value)}
          />
          {navStyle.bgColor && (
            <button
              className="builder-btn-sm"
              onClick={() => styleUpdate('bgColor', '')}
            >&times;</button>
          )}
        </div>

        <div className="section-option-group">
          <span className="section-option-label">Letra</span>
          <input
            type="color"
            className="section-color-input"
            value={navStyle.textColor || '#cccccc'}
            onChange={(e) => styleUpdate('textColor', e.target.value)}
          />
          {navStyle.textColor && (
            <button
              className="builder-btn-sm"
              onClick={() => styleUpdate('textColor', '')}
            >&times;</button>
          )}
        </div>

        <div className="section-option-group">
          <span className="section-option-label">Alinear</span>
          <div className="section-toggle-group">
            {['left', 'center', 'right'].map(a => (
              <button
                key={a}
                className={`section-toggle ${(navStyle.align || 'center') === a ? 'active' : ''}`}
                onClick={() => styleUpdate('align', a)}
              >
                {a === 'left' ? '◧' : a === 'center' ? '◫' : '◨'}
              </button>
            ))}
          </div>
        </div>

        <div className="section-option-group">
          <span className="section-option-label">Posicion</span>
          <select
            className="builder-select"
            value={navStyle.position || 'sticky'}
            onChange={(e) => styleUpdate('position', e.target.value)}
          >
            <option value="sticky">Sticky</option>
            <option value="fixed">Fijo</option>
            <option value="static">Normal</option>
          </select>
        </div>

        <div className="section-option-group">
          <span className="section-option-label">Tamano</span>
          <select
            className="builder-select"
            value={navStyle.fontSize || ''}
            onChange={(e) => styleUpdate('fontSize', e.target.value)}
          >
            <option value="">Normal</option>
            <option value="small">Pequeno</option>
            <option value="large">Grande</option>
          </select>
        </div>
      </div>

      {/* Nav items */}
      {nav.map((item, i) => (
        <div key={item.id} className="nav-item">
          <div className="nav-item-row">
            <input
              type="text"
              className="builder-input"
              placeholder="Texto del enlace"
              value={item.label}
              onChange={(e) => update(item.id, 'label', e.target.value)}
            />
            <select
              className="builder-select"
              value={item.target}
              onChange={(e) => update(item.id, 'target', e.target.value)}
            >
              <option value="hero">Inicio (Hero)</option>
              {sections.map((s, idx) => (
                <option key={s.id} value={s.id}>
                  {s.title || `Seccion #${idx + 1}`}
                </option>
              ))}
              <option value="contact">Contacto</option>
              <option value="url">URL externa</option>
            </select>
            <div className="nav-item-actions">
              {i > 0 && (
                <button
                  onClick={() => dispatch({ type: 'MOVE_NAV_ITEM', payload: { fromIndex: i, toIndex: i - 1 } })}
                  className="builder-btn-sm"
                >▲</button>
              )}
              {i < nav.length - 1 && (
                <button
                  onClick={() => dispatch({ type: 'MOVE_NAV_ITEM', payload: { fromIndex: i, toIndex: i + 1 } })}
                  className="builder-btn-sm"
                >▼</button>
              )}
              <button
                onClick={() => dispatch({ type: 'REMOVE_NAV_ITEM', payload: item.id })}
                className="builder-btn-sm danger"
              >✕</button>
            </div>
          </div>
          {item.target === 'url' && (
            <input
              type="text"
              className="builder-input"
              placeholder="https://..."
              value={item.url || ''}
              onChange={(e) => update(item.id, 'url', e.target.value)}
            />
          )}
        </div>
      ))}
      <button
        onClick={() => dispatch({ type: 'ADD_NAV_ITEM' })}
        className="builder-btn-add"
      >+ Agregar Enlace</button>
    </div>
  )
}
