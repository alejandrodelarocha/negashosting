export default function ContactEditor({ contact, dispatch }) {
  const setContact = (field, value) => dispatch({ type: 'SET_CONTACT', payload: { field, value } })
  const setSocial = (field, value) => dispatch({ type: 'SET_SOCIAL', payload: { field, value } })

  return (
    <div className="builder-field">
      <label className="builder-label">Datos de Contacto</label>
      <input
        type="tel"
        className="builder-input"
        placeholder="Telefono"
        value={contact.phone}
        onChange={(e) => setContact('phone', e.target.value)}
      />
      <input
        type="email"
        className="builder-input"
        placeholder="Email"
        value={contact.email}
        onChange={(e) => setContact('email', e.target.value)}
      />
      <input
        type="text"
        className="builder-input"
        placeholder="Direccion"
        value={contact.address}
        onChange={(e) => setContact('address', e.target.value)}
      />

      <label className="builder-label" style={{ marginTop: '0.75rem' }}>Redes Sociales</label>
      <input
        type="url"
        className="builder-input"
        placeholder="Facebook URL"
        value={contact.social.facebook}
        onChange={(e) => setSocial('facebook', e.target.value)}
      />
      <input
        type="url"
        className="builder-input"
        placeholder="Instagram URL"
        value={contact.social.instagram}
        onChange={(e) => setSocial('instagram', e.target.value)}
      />
      <input
        type="text"
        className="builder-input"
        placeholder="WhatsApp (numero)"
        value={contact.social.whatsapp}
        onChange={(e) => setSocial('whatsapp', e.target.value)}
      />
    </div>
  )
}
