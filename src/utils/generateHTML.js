const DEFAULT_CSS = `*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Outfit',sans-serif;background:#0a0a0a;color:#f0f0f0;line-height:1.6}
.site-nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:0.8rem 2rem;background:rgba(10,10,10,0.85);backdrop-filter:blur(12px);border-bottom:1px solid #222}
.nav-links{display:flex;align-items:center;gap:1.5rem}
.nav-links a{color:#ccc;text-decoration:none;font-size:0.85rem;font-weight:400;letter-spacing:0.03em;padding:0.3rem 0;border-bottom:2px solid transparent;transition:color 0.2s,border-color 0.2s}
.nav-links a:hover{color:#fff;border-bottom-color:#fff}
.nav-burger{display:none;background:none;border:none;cursor:pointer;padding:4px;flex-direction:column;gap:5px}
.nav-burger span{display:block;width:22px;height:2px;background:#fff;border-radius:2px;transition:all 0.3s}
@media(max-width:600px){.nav-burger{display:flex}.nav-links{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;background:rgba(10,10,10,0.95);backdrop-filter:blur(12px);padding:1rem 2rem;gap:0.5rem;border-bottom:1px solid #222}.site-nav.open .nav-links{display:flex}.site-nav{justify-content:flex-end}.site-nav.open .nav-burger span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}.site-nav.open .nav-burger span:nth-child(2){opacity:0}.site-nav.open .nav-burger span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}}
.hero{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:4rem 2rem;background:linear-gradient(180deg,#111 0%,#0a0a0a 100%)}
.hero img{border-radius:12px}
.hero h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:700;margin-bottom:0.5rem;letter-spacing:-0.02em}
.hero p{font-size:1.15rem;color:#999;max-width:600px;font-weight:300}
.hero-buttons{display:flex;gap:0.75rem;margin-top:1.5rem;flex-wrap:wrap;justify-content:center}
.btn-primary{display:inline-block;padding:0.75rem 2rem;background:#fff;color:#0a0a0a;text-decoration:none;border-radius:8px;font-weight:600;font-size:0.95rem;transition:all 0.2s;border:2px solid #fff}
.btn-primary:hover{background:transparent;color:#fff}
.btn-secondary{display:inline-block;padding:0.75rem 2rem;background:transparent;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:0.95rem;transition:all 0.2s;border:2px solid #444}
.btn-secondary:hover{border-color:#fff}
.btn-outline{display:inline-block;padding:0.75rem 2rem;background:transparent;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:0.95rem;transition:all 0.2s;border:2px solid #666}
.btn-outline:hover{background:#fff;color:#0a0a0a;border-color:#fff}
.section{max-width:800px;margin:0 auto;padding:3rem 2rem;overflow:hidden}
.section.full{max-width:100%;padding:3rem 4rem}
.section.side{max-width:900px}
.section.side.full{max-width:100%}
.section h2{font-size:1.8rem;font-weight:600;margin-bottom:1rem;color:#fff}
.section p{color:#bbb;font-size:1.05rem;font-weight:300;line-height:1.8}
.section-buttons{display:flex;gap:0.75rem;margin-top:1.5rem;flex-wrap:wrap}
.contact{max-width:800px;margin:0 auto;padding:3rem 2rem;border-top:1px solid #222;text-align:center}
.contact h2{font-size:1.5rem;margin-bottom:1rem;color:#fff}
.contact p{color:#999;margin-bottom:0.5rem}
.social{margin-top:1rem;display:flex;gap:1.5rem;justify-content:center}
.social a{color:#f0f0f0;text-decoration:none;padding:0.5rem 1rem;border:1px solid #333;border-radius:6px;font-size:0.9rem;transition:border-color 0.2s}
.social a:hover{border-color:#666}
.faq-section{max-width:700px;margin:0 auto;padding:3rem 2rem}
.faq-section h2{font-size:1.5rem;font-weight:600;margin-bottom:1.5rem;color:#fff;text-align:center}
.faq-item{border-bottom:1px solid #222;overflow:hidden}
.faq-q{padding:1rem 0;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-weight:600;color:#fff;font-size:1rem}
.faq-q::after{content:'+';font-size:1.3rem;color:#888;transition:transform 0.3s}
.faq-item.open .faq-q::after{transform:rotate(45deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height 0.3s ease,padding 0.3s ease;color:#999;font-size:0.95rem;line-height:1.7}
.faq-item.open .faq-a{max-height:500px;padding-bottom:1rem}
.contact-form{max-width:600px;margin:0 auto;padding:3rem 2rem}
.contact-form h2{font-size:1.5rem;font-weight:600;margin-bottom:1.5rem;color:#fff;text-align:center}
.contact-form label{display:block;color:#999;font-size:0.85rem;margin-bottom:0.3rem;margin-top:0.75rem}
.contact-form input,.contact-form textarea{width:100%;padding:0.75rem;background:#151515;border:1px solid #333;border-radius:6px;color:#fff;font-family:inherit;font-size:0.95rem;outline:none;transition:border-color 0.2s}
.contact-form input:focus,.contact-form textarea:focus{border-color:#666}
.contact-form textarea{min-height:100px;resize:vertical}
.contact-form button{margin-top:1.25rem;width:100%;padding:0.85rem;background:#fff;color:#0a0a0a;border:none;border-radius:8px;font-weight:600;font-size:1rem;cursor:pointer;transition:background 0.2s}
.contact-form button:hover{background:#ddd}
.whatsapp-float{position:fixed;bottom:24px;right:24px;width:56px;height:56px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:999;transition:transform 0.2s;text-decoration:none}
.whatsapp-float:hover{transform:scale(1.1)}
.whatsapp-float svg{width:28px;height:28px;fill:#fff}
@media(max-width:600px){.hero{padding:2rem 1rem}.hero h1{font-size:1.8rem}.section{padding:2rem 1rem}.section.side{flex-direction:column!important}.section.side img{max-width:100%!important}}
.anim{opacity:0;transition:all 0.8s ease}
.anim.visible{opacity:1;transform:none}
.anim-fadeIn{opacity:0}
.anim-fadeUp{opacity:0;transform:translateY(40px)}
.anim-fadeDown{opacity:0;transform:translateY(-40px)}
.anim-slideLeft{opacity:0;transform:translateX(-60px)}
.anim-slideRight{opacity:0;transform:translateX(60px)}
.anim-zoomIn{opacity:0;transform:scale(0.85)}
.anim-zoomOut{opacity:0;transform:scale(1.15)}
.anim-flip{opacity:0;transform:perspective(600px) rotateY(90deg)}
.anim-bounce{opacity:0;transform:translateY(40px)}
.anim-bounce.visible{animation:bounceIn 0.8s ease forwards}
@keyframes bounceIn{0%{opacity:0;transform:translateY(40px)}60%{opacity:1;transform:translateY(-10px)}80%{transform:translateY(5px)}100%{opacity:1;transform:translateY(0)}}`

