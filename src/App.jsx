import { useEffect } from 'react'

const marqueeText = "🔥 WEB HOSTING QUE NO SE CAE NI EN TEMBLOR \u00A0\u00A0•\u00A0\u00A0 99.9% UPTIME GARANTIZADO \u00A0\u00A0•\u00A0\u00A0 SSL GRATIS EN TODOS LOS PLANES \u00A0\u00A0•\u00A0\u00A0 DESDE $29 MXN/MES \u00A0\u00A0•\u00A0\u00A0 SOPORTE 24/7 EN ESPAÑOL \u00A0\u00A0•\u00A0\u00A0 cPanel INCLUIDO \u00A0\u00A0•\u00A0\u00A0 NO SOMOS TELMEX, SÍ FUNCIONAMOS \u00A0\u00A0•\u00A0\u00A0 "

const stats = [
  { value: "99.9%", label: "Uptime" },
  { value: "<15ms", label: "Latencia LATAM" },
  { value: "25K+", label: "Sitios alojados" },
  { value: "24/7", label: "Soporte en Español" },
]

const plans = [
  {
    name: "El Básico",
    price: "$29",
    desc: "Para el que apenas empieza y trae el varo justo.",
    features: ["1 dominio", "1 GB almacenamiento SSD", "Tráfico ilimitado", "SSL gratis", "1 cuenta de correo", "cPanel incluido", "Landing page gratis / Blog / Foro"],
  },
  {
    name: "El Chingón",
    price: "$89",
    desc: "El que la mayoría necesita. Potente y barato.",
    features: ["1 dominio", "5 GB almacenamiento SSD", "Tráfico ilimitado", "SSL gratis", "Correos ilimitados", "Landing page gratis / Blog / Foro"],
    popular: true,
  },
  {
    name: "El Mero Mero",
    price: "$179",
    desc: "Para proyectos serios que necesitan músculo de verdad.",
    features: ["1 dominio", "10 GB almacenamiento NVMe", "Tráfico ilimitado", "SSL gratis + Wildcard", "Correos ilimitados", "Landing page / Blog / Foro", "Soporte prioritario + staging"],
  },
]

const features = [
  { icon: "⚡", title: "Velocidad que vuela", desc: "Servidores con LiteSpeed y SSD NVMe. Tu sitio carga antes de que termines de parpadear." },
  { icon: "🔒", title: "SSL gratis en todo", desc: "Certificado SSL incluido desde el día uno en todos los planes. Tu sitio siempre con candadito verde." },
  { icon: "🌎", title: "Servidores en LATAM", desc: "Datacenter en México, USA y Europa. Latencia bajísima para tu audiencia latina." },
  { icon: "🖥️", title: "cPanel incluido", desc: "Panel de control intuitivo para manejar tu hosting. Crea correos, bases de datos y dominios sin tocar código." },
  { icon: "📸", title: "Backups automáticos", desc: "Respaldos diarios incluidos. Si la riegas, restauras tu sitio en un clic." },
  { icon: "🇲🇽", title: "Soporte en Español", desc: "Nada de bots gringos. Soporte real, 24/7, que te entiende y te contesta rápido." },
]

