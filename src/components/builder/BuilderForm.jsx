import { useState } from 'react'
import LogoUpload from './LogoUpload'
import NavEditor from './NavEditor'
import SectionEditor from './SectionEditor'
import ContactEditor from './ContactEditor'
import ButtonEditor from './ButtonEditor'
import WhatsAppEditor from './WhatsAppEditor'
import TypographyEditor from './TypographyEditor'
import FAQEditor from './FAQEditor'
import FormBuilder from './FormBuilder'
import DeployPanel from './DeployPanel'
import generateWithAI from '../../utils/generateWithAI'

export default function BuilderForm({ state, dispatch, pendingDeploy, onDeployDone }) {
  const [description, setDescription] = useState('')
  const [refImage, setRefImage] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  const heroUpdate = (field, value) =>
    dispatch({ type: 'SET_HERO', payload: { field, value } })

  const handleHeroImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      heroUpdate('image', { dataUrl: reader.result, fileName: file.name })
    }
    reader.readAsDataURL(file)
  }

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Escribe una descripcion de tu negocio para generar la landing page')
      return
    }
    setGenerating(true)
    setError('')
    try {
      const logoDataUrl = state.logo?.dataUrl || null
      const refDataUrl = refImage?.dataUrl || null
      const result = await generateWithAI(description, logoDataUrl, refDataUrl)
      dispatch({ type: 'LOAD_AI_STATE', payload: result })
    } catch (err) {
      setError(err.message)
    } finally {
      setGenerating(false)
    }
  }

  // Detect if builder has content (generated or manually added)
  const hasContent = state.title || state.sections.some(s => s.title || s.content)

  return (
    <div className="builder-form">
      {/* AI Generate */}
      <div className="builder-field">
        {!hasContent && (
          <p className="builder-hint">Para comenzar haz una descripcion breve de tu sitio web</p>
        )}
        <label className="builder-label">Generar con IA</label>
        <LogoUpload logo={state.logo} dispatch={dispatch} />

        {/* Reference image */}
        <div className="section-option-group" style={{ marginTop: '0.5rem' }}>
          <span className="section-option-label">Imagen de referencia (Figma, mockup, screenshot)</span>
          {refImage ? (
            <div className="section-image-preview">
              <img src={refImage.dataUrl} alt="" />
              <button
                className="builder-btn-sm danger"
                onClick={() => setRefImage(null)}
              >Quitar</button>
            </div>
          ) : (
            <label className="section-image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (!file) return
                  const reader = new FileReader()
                  reader.onload = () => setRefImage({ dataUrl: reader.result, fileName: file.name })
                  reader.readAsDataURL(file)
                }}
                hidden
              />
              <span>Subir imagen de referencia</span>
            </label>
          )}
        </div>

        <textarea
          className="builder-textarea"
          placeholder="Describe tu negocio... Ej: Taqueria en CDMX con 10 años de experiencia, especialidad en tacos al pastor y birria, servicio a domicilio, ambiente familiar..."
          rows={3}
          maxLength={500}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {description.length > 400 && (
          <span style={{ fontSize: '0.7rem', color: description.length >= 500 ? '#ef4444' : '#707070', textAlign: 'right' }}>
            {description.length}/500
          </span>
        )}
        <button
          className="builder-btn-generate"
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? 'Generando...' : hasContent ? 'Re-generar Landing Page' : 'Generar Landing Page'}
        </button>
        {error && <div className="builder-error">{error}</div>}
      </div>

      {!hasContent ? null : <>

      {/* Typography */}
      <TypographyEditor typography={state.typography} dispatch={dispatch} />

      {/* Hero Section */}
      <div className="builder-field">
        <label className="builder-label">Hero</label>

        <input
          type="text"
          className="builder-input"
          placeholder="Mi Negocio"
          value={state.title}
          onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
        />

        <input
          type="text"
          className="builder-input"
          placeholder="Lo mejor en servicios..."
          value={state.subtitle}
          onChange={(e) => dispatch({ type: 'SET_SUBTITLE', payload: e.target.value })}
        />

        {/* Hero Options */}
        <div className="section-options">
          <div className="section-option-group">
            <span className="section-option-label">Alinear</span>
            <div className="section-toggle-group">
              {['left', 'center', 'right'].map(a => (
                <button
                  key={a}
                  className={`section-toggle ${state.hero.align === a ? 'active' : ''}`}
                  onClick={() => heroUpdate('align', a)}
                >
                  {a === 'left' ? '◧' : a === 'center' ? '◫' : '◨'}
                </button>
              ))}
            </div>
          </div>

          <div className="section-option-group">
            <span className="section-option-label">Letra</span>
            <input
              type="color"
              className="section-color-input"
              value={state.hero.textColor || '#f0f0f0'}
              onChange={(e) => heroUpdate('textColor', e.target.value)}
            />
            {state.hero.textColor && (
              <button
                className="builder-btn-sm"
                onClick={() => heroUpdate('textColor', '')}
              >&times;</button>
            )}
          </div>

          <div className="section-option-group">
            <span className="section-option-label">Fondo</span>
            <input
              type="color"
              className="section-color-input"
              value={state.hero.bgColor || '#0a0a0a'}
              onChange={(e) => heroUpdate('bgColor', e.target.value)}
            />
            {state.hero.bgColor && (
              <button
                className="builder-btn-sm"
                onClick={() => heroUpdate('bgColor', '')}
              >&times;</button>
            )}
          </div>

          <div className="section-option-group">
            <span className="section-option-label">Tamano</span>
            <select
              className="builder-select"
              value={state.hero.fontSize || ''}
              onChange={(e) => heroUpdate('fontSize', e.target.value)}
            >
              <option value="">Normal</option>
              <option value="small">Pequeno</option>
              <option value="large">Grande</option>
              <option value="xlarge">Extra Grande</option>
            </select>
          </div>

          <div className="section-option-group">
            <span className="section-option-label">Estilo</span>
            <div className="section-toggle-group">
              <button
                className={`section-toggle ${state.hero.fontWeight === 'bold' ? 'active' : ''}`}
                onClick={() => heroUpdate('fontWeight', state.hero.fontWeight === 'bold' ? '' : 'bold')}
                style={{ fontWeight: 'bold' }}
              >B</button>
              <button
                className={`section-toggle ${state.hero.fontStyle === 'italic' ? 'active' : ''}`}
                onClick={() => heroUpdate('fontStyle', state.hero.fontStyle === 'italic' ? '' : 'italic')}
                style={{ fontStyle: 'italic' }}
              >I</button>
            </div>
          </div>

          <div className="section-option-group">
            <label className="section-checkbox-label">
              <input
                type="checkbox"
                checked={!!state.hero.fullHeight}
                onChange={(e) => heroUpdate('fullHeight', e.target.checked)}
              />
              <span>100% alto</span>
            </label>
          </div>

          <div className="section-option-group">
            <span className="section-option-label">Animacion</span>
            <select
              className="builder-select"
              value={state.hero.animation || 'none'}
              onChange={(e) => heroUpdate('animation', e.target.value)}
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

        {/* Hero image */}
        <div className="section-option-group">
          <span className="section-option-label">Imagen de fondo</span>
          {state.hero.image ? (
            <div className="section-image-preview">
              <img src={state.hero.image.dataUrl} alt="" />
              <button
                className="builder-btn-sm danger"
                onClick={() => heroUpdate('image', null)}
              >Quitar</button>
            </div>
          ) : (
            <label className="section-image-upload">
              <input type="file" accept="image/*" onChange={handleHeroImage} hidden />
              <span>Subir imagen</span>
            </label>
          )}
        </div>
      </div>

      {/* Hero Buttons */}
      <ButtonEditor
        buttons={state.hero.buttons || []}
        onAdd={() => dispatch({ type: 'ADD_HERO_BUTTON' })}
        onRemove={(id) => dispatch({ type: 'REMOVE_HERO_BUTTON', payload: id })}
        onUpdate={(id, field, value) => dispatch({ type: 'UPDATE_HERO_BUTTON', payload: { id, field, value } })}
      />

      <NavEditor nav={state.nav} navStyle={state.navStyle} sections={state.sections} dispatch={dispatch} />
      <SectionEditor sections={state.sections} dispatch={dispatch} />

      {/* FAQ */}
      <FAQEditor faq={state.faq} dispatch={dispatch} />

      {/* Contact Form */}
      <FormBuilder contactForm={state.contactForm} dispatch={dispatch} />

      <ContactEditor contact={state.contact} dispatch={dispatch} />

      {/* WhatsApp */}
      <WhatsAppEditor whatsapp={state.whatsapp} dispatch={dispatch} />

      {/* Deploy */}
      <DeployPanel state={state} dispatch={dispatch} pendingDeploy={pendingDeploy} onDeployDone={onDeployDone} />

      </>}
    </div>
  )
}