export default function generateHTML(state) {
  const {
    logo, title, subtitle, customCss = '', hero = {}, navStyle = {}, nav = [], sections, contact,
    whatsapp = {}, typography = {}, faq = {}, contactForm = {}
  } = state

  const logoHTML = logo
    ? `<img src="${logo.dataUrl}" alt="Logo" style="max-height:80px;margin-bottom:1rem;">`
    : ''

  // Hero options
  const heroAlign = hero.align || 'center'
  const heroBgColor = hero.bgColor ? `background:${hero.bgColor};` : ''
  const heroTxtColor = hero.textColor ? `color:${hero.textColor};` : ''
  const heroFSize = hero.fontSize === 'small' ? 'font-size:0.85rem;' : hero.fontSize === 'large' ? 'font-size:1.25rem;' : hero.fontSize === 'xlarge' ? 'font-size:1.5rem;' : ''
  const heroFWeight = hero.fontWeight === 'bold' ? 'font-weight:700;' : ''
  const heroFStyle = hero.fontStyle === 'italic' ? 'font-style:italic;' : ''
  const heroFullHeight = hero.fullHeight ? 'min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;' : ''
  const heroHasImage = hero.image && hero.image.dataUrl
  const heroBgImage = heroHasImage
    ? `background-image:url('${hero.image.dataUrl}');background-size:cover;background-position:center;`
    : ''
  const heroOverlay = heroHasImage
    ? `<div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);"></div>`
    : ''
  const heroContentStyle = heroHasImage ? 'position:relative;z-index:1;' : ''
  const heroAnimClass = hero.animation && hero.animation !== 'none' ? ` anim anim-${hero.animation}` : ''
  const heroPositionStyle = heroHasImage ? 'position:relative;' : ''

  // Hero buttons
  const heroButtons = (hero.buttons || []).filter(b => b.text)
  const heroButtonsHTML = heroButtons.length
    ? `<div class="hero-buttons">${heroButtons.map(b => `<a href="${esc(b.url || '#')}" class="btn-${b.style || 'primary'}">${esc(b.text)}</a>`).join('')}</div>`
    : ''

  // Build section ID map for nav anchors
  const sectionIdMap = {}
  sections.forEach((s, i) => {
    sectionIdMap[s.id] = `section-${i + 1}`
  })

  // Nav HTML
  const navItems = nav.filter(n => n.label)
  const navBg = navStyle.bgColor ? `background:${navStyle.bgColor};backdrop-filter:none;` : ''
  const navTxt = navStyle.textColor ? `color:${navStyle.textColor};` : ''
  const navAlign = navStyle.align === 'left' ? 'justify-content:flex-start;' : navStyle.align === 'right' ? 'justify-content:flex-end;' : 'justify-content:center;'
  const navPos = navStyle.position === 'fixed' ? 'position:fixed;width:100%;' : navStyle.position === 'static' ? 'position:static;' : ''
  const navFontSize = navStyle.fontSize === 'small' ? 'font-size:0.75rem;' : navStyle.fontSize === 'large' ? 'font-size:1rem;' : ''
  const navInlineStyle = `${navBg}${navAlign}${navPos}`.trim()
  const navStyleAttr = navInlineStyle ? ` style="${navInlineStyle}"` : ''
  const linkStyle = (navTxt || navFontSize) ? ` style="${navTxt}${navFontSize}"` : ''
  const navHTML = navItems.length ? `
<nav class="site-nav"${navStyleAttr}>
  <button class="nav-burger" onclick="this.parentElement.classList.toggle('open')" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
  <div class="nav-links">
    ${navItems.map(n => {
      const closeJs = `onclick="document.querySelector('.site-nav').classList.remove('open')"`
      if (n.target === 'hero') return `<a href="#hero"${linkStyle} ${closeJs}>${esc(n.label)}</a>`
      if (n.target === 'contact') return `<a href="#contacto"${linkStyle} ${closeJs}>${esc(n.label)}</a>`
      if (n.target === 'url') return `<a href="${esc(n.url || '#')}"${linkStyle} ${closeJs}>${esc(n.label)}</a>`
      return `<a href="#${sectionIdMap[n.target] || 'hero'}"${linkStyle} ${closeJs}>${esc(n.label)}</a>`
    }).join('\n    ')}
  </div>
</nav>` : ''

  const sectionsHTML = sections
    .filter(s => s.title || s.content || s.image)
    .map(s => {
      const align = s.align || 'left'
      const bg = s.bgColor ? `background:${s.bgColor};` : ''
      const txt = s.textColor ? `color:${s.textColor};` : ''
      const fSize = s.fontSize === 'small' ? 'font-size:0.85rem;' : s.fontSize === 'large' ? 'font-size:1.25rem;' : s.fontSize === 'xlarge' ? 'font-size:1.5rem;' : ''
      const fWeight = s.fontWeight === 'bold' ? 'font-weight:700;' : ''
      const fStyle = s.fontStyle === 'italic' ? 'font-style:italic;' : ''
      const fHeight = s.fullHeight ? 'min-height:100vh;display:flex;flex-direction:column;justify-content:center;' : ''
      const isBackground = s.image && s.imageLayout === 'background'
      const isSide = s.image && (s.imageLayout === 'left' || s.imageLayout === 'right')

      const bgImage = isBackground
        ? `background-image:url('${s.image.dataUrl}');background-size:cover;background-position:center;position:relative;`
        : ''

      const overlay = isBackground
        ? `<div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);"></div>`
        : ''

      const contentStyle = isBackground ? 'position:relative;z-index:1;' : ''

      // Section buttons
      const sButtons = (s.buttons || []).filter(b => b.text)
      const sButtonsHTML = sButtons.length
        ? `<div class="section-buttons">${sButtons.map(b => `<a href="${esc(b.url || '#')}" class="btn-${b.style || 'primary'}">${esc(b.text)}</a>`).join('')}</div>`
        : ''

      const textBlock = `
        <div style="flex:1;${contentStyle}">
          ${s.title ? `<h2>${esc(s.title)}</h2>` : ''}
          ${s.content ? renderContent(s.content) : ''}
          ${sButtonsHTML}
        </div>`

      const imgBlock = s.image && !isBackground
        ? `<img src="${s.image.dataUrl}" alt="" style="max-width:45%;border-radius:12px;object-fit:cover;">`
        : ''

      const fullClass = s.fullWidth ? ' full' : ''
      const animClass = s.animation && s.animation !== 'none' ? ` anim anim-${s.animation}` : ''
      const sectionId = sectionIdMap[s.id] || ''

      if (isSide) {
        const flexDir = s.imageLayout === 'left' ? 'row' : 'row-reverse'
        return `
          <section id="${sectionId}" class="section side${fullClass}${animClass}" style="text-align:${align};${bg}${txt}${fSize}${fWeight}${fStyle}${fHeight}display:flex;flex-wrap:wrap;gap:2rem;align-items:center;flex-direction:${flexDir};">
            ${imgBlock}
            ${textBlock}
          </section>`
      }

      return `
        <section id="${sectionId}" class="section${fullClass}${animClass}" style="text-align:${align};${bg}${txt}${fSize}${fWeight}${fStyle}${fHeight}${bgImage}">
          ${overlay}
          <div style="${contentStyle}">
            ${s.title ? `<h2>${esc(s.title)}</h2>` : ''}
            ${s.content ? renderContent(s.content) : ''}
            ${sButtonsHTML}
          </div>
        </section>`
  }).join('')

  const socialLinks = []
  if (contact.social.facebook) socialLinks.push(`<a href="${esc(contact.social.facebook)}">Facebook</a>`)
  if (contact.social.instagram) socialLinks.push(`<a href="${esc(contact.social.instagram)}">Instagram</a>`)
  if (contact.social.whatsapp) socialLinks.push(`<a href="https://wa.me/${esc(contact.social.whatsapp)}">WhatsApp</a>`)

  const contactHTML = (contact.phone || contact.email || contact.address || socialLinks.length)
    ? `
      <footer id="contacto" class="contact">
        <h2>Contacto</h2>
        ${contact.phone ? `<p>Tel: ${esc(contact.phone)}</p>` : ''}
        ${contact.email ? `<p>Email: ${esc(contact.email)}</p>` : ''}
        ${contact.address ? `<p>${esc(contact.address)}</p>` : ''}
        ${socialLinks.length ? `<div class="social">${socialLinks.join(' ')}</div>` : ''}
      </footer>
    ` : ''

  // FAQ section
  const faqHTML = faq.enabled && faq.items && faq.items.length > 0
    ? `
      <div class="faq-section anim anim-fadeUp">
        <h2>${esc(faq.title || 'Preguntas Frecuentes')}</h2>
        ${faq.items.map(item => `
          <div class="faq-item">
            <div class="faq-q" onclick="this.parentElement.classList.toggle('open')">${esc(item.question)}</div>
            <div class="faq-a">${esc(item.answer)}</div>
          </div>
        `).join('')}
      </div>`
    : ''

  // Contact form
  const formHTML = contactForm.enabled && contactForm.fields && contactForm.fields.length > 0
    ? (() => {
        const fieldInputs = contactForm.fields.map(f => {
          const req = f.required ? ' required' : ''
          if (f.type === 'textarea') {
            return `<label>${esc(f.label)}${f.required ? ' *' : ''}</label><textarea name="${esc(f.label)}" placeholder="${esc(f.label)}"${req}></textarea>`
          }
          const inputType = f.type === 'phone' ? 'tel' : f.type
          return `<label>${esc(f.label)}${f.required ? ' *' : ''}</label><input type="${inputType}" name="${esc(f.label)}" placeholder="${esc(f.label)}"${req}>`
        }).join('\n')

        let submitHandler = ''
        if (contactForm.submitAction === 'mailto' && contactForm.submitEmail) {
          submitHandler = `onsubmit="event.preventDefault();var d=new FormData(this);var b='';d.forEach(function(v,k){b+=k+': '+v+'\\n'});window.location='mailto:${esc(contactForm.submitEmail)}?subject=Contacto&body='+encodeURIComponent(b)"`
        } else if (contactForm.submitAction === 'whatsapp' && contactForm.submitWhatsApp) {
          submitHandler = `onsubmit="event.preventDefault();var d=new FormData(this);var b='';d.forEach(function(v,k){b+=k+': '+v+'\\n'});window.open('https://wa.me/${esc(contactForm.submitWhatsApp)}?text='+encodeURIComponent(b))"`
        } else {
          submitHandler = `onsubmit="event.preventDefault();alert('Mensaje enviado!')"`
        }

        return `
      <div class="contact-form anim anim-fadeUp">
        <h2>Contacto</h2>
        <form ${submitHandler}>
          ${fieldInputs}
          <button type="submit">${esc(contactForm.submitText || 'Enviar')}</button>
        </form>
      </div>`
      })()
    : ''

  // WhatsApp floating button
  const whatsappHTML = whatsapp.enabled && whatsapp.phone
    ? `<a class="whatsapp-float" href="https://wa.me/${esc(whatsapp.phone)}${whatsapp.message ? '?text=' + encodeURIComponent(whatsapp.message) : ''}" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>`
    : ''

  // Typography
  const headingFont = typography.headingFont || 'Outfit'
  const bodyFont = typography.bodyFont || 'Outfit'
  const fontsToLoad = new Set([headingFont, bodyFont, 'Outfit'])
  const fontLinks = [...fontsToLoad].map(f => {
    const val = f.replace(/ /g, '+')
    return `<link href="https://fonts.googleapis.com/css2?family=${val}:wght@300;400;600;700&display=swap" rel="stylesheet">`
  }).join('\n')

  const typographyCss = (headingFont !== 'Outfit' || bodyFont !== 'Outfit')
    ? `\nbody{font-family:'${bodyFont}',sans-serif}h1,h2,h3,h4{font-family:'${headingFont}',sans-serif}`
    : ''

  // Essential styles that must always be present (not in Gemini's CSS)
  const ESSENTIAL_CSS = `.hero-buttons{display:flex;gap:0.75rem;margin-top:1.5rem;flex-wrap:wrap;justify-content:center}
.btn-primary{display:inline-block;padding:0.75rem 2rem;background:#fff;color:#0a0a0a;text-decoration:none;border-radius:8px;font-weight:600;font-size:0.95rem;transition:all 0.2s;border:2px solid #fff}
.btn-primary:hover{background:transparent;color:#fff}
.btn-secondary{display:inline-block;padding:0.75rem 2rem;background:transparent;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:0.95rem;transition:all 0.2s;border:2px solid #444}
.btn-secondary:hover{border-color:#fff}
.btn-outline{display:inline-block;padding:0.75rem 2rem;background:transparent;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:0.95rem;transition:all 0.2s;border:2px solid #666}
.btn-outline:hover{background:#fff;color:#0a0a0a;border-color:#fff}
.section-buttons{display:flex;gap:0.75rem;margin-top:1.5rem;flex-wrap:wrap}
.faq-section{max-width:700px;margin:0 auto;padding:3rem 2rem}
.faq-section h2{font-size:1.5rem;font-weight:600;margin-bottom:1.5rem;color:#fff;text-align:center}
.faq-item{border-bottom:1px solid #222;overflow:hidden}
.faq-q{padding:1rem 0;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-weight:600;color:#fff;font-size:1rem}
.faq-q::after{content:'+';font-size:1.3rem;color:#888;transition:transform 0.3s}
.faq-item.open .faq-q::after{transform:rotate(45deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height 0.3s ease,padding 0.3s ease;color:#999;font-size:0.95rem;line-height:1.7}
.faq-item.open .faq-a{max-height:500px;padding-bottom:1rem}
.contact-form{max-width:600px;margin:0 auto;padding:3rem 2rem}
.contact-form h2{font-size:1.5rem;font-weight:600;margin-bottom:1.5rem;color:#fff;text-align:center}
.contact-form label{display:block;color:#999;font-size:0.85rem;margin-bottom:0.3rem;margin-top:0.75rem}
.contact-form input,.contact-form textarea{width:100%;padding:0.75rem;background:#151515;border:1px solid #333;border-radius:6px;color:#fff;font-family:inherit;font-size:0.95rem;outline:none;transition:border-color 0.2s}
.contact-form input:focus,.contact-form textarea:focus{border-color:#666}
.contact-form textarea{min-height:100px;resize:vertical}
.contact-form button{margin-top:1.25rem;width:100%;padding:0.85rem;background:#fff;color:#0a0a0a;border:none;border-radius:8px;font-weight:600;font-size:1rem;cursor:pointer;transition:background 0.2s}
.contact-form button:hover{background:#ddd}
.whatsapp-float{position:fixed;bottom:24px;right:24px;width:56px;height:56px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:999;transition:transform 0.2s;text-decoration:none}
.whatsapp-float:hover{transform:scale(1.1)}
.whatsapp-float svg{width:28px;height:28px;fill:#fff}
.anim{opacity:0;transition:all 0.8s ease}
.anim.visible{opacity:1;transform:none}
.anim-fadeIn{opacity:0}
.anim-fadeUp{opacity:0;transform:translateY(40px)}
.anim-fadeDown{opacity:0;transform:translateY(-40px)}
.anim-slideLeft{opacity:0;transform:translateX(-60px)}
.anim-slideRight{opacity:0;transform:translateX(60px)}
.anim-zoomIn{opacity:0;transform:scale(0.85)}
.anim-zoomOut{opacity:0;transform:scale(1.15)}
.anim-flip{opacity:0;transform:perspective(600px) rotateY(90deg)}
.anim-bounce{opacity:0;transform:translateY(40px)}
.anim-bounce.visible{animation:bounceIn 0.8s ease forwards}
@keyframes bounceIn{0%{opacity:0;transform:translateY(40px)}60%{opacity:1;transform:translateY(-10px)}80%{transform:translateY(5px)}100%{opacity:1;transform:translateY(0)}}`

  // Use Gemini's CSS if available, otherwise fallback. Always append essential component styles.
  const cssBlock = (customCss || DEFAULT_CSS) + '\n' + ESSENTIAL_CSS + typographyCss

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title) || 'Mi Sitio'}</title>
${fontLinks}
<style>
${cssBlock}
</style>
<script>
document.addEventListener('DOMContentLoaded',function(){
var o=new IntersectionObserver(function(e){e.forEach(function(el){if(el.isIntersecting){el.target.classList.add('visible');o.unobserve(el.target)}})},{threshold:0.15});
document.querySelectorAll('.anim').forEach(function(el){o.observe(el)});
});
</script>
</head>
<body>
${navHTML}
<div id="hero" class="hero${heroAnimClass}" style="text-align:${heroAlign};${heroBgColor}${heroTxtColor}${heroFSize}${heroFWeight}${heroFStyle}${heroFullHeight}${heroBgImage}${heroPositionStyle}">
${heroOverlay}
<div style="${heroContentStyle}">
${logoHTML}
<h1>${esc(title) || 'Tu Titulo Aqui'}</h1>
<p>${esc(subtitle) || 'Tu subtitulo aqui'}</p>
${heroButtonsHTML}
</div>
</div>
${sectionsHTML}
${faqHTML}
${formHTML}
${contactHTML}
${whatsappHTML}
<footer style="text-align:center;padding:18px 10px 14px;font-size:13px;color:#888;border-top:1px solid #eee;margin-top:40px;">Desarrollado por <a href="https://alejandrodelarocha.com" target="_blank" rel="noopener noreferrer" style="color:#666;text-decoration:underline;">Alejandro De La Rocha</a></footer>
</body>
</html>`
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Allow basic HTML from AI-generated content, escape dangerous tags
function renderContent(content) {
  if (/<[a-z][\s\S]*>/i.test(content)) {
    // Content has HTML — sanitize: allow p, ul, ol, li, strong, em, br, h3, h4, span
    return content
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
  }
  return `<p>${esc(content)}</p>`
}
