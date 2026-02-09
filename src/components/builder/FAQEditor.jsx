export default function FAQEditor({ faq, dispatch }) {
  const setFaq = (field, value) =>
    dispatch({ type: 'SET_FAQ', payload: { field, value } })

  const update = (id, field, value) =>
    dispatch({ type: 'UPDATE_FAQ_ITEM', payload: { id, field, value } })

  return (
    <div className="builder-field">
      <label className="builder-toggle">
        <input
          type="checkbox"
          checked={faq.enabled}
          onChange={(e) => setFaq('enabled', e.target.checked)}
        />
        <span className="builder-toggle-slider" />
        Preguntas Frecuentes
      </label>

      {faq.enabled && (
        <>
          <label className="builder-label">Titulo</label>
          <input
            type="text"
            className="builder-input"
            placeholder="Preguntas Frecuentes"
            value={faq.title}
            onChange={(e) => setFaq('title', e.target.value)}
          />

          {faq.items.map((item, i) => (
            <div key={item.id} className="section-item">
              <div className="section-item-header">
                <span className="section-number">#{i + 1}</span>
                <div className="section-item-actions">
                  {i > 0 && (
                    <button
                      onClick={() => dispatch({ type: 'MOVE_FAQ_ITEM', payload: { fromIndex: i, toIndex: i - 1 } })}
                      className="builder-btn-sm"
                    >&#9650;</button>
                  )}
                  {i < faq.items.length - 1 && (
                    <button
                      onClick={() => dispatch({ type: 'MOVE_FAQ_ITEM', payload: { fromIndex: i, toIndex: i + 1 } })}
                      className="builder-btn-sm"
                    >&#9660;</button>
                  )}
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_FAQ_ITEM', payload: item.id })}
                    className="builder-btn-sm danger"
                  >&times;</button>
                </div>
              </div>

              <input
                type="text"
                className="builder-input"
                placeholder="Pregunta..."
                value={item.question}
                onChange={(e) => update(item.id, 'question', e.target.value)}
              />
              <textarea
                className="builder-textarea"
                placeholder="Respuesta..."
                rows={3}
                value={item.answer}
                onChange={(e) => update(item.id, 'answer', e.target.value)}
              />
            </div>
          ))}

          <button
            onClick={() => dispatch({ type: 'ADD_FAQ_ITEM' })}
            className="builder-btn-add"
          >+ Agregar Pregunta</button>
        </>
      )}
    </div>
  )
}
