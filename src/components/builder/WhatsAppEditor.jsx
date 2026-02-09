export default function WhatsAppEditor({ whatsapp, dispatch }) {
  const update = (field, value) =>
    dispatch({ type: 'SET_WHATSAPP', payload: { field, value } })

  return (
    <div className="builder-field">
      <label className="builder-toggle">
        <input
          type="checkbox"
          checked={whatsapp.enabled}
          onChange={(e) => update('enabled', e.target.checked)}
        />
        <span className="builder-toggle-slider" />
        Boton de WhatsApp flotante
      </label>

      {whatsapp.enabled && (
        <>
          <label className="builder-label">Numero</label>
          <input
            type="tel"
            className="builder-input"
            placeholder="521XXXXXXXXXX"
            value={whatsapp.phone}
            onChange={(e) => update('phone', e.target.value)}
          />

          <label className="builder-label">Mensaje predeterminado</label>
          <textarea
            className="builder-textarea"
            placeholder="Hola! Me interesa..."
            rows={2}
            value={whatsapp.message}
            onChange={(e) => update('message', e.target.value)}
          />
        </>
      )}
    </div>
  )
}
