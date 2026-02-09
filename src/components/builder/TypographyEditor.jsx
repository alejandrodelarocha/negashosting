import GOOGLE_FONTS from '../../data/googleFonts'

export default function TypographyEditor({ typography, dispatch }) {
  const update = (field, value) =>
    dispatch({ type: 'SET_TYPOGRAPHY', payload: { field, value } })

  return (
    <div className="builder-field">
      <label className="builder-label">Tipografia</label>

      <div className="section-option-group" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '6px' }}>
        <span className="section-option-label">Fuente de titulos</span>
        <select
          className="builder-select"
          style={{ width: '100%' }}
          value={typography.headingFont}
          onChange={(e) => update('headingFont', e.target.value)}
        >
          {GOOGLE_FONTS.map(f => (
            <option key={f.value} value={f.name}>{f.name}</option>
          ))}
        </select>
      </div>

      <div className="section-option-group" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '6px' }}>
        <span className="section-option-label">Fuente de texto</span>
        <select
          className="builder-select"
          style={{ width: '100%' }}
          value={typography.bodyFont}
          onChange={(e) => update('bodyFont', e.target.value)}
        >
          {GOOGLE_FONTS.map(f => (
            <option key={f.value} value={f.name}>{f.name}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
