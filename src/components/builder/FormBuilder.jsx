const FIELD_TYPES = [
  { value: 'text', label: 'Texto' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Telefono' },
  { value: 'textarea', label: 'Mensaje' },
]

export default function FormBuilder({ contactForm, dispatch }) {
  const setForm = (field, value) =>
    dispatch({ type: 'SET_CONTACT_FORM', payload: { field, value } })

  const updateField = (id, field, value) =>
    dispatch({ type: 'UPDATE_FORM_FIELD', payload: { id, field, value } })

  return (
    <div className="builder-field">
      <label className="builder-toggle">
        <input
          type="checkbox"
          checked={contactForm.enabled}
          onChange={(e) => setForm('enabled', e.target.checked)}
        />
        <span className="builder-toggle-slider" />
        Formulario de contacto
      </label>

      {contactForm.enabled && (
        <>
          <label className="builder-label">Campos del formulario</label>

          {contactForm.fields.map((field, i) => (
            <div key={field.id} className="section-item">
              <div className="section-item-header">
                <span className="section-number">#{i + 1}</span>
                <div className="section-item-actions">
                  {i > 0 && (
                    <button
                      onClick={() => dispatch({ type: 'MOVE_FORM_FIELD', payload: { fromIndex: i, toIndex: i - 1 } })}
                      className="builder-btn-sm"
                    >&#9650;</button>
                  )}
                  {i < contactForm.fields.length - 1 && (
                    <button
                      onClick={() => dispatch({ type: 'MOVE_FORM_FIELD', payload: { fromIndex: i, toIndex: i + 1 } })}
                      className="builder-btn-sm"
                    >&#9660;</button>
                  )}
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_FORM_FIELD', payload: field.id })}
                    className="builder-btn-sm danger"
                  >&times;</button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select
                  className="builder-select"
                  value={field.type}
                  onChange={(e) => updateField(field.id, 'type', e.target.value)}
                >
                  {FIELD_TYPES.map(ft => (
                    <option key={ft.value} value={ft.value}>{ft.label}</option>
                  ))}
                </select>
                <input
                  type="text"
                  className="builder-input"
                  placeholder="Etiqueta del campo"
                  style={{ flex: 1 }}
                  value={field.label}
                  onChange={(e) => updateField(field.id, 'label', e.target.value)}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#999' }}>
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => updateField(field.id, 'required', e.target.checked)}
                />
                Obligatorio
              </label>
            </div>
          ))}

          <button
            onClick={() => dispatch({ type: 'ADD_FORM_FIELD' })}
            className="builder-btn-add"
          >+ Agregar Campo</button>

          <label className="builder-label" style={{ marginTop: '0.75rem' }}>Texto del boton</label>
          <input
            type="text"
            className="builder-input"
            placeholder="Enviar"
            value={contactForm.submitText}
            onChange={(e) => setForm('submitText', e.target.value)}
          />

          <label className="builder-label" style={{ marginTop: '0.75rem' }}>Accion al enviar</label>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#999' }}>
              <input
                type="radio"
                name="submitAction"
                value="mailto"
                checked={contactForm.submitAction === 'mailto'}
                onChange={() => setForm('submitAction', 'mailto')}
              />
              Email
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#999' }}>
              <input
                type="radio"
                name="submitAction"
                value="whatsapp"
                checked={contactForm.submitAction === 'whatsapp'}
                onChange={() => setForm('submitAction', 'whatsapp')}
              />
              WhatsApp
            </label>
          </div>

          {contactForm.submitAction === 'mailto' && (
            <input
              type="email"
              className="builder-input"
              placeholder="correo@ejemplo.com"
              value={contactForm.submitEmail}
              onChange={(e) => setForm('submitEmail', e.target.value)}
            />
          )}

          {contactForm.submitAction === 'whatsapp' && (
            <input
              type="tel"
              className="builder-input"
              placeholder="521234567890"
              value={contactForm.submitWhatsApp}
              onChange={(e) => setForm('submitWhatsApp', e.target.value)}
            />
          )}
        </>
      )}
    </div>
  )
}