const faqs = [
  { q: "¿Qué tan rápido se activa mi hosting?", a: "Al instante. Pagas, eliges tu plan, y en menos de 2 minutos ya tienes tu cPanel listo y tu sitio en línea. Nada de \"espere 24-48 horas\"." },
  { q: "¿Puedo instalar WordPress fácilmente?", a: "Con un clic. Tenemos auto-instalador para WordPress, Joomla, PrestaShop y más de 400 apps. Sin tocar una línea de código." },
  { q: "¿Hay penalización por cancelar?", a: "Cero. Sin contratos, sin cargos de cancelación. Pagas mes a mes y te vas cuando quieras sin drama." },
  { q: "¿Qué pasa si mi sitio crece un chorro?", a: "Escalas tu plan en un clic desde el panel. Sin downtime, sin migraciones manuales. Tu sitio crece contigo." },
  { q: "¿Aceptan pagos desde México?", a: "Claro que sí. Tarjeta de crédito/débito, PayPal, y próximamente OXXO y transferencia SPEI." },
  { q: "¿Incluyen correo electrónico?", a: "Sí. Desde el plan básico tienes correo profesional con tu dominio (tu@tusitio.com). En los planes más altos, correos ilimitados." },
]

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.15 })

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0] overflow-x-hidden">
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Marquee */}
      <div className="marquee-bar">
        <span>{marqueeText}{marqueeText}</span>
      </div>

      {/* Nav */}
      <nav className="fixed top-7 left-0 right-0 z-[999] px-10 py-8 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-[20px] border-b border-[#222]">
        <a href="#" className="nav-logo">
          <img src="/logo.png" alt="NegasHosting" className="nav-logo-img" />
          NegasHosting
        </a>
        <ul className="nav-links hidden md:flex">
          <li><a href="#planes">Planes</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#setup">Setup</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <button className="nav-cta">Empezar Ya</button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge animate-fadeUp">
          <span className="status"></span>
          Todos los servidores operando al 100%
        </div>
        <h1 className="animate-fadeUp" style={{ animationDelay: '0.1s' }}>
          HOSTING QUE<br />
          <span className="highlight">NO TE DEJA</span><br />
          EN VISTO
        </h1>
        <p className="hero-sub animate-fadeUp" style={{ animationDelay: '0.2s' }}>
          Web hosting rápido, barato y sin pretextos. Tu sitio merece un server que jale con ganas, no uno que se duerma como tu compa en la chamba.
        </p>
        <div className="hero-actions animate-fadeUp" style={{ animationDelay: '0.3s' }}>
          <button className="btn-primary">Ver Planes desde $29/mes</button>
          <button className="btn-secondary">Ver Demo</button>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar animate-fadeUp" style={{ animationDelay: '0.4s' }}>
        {stats.map(s => (
          <div key={s.label} className="stat">
            <div className="stat-number">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <section id="planes">
        <div className="section-label">// Planes</div>
        <h2 className="section-title">Elige tu poder.</h2>
        <p className="section-desc">Sin contratos, sin letras chiquitas, sin sorpresas. Cancela cuando quieras. Así de fácil.</p>

        <div className="pricing-grid">
          {plans.map(plan => (
            <div key={plan.name} className={`price-card fade-in ${plan.popular ? 'featured' : ''}`}>
              {plan.popular && <div className="price-card-tag">🔥 Popular</div>}
              <div className="price-card-name">{plan.name}</div>
              <div className="price-amount">{plan.price} <span>MXN/mes</span></div>
              <p className="price-desc">{plan.desc}</p>
              <ul className="price-features">
                {plan.features.map(f => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button className="price-btn">Empezar</button>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features">
        <div className="section-label">// ¿Por qué NegasHosting?</div>
        <h2 className="section-title">No es hosting cualquiera.</h2>
        <p className="section-desc">Infraestructura real, no promesas de PowerPoint.</p>

        <div className="features-grid">
          {features.map(f => (
            <div key={f.title} className="feature-card fade-in">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Terminal */}
      <div className="terminal-section" id="setup">
        <div>
          <div className="section-label fade-in">// Tu sitio en línea en minutos</div>
          <h2 className="section-title fade-in">Más fácil que<br />calentar un ramen.</h2>
          <p className="section-desc fade-in">Elige tu plan, conecta tu dominio, y en un par de clics ya tienes tu sitio arriba. WordPress se instala solito.</p>
        </div>
        <div className="terminal-window fade-in">
          <div className="terminal-bar">
            <div className="terminal-dot r"></div>
            <div className="terminal-dot y"></div>
            <div className="terminal-dot g"></div>
            <span>negashosting — panel</span>
          </div>
          <div className="terminal-body">
            <span className="comment"># Instalar WordPress en tu hosting</span><br />
            <span className="cmd">1.</span> Elige plan → <span className="str">El Chingón</span><br />
            <span className="cmd">2.</span> Conecta dominio → <span className="str">tusitio.com</span><br />
            <span className="cmd">3.</span> Auto-install → <span className="str">WordPress 6.x</span><br /><br />
            <span className="success">▸</span> SSL activado automáticamente<br />
            <span className="success">▸</span> Correo: <span className="str">tu@tusitio.com</span> ✓<br />
            <span className="success">▸</span> cPanel listo en: <span className="str">tusitio.com/cpanel</span><br />
            <span className="success">▸</span> Status: <span className="success">EN LÍNEA</span> 🚀<br /><br />
            <span className="comment"># A darle que es mole de olla 🫕</span><br />
            <span className="cmd">$</span> <span className="terminal-cursor"></span>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section id="faq">
        <div className="section-label">// Preguntas Frecuentes</div>
        <h2 className="section-title">Las dudas de siempre.</h2>
        <p className="section-desc">Lo que todo mundo pregunta antes de aventarse.</p>

        <div className="faq-list">
          {faqs.map(faq => (
            <div key={faq.q} className="faq-item fade-in">
              <div className="faq-q">{faq.q}</div>
              <div className="faq-a">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <div className="section-label fade-in">// ¿Listo?</div>
        <h2 className="fade-in">Tu sitio merece<br />un hosting <span style={{ color: '#f0f0f0', textDecoration: 'underline', textDecorationColor: '#444', textUnderlineOffset: '6px' }}>chingón</span>.</h2>
        <p className="fade-in">Empieza con $29 MXN al mes. Sin trucos, sin letras chiquitas. Nada más hosting que funciona.</p>
        <button className="btn-primary fade-in">Crear Mi Cuenta Ahora</button>
      </div>

      {/* Footer */}
      <footer>
        <span>© 2026 NegasHosting. Todos los derechos reservados.</span>
        <div className="footer-links">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
          <a href="#">Status</a>
          <a href="#">Contacto</a>
        </div>
      </footer>
    </div>
  )
}
