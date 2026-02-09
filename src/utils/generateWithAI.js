const API_URL = '/api/gemini'

const SYSTEM_PROMPT = `Eres un diseñador web experto y creativo. Tu trabajo es generar el contenido Y el diseño visual completo para una landing page.

Responde UNICAMENTE con un JSON valido (sin markdown, sin \`\`\`, sin texto extra). El JSON debe tener esta estructura:

{
  "title": "Titulo principal del hero",
  "subtitle": "Subtitulo del hero",
  "hero": {
    "align": "center",
    "bgColor": "",
    "animation": "fadeUp"
  },
  "nav": [
    { "label": "Inicio", "target": "hero" },
    { "label": "Nombre seccion", "target": "section-1" },
    { "label": "Contacto", "target": "contact" }
  ],
  "sections": [
    {
      "title": "Titulo de seccion",
      "content": "Contenido HTML de la seccion...",
      "align": "left",
      "bgColor": "",
      "textColor": "",
      "fullWidth": false,
      "animation": "fadeUp"
    }
  ],
  "contact": {
    "phone": "",
    "email": "",
    "address": ""
  },
  "css": "... CSS completo de la pagina ..."
}

## HTML structure que tu CSS debe estilizar:
Las clases CSS que existen en el HTML son:
- \`.site-nav\` — nav sticky con \`.nav-burger\` (hamburger button con 3 <span>) y \`.nav-links\` (contenedor de <a>)
- \`.site-nav.open\` — estado abierto del menu mobile
- \`#hero .hero\` — seccion hero con logo <img>, <h1>, <p>
- \`.section\` — cada seccion de contenido con <h2> y <p>. Puede tener clase \`.full\` si fullWidth=true
- \`.section.side\` — seccion con imagen al lado (flex row)
- \`#contacto .contact\` — footer de contacto con <h2>, <p>, y \`.social\` con links
- \`.anim\` — elementos con animacion (se les agrega \`.visible\` al scrollear)

## Reglas de CSS:
- Tu CSS tiene AUTORIDAD TOTAL sobre el diseño: colores, fuentes, gradientes, sombras, bordes, spacing, layout, todo
- Usa Google Fonts (la pagina ya carga Outfit, pero puedes elegir otras con @import)
- Elige una paleta de colores VIBRANTE y apropiada para la marca (NO siempre blanco y negro)
- Asegura buen contraste en todo momento (texto legible sobre fondos)
- Diseña responsive: incluye @media queries para mobile (<600px)
- El nav debe incluir estilos para el hamburger menu en mobile (.nav-burger, .site-nav.open .nav-links)
- Incluye estilos para las clases de animacion: .anim, .anim.visible, .anim-fadeUp, .anim-fadeIn, .anim-fadeDown, .anim-slideLeft, .anim-slideRight, .anim-zoomIn, .anim-zoomOut, .anim-flip, .anim-bounce
- Puedes usar gradientes, box-shadows, text-shadows, borders creativos
- Se creativo con el layout: hero puede tener gradient overlays, secciones pueden alternar fondos, etc.
- NO incluyas <style> tags en el CSS, solo el CSS puro

## Reglas de contenido:
- Genera 3-5 secciones relevantes para el negocio
- Usa texto persuasivo en español mexicano, casual pero profesional
- El campo "content" de cada seccion puede incluir HTML basico: <p>, <ul>, <li>, <strong>, <em>, <br>
- Varia las animaciones entre secciones
- El nav debe incluir "Inicio" (target: "hero"), links a secciones (target: "section-1", etc.), y "Contacto" (target: "contact")
- Deja phone/email/address vacios
- Si ves un logo, inspira los colores y el tono en el
- Asegurate que el JSON sea valido y parseable
- El CSS NO debe tener saltos de linea dentro del string JSON (usa espacios en vez de newlines)`

