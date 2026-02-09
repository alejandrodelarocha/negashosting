export default function SectionEditor({ sections, dispatch }) {
  const update = (id, field, value) =>
    dispatch({ type: 'UPDATE_SECTION', payload: { id, field, value } })

  const handleImage = (id, e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      update(id, 'image', { dataUrl: reader.result, fileName: file.name })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="builder-field">
      <label className="builder-label">Secciones</label>
      {sections.map((section, i) => (
        <div key={section.id} className="section-item">
          <div className="section-item-header">
            <span className="section-number">#{i + 1}</span>
            <div className="section-item-actions">
              {i > 0 && (
                <button
                  onClick={() => dispatch({ type: 'MOVE_SECTION', payload: { fromIndex: i, toIndex: i - 1 } })}
                  className="builder-btn-sm"
                >▲</button>
              )}
              {i < sections.length - 1 && (
                <button
                  onClick={() => dispatch({ type: 'MOVE_SECTION', payload: { fromIndex: i, toIndex: i + 1 } })}
                  className="builder-btn-sm"
                >▼</button>
              )}
              {sections.length > 1 && (
                <button
                  onClick={() => dispatch({ type: 'REMOVE_SECTION', payload: section.id })}
                  className="builder-btn-sm danger"
                >✕</button>
              )}
            </div>
          </div>

          <input
            type="text"
            className="builder-input"
            placeholder="Titulo de la seccion"
            value={section.title}
            onChange={(e) => update(section.id, 'title', e.target.value)}
          />
          <textarea
            className="builder-textarea"
            placeholder="Contenido..."
            rows={3}
            value={section.content}
            onChange={(e) => update(section.id, 'content', e.target.value)}
          />

          {/* Options row */}
          <div className="section-options">
            {/* Text align */}
            <div className="section-option-group">
              <span className="section-option-label">Alinear</span>
              <div className="section-toggle-group">
                {['left', 'center', 'right'].map(a => (
                  <button
                    key={a}
                    className={`section-toggle ${section.align === a ? 'active' : ''}`}
                    onClick={() => update(section.id, 'align', a)}
                  >
                    {a === 'left' ? '◧' : a === 'center' ? '◫' : '◨'}
                  </button>
                ))}
              </div>
            </div>

            {/* Text color */}
            <div className="section-option-group">
              <span className="section-option-label">Letra</span>
              <input
                type="color"
                className="section-color-input"
                value={section.textColor || '#f0f0f0'}
                onChange={(e) => update(section.id, 'textColor', e.target.value)}
              />
              {section.textColor && (
                <button
                  className="builder-btn-sm"
                  onClick={() => update(section.id, 'textColor', '')}
                >✕</button>
              )}
            </div>

            {/* Background color */}
            <div className="section-option-group">
              <span className="section-option-label">Fondo</span>
              <input
                type="color"
                className="section-color-input"
                value={section.bgColor || '#0a0a0a'}
                onChange={(e) => update(section.id, 'bgColor', e.target.value)}
              />
              {section.bgColor && (
                <button
                  className="builder-btn-sm"
                  onClick={() => update(section.id, 'bgColor', '')}
                >✕</button>
              )}
            </div>

            {/* Font size */}
            <div className="section-option-group">
              <span className="section-option-label">Tamaño</span>
              <select
                className="builder-select"
                value={section.fontSize || ''}
                onChange={(e) => update(section.id, 'fontSize', e.target.value)}
              >
                <option value="">Normal</option>
                <option value="small">Pequeño</option>
                <option value="large">Grande</option>
                <option value="xlarge">Extra Grande</option>
              </select>
            </div>

            {/* Font style */}
            <div className="section-option-group">
              <span className="section-option-label">Estilo</span>
              <div className="section-toggle-group">
                <button
                  className={`section-toggle ${section.fontWeight === 'bold' ? 'active' : ''}`}
                  onClick={() => update(section.id, 'fontWeight', section.fontWeight === 'bold' ? '' : 'bold')}
                  style={{ fontWeight: 'bold' }}
                >B</button>
                <button
                  className={`section-toggle ${section.fontStyle === 'italic' ? 'active' : ''}`}
                  onClick={() => update(section.id, 'fontStyle', section.fontStyle === 'italic' ? '' : 'italic')}
                  style={{ fontStyle: 'italic' }}
                >I</button>
              </div>
            </div>

            {/* Full width */}
            <div className="section-option-group">
              <span className="section-option-label">Ancho</span>
              <div className="section-toggle-group">
                <button
                  className={`section-toggle wide ${!section.fullWidth ? 'active' : ''}`}
                  onClick={() => update(section.id, 'fullWidth', false)}
                >Normal</button>
                <button
                  className={`section-toggle wide ${section.fullWidth ? 'active' : ''}`}
                  onClick={() => update(section.id, 'fullWidth', true)}
                >Full</button>
              </div>
            </div>

            {/* Full height */}
            <div className="section-option-group">
              <label className="section-checkbox-label">
                <input
                  type="checkbox"
                  checked={!!section.fullHeight}
                  onChange={(e) => update(section.id, 'fullHeight', e.target.checked)}
                />
                <span>100% alto</span>
              </label>
            </div>

            {/* Animation */}
            <div className="section-option-group">
              <span className="section-option-label">Animacion</span>
              <select
                className="builder-select"
                value={section.animation || 'none'}
                onChange={(e) => update(section.id, 'animation', e.target.value)}
              >
                <option value="none">Sin animacion</option>
                <option value="fadeIn">Fade In</option>
                <option value="fadeUp">Fade Up</option>
                <option value="fadeDown">Fade Down</option>
                <option value="slideLeft">Slide Izquierda</option>
                <option value="slideRight">Slide Derecha</option>
                <option value="zoomIn">Zoom In</option>
                <option value="zoomOut">Zoom Out</option>
                <option value="flip">Flip</option>
                <option value="bounce">Bounce</option>
              </select>
            </div>
          </div>

          {/* Image */}
          <div className="section-option-group">
            <span className="section-option-label">Imagen</span>
            {section.image ? (
              <div className="section-image-preview">
                <img src={section.image.dataUrl} alt="" />
                <button
                  className="builder-btn-sm danger"
                  onClick={() => update(section.id, 'image', null)}
                >Quitar</button>
              </div>
            ) : (
              <label className="section-image-upload">
                <input type="file" accept="image/*" onChange={(e) => handleImage(section.id, e)} hidden />
                <span>Subir imagen</span>
              </label>
            )}
          </div>

          {/* Image layout (only show when image exists) */}
          {section.image && (
            <div className="section-option-group">
              <span className="section-option-label">Posicion imagen</span>
              <div className="section-toggle-group">
                {[
                  { value: 'left', label: 'Izq' },
                  { value: 'right', label: 'Der' },
                  { value: 'background', label: 'Fondo' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    className={`section-toggle wide ${section.imageLayout === opt.value ? 'active' : ''}`}
                    onClick={() => update(section.id, 'imageLayout', opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => dispatch({ type: 'ADD_SECTION' })}
        className="builder-btn-add"
      >+ Agregar Seccion</button>
    </div>
  )
}