export default async function generateWithAI(description, logoDataUrl, refImageDataUrl) {
  const apiKey = import.meta.env.VITE_GEMINI_KEY
  if (!apiKey) {
    throw new Error('Falta la API key de Gemini. Agrega VITE_GEMINI_KEY en el archivo .env')
  }

  // Truncate very long descriptions to avoid exceeding token limits
  const trimmedDesc = description.length > 500 ? description.substring(0, 500) + '...' : description

  let prompt = `${SYSTEM_PROMPT}\n\nDescripcion del negocio:\n${trimmedDesc}`
  if (refImageDataUrl) {
    prompt += '\n\nIMAGEN DE REFERENCIA: Se adjunta una imagen de referencia (mockup, Figma, screenshot). Replica el diseño, layout, colores y estilo visual lo mas fielmente posible en tu CSS. Adapta el contenido al negocio descrito pero mantiene la estructura visual de la referencia.'
  }

  const parts = [
    { text: prompt }
  ]

  // Include reference image if available (multimodal)
  if (refImageDataUrl) {
    const match = refImageDataUrl.match(/^data:(image\/\w+);base64,(.+)$/)
    if (match) {
      parts.push({
        inline_data: {
          mime_type: match[1],
          data: match[2]
        }
      })
    }
  }

  // Include logo if available (multimodal)
  if (logoDataUrl) {
    const match = logoDataUrl.match(/^data:(image\/\w+);base64,(.+)$/)
    if (match) {
      parts.push({
        inline_data: {
          mime_type: match[1],
          data: match[2]
        }
      })
    }
  }

  const res = await fetch(`${API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 16384,
        responseMimeType: 'application/json'
      }
    })
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Gemini API error: ${res.status}`)
  }

  const data = await res.json()

  // Check if response was truncated
  const finishReason = data.candidates?.[0]?.finishReason
  if (finishReason === 'MAX_TOKENS') {
    console.warn('Gemini response truncated (MAX_TOKENS)')
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) {
    console.error('Gemini full response:', JSON.stringify(data).substring(0, 1000))
    throw new Error('Respuesta vacia de Gemini')
  }

  // Clean up any markdown wrapping
  let cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()

  // Robust fixer: walk char-by-char replacing unescaped newlines/tabs inside JSON strings
  function fixJsonStrings(raw) {
    let result = ''
    let inString = false
    let escaped = false
    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i]
      if (escaped) {
        result += ch
        escaped = false
        continue
      }
      if (ch === '\\' && inString) {
        result += ch
        escaped = true
        continue
      }
      if (ch === '"') {
        inString = !inString
        result += ch
        continue
      }
      if (inString) {
        if (ch === '\n' || ch === '\r') { result += ' '; continue }
        if (ch === '\t') { result += ' '; continue }
      }
      result += ch
    }
    return result
  }

  // If truncated, try to repair the JSON by closing open structures
  function repairTruncated(raw) {
    let fixed = fixJsonStrings(raw)
    // If it doesn't end with }, try to close it
    if (!fixed.trimEnd().endsWith('}')) {
      // Find if we're inside a string - close it
      let inStr = false
      let esc = false
      for (const ch of fixed) {
        if (esc) { esc = false; continue }
        if (ch === '\\' && inStr) { esc = true; continue }
        if (ch === '"') inStr = !inStr
      }
      if (inStr) fixed += '"'
      // Count open braces/brackets
      let braces = 0, brackets = 0
      inStr = false; esc = false
      for (const ch of fixed) {
        if (esc) { esc = false; continue }
        if (ch === '\\' && inStr) { esc = true; continue }
        if (ch === '"') { inStr = !inStr; continue }
        if (inStr) continue
        if (ch === '{') braces++
        if (ch === '}') braces--
        if (ch === '[') brackets++
        if (ch === ']') brackets--
      }
      for (let i = 0; i < brackets; i++) fixed += ']'
      for (let i = 0; i < braces; i++) fixed += '}'
    }
    return fixed
  }

  try {
    return JSON.parse(cleaned)
  } catch {
    try {
      return JSON.parse(fixJsonStrings(cleaned))
    } catch {
      try {
        return JSON.parse(repairTruncated(cleaned))
      } catch (e) {
        console.error('Gemini raw output (first 800):', text.substring(0, 800))
        console.error('Gemini raw output (last 300):', text.substring(text.length - 300))
        console.error('Parse error:', e.message)
        console.error('finishReason:', finishReason)
        throw new Error('Gemini no devolvio JSON valido. Intenta de nuevo.')
      }
    }
  }
}
