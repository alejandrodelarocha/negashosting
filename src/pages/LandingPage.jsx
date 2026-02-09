import { useEffect } from 'react'
import BlurText from '../components/reactbits/BlurText'
import ShinyText from '../components/reactbits/ShinyText'
import CountUp from '../components/reactbits/CountUp'
import SpotlightCard from '../components/reactbits/SpotlightCard'
import DecryptedText from '../components/reactbits/DecryptedText'
import Squares from '../components/reactbits/Squares'
import Threads from '../components/reactbits/Threads'
import StarBorder from '../components/reactbits/StarBorder'
import TargetCursor from '../components/reactbits/TargetCursor'

const marqueeText = "\u{1F525} WEB HOSTING QUE NO SE CAE NI EN TEMBLOR \u00A0\u00A0\u2022\u00A0\u00A0 99.9% UPTIME GARANTIZADO \u00A0\u00A0\u2022\u00A0\u00A0 SSL GRATIS EN TODOS LOS PLANES \u00A0\u00A0\u2022\u00A0\u00A0 DESDE $29 MXN/MES \u00A0\u00A0\u2022\u00A0\u00A0 SOPORTE 24/7 EN ESPA\u00D1OL \u00A0\u00A0\u2022\u00A0\u00A0 cPanel INCLUIDO \u00A0\u00A0\u2022\u00A0\u00A0 NO SOMOS TELMEX, S\u00CD FUNCIONAMOS \u00A0\u00A0\u2022\u00A0\u00A0 "

const stats = [
  { value: 99.9, label: "Uptime", suffix: "%", decimals: 1 },
  { value: 15, label: "Latencia LATAM", prefix: "<", suffix: "ms" },
  { value: 25, label: "Sitios alojados", suffix: "K+" },
  { value: 24, label: "Soporte en Espa\u00F1ol", suffix: "/7" },
]

const plans = [
  {
    name: "El B\u00E1sico",
    price: "$29",
    desc: "Para el que apenas empieza y trae el varo justo.",
    features: ["1 GB almacenamiento SSD", "Tr\u00E1fico ilimitado", "SSL gratis", "Correos ilimitados", "cPanel incluido", "Landing page gratis / Blog / Foro"],
  },
  {
    name: "El Ching\u00F3n",
    price: "$89",
    desc: "El que la mayor\u00EDa necesita. Potente y barato.",
    features: ["5 GB almacenamiento SSD", "Tr\u00E1fico ilimitado", "SSL gratis", "Correos ilimitados", "Landing page gratis / Blog / Foro"],
    popular: true,
  },
  {
    name: "El Mero Mero",
    price: "$179",
    desc: "Para proyectos serios que necesitan m\u00FAsculo de verdad.",
    features: ["10 GB almacenamiento NVMe", "Tr\u00E1fico ilimitado", "SSL gratis + Wildcard", "Correos ilimitados", "Landing page / Blog / Foro", "Soporte prioritario + staging"],
  },
]

const features = [
  { icon: "\u26A1", title: "Velocidad que vuela", desc: "Servidores con LiteSpeed y SSD NVMe. Tu sitio carga antes de que termines de parpadear." },
  { icon: "\u{1F512}", title: "SSL gratis en todo", desc: "Certificado SSL incluido desde el d\u00EDa uno en todos los planes. Tu sitio siempre con candadito verde." },
  { icon: "\u{1F30E}", title: "Servidores en LATAM", desc: "Datacenter en M\u00E9xico, USA y Europa. Latencia baj\u00EDsima para tu audiencia latina." },
  { icon: "\u{1F5A5}\uFE0F", title: "cPanel incluido", desc: "Panel de control intuitivo para manejar tu hosting. Crea correos, bases de datos y dominios sin tocar c\u00F3digo." },
  { icon: "\u{1F4F8}", title: "Backups autom\u00E1ticos", desc: "Respaldos diarios incluidos. Si la riegas, restauras tu sitio en un clic." },
  { icon: "\u{1F1F2}\u{1F1FD}", title: "Soporte en Espa\u00F1ol", desc: "Nada de bots gringos. Soporte real, 24/7, que te entiende y te contesta r\u00E1pido." },
]

const faqs = [
  { q: "\u00BFQu\u00E9 tan r\u00E1pido se activa mi hosting?", a: "Al instante. Pagas, eliges tu plan, y en menos de 2 minutos ya tienes tu cPanel listo y tu sitio en l\u00EDnea. Nada de \"espere 24-48 horas\"." },
  { q: "\u00BFPuedo instalar WordPress f\u00E1cilmente?", a: "Con un clic. Tenemos auto-instalador para WordPress, Joomla, PrestaShop y m\u00E1s de 400 apps. Sin tocar una l\u00EDnea de c\u00F3digo." },
  { q: "\u00BFHay penalizaci\u00F3n por cancelar?", a: "Cero. Sin contratos, sin cargos de cancelaci\u00F3n. Pagas mes a mes y te vas cuando quieras sin drama." },
  { q: "\u00BFQu\u00E9 pasa si mi sitio crece un chorro?", a: "Escalas tu plan en un clic desde el panel. Sin downtime, sin migraciones manuales. Tu sitio crece contigo." },
  { q: "\u00BFAceptan pagos desde M\u00E9xico?", a: "Claro que s\u00ED. Tarjeta de cr\u00E9dito/d\u00E9bito, PayPal, y pr\u00F3ximamente OXXO y transferencia SPEI." },
  { q: "\u00BFIncluyen correo electr\u00F3nico?", a: "S\u00ED. Desde el plan b\u00E1sico tienes correo profesional con tu dominio (tu@tusitio.com). En los planes m\u00E1s altos, correos ilimitados." },
]

export default function LandingPage() {
  const hasSession = document.cookie.includes('PHPSESSID')

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
      <TargetCursor targetSelector=".cursor-target" />
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Marquee */}
      <div className="marquee-bar">
        <span>{marqueeText}{marqueeText}</span>
      </div>

      {/* Nav */}
      <nav className="site-nav">
        <a href="#" className="nav-logo">
          <img src="/logo.png" alt="NegasHosting" className="nav-logo-img" />
          NegasHosting
        </a>
        <ul className="nav-links hidden md:flex">
          <li><a href="#planes">Planes</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#setup">Setup</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href={hasSession ? "https://billing.negashosting.com/" : "https://billing.negashosting.com/login"}>Mi Cuenta</a></li>
        </ul>
        <a href={hasSession ? "https://billing.negashosting.com/" : "https://billing.negashosting.com/signup"} className="nav-cta cursor-target">{hasSession ? "Mi Panel" : "Empezar Ya"}</a>
      </nav>

      {/* Hero */}
      <section className="hero" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Threads
            color={[0.25, 0.25, 0.25]}
            amplitude={1.2}
            distance={0.3}
            enableMouseInteraction
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="hero-badge animate-fadeUp">
            <span className="status"></span>
            <ShinyText text="Todos los servidores operando al 100%" speed={3} color="#999" shineColor="#fff" />
          </div>
          <h1 className="animate-fadeUp" style={{ animationDelay: '0.1s' }}>
            <BlurText
              text="HOSTING QUE"
              delay={80}
              animateBy="words"
              direction="top"
              className="inline-flex justify-center w-full"
            />
            <br />
            <span className="highlight">
              <BlurText
                text="NO TE DEJA"
                delay={80}
                animateBy="words"
                direction="bottom"
                className="inline-flex justify-center"
              />
            </span>
            <br />
            <BlurText
              text="EN VISTO"
              delay={80}
              animateBy="words"
              direction="top"
              className="inline-flex justify-center w-full"
            />
          </h1>
          <p className="hero-sub animate-fadeUp" style={{ animationDelay: '0.2s' }}>
            Web hosting r&aacute;pido, barato y sin pretextos. Tu sitio merece un server que jale con ganas, no uno que se duerma como tu compa en la chamba.
          </p>
          <div className="hero-actions animate-fadeUp" style={{ animationDelay: '0.3s' }}>
            <StarBorder as="a" href="https://billing.negashosting.com/order" color="#fff" speed="5s" className="nav-link cursor-target">
              Ver Planes desde $29/mes
            </StarBorder>
            <button className="btn-secondary cursor-target">Ver Demo</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar animate-fadeUp" style={{ animationDelay: '0.4s' }}>
        {stats.map(s => (
          <div key={s.label} className="stat">
            <div className="stat-number">
              {s.prefix || ''}<CountUp to={s.value} duration={2.5} separator="," className="" />{s.suffix || ''}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <section id="planes">
        <div className="section-label">// Planes</div>
        <h2 className="section-title">Elige tu poder.</h2>
        <p className="section-desc">Sin contratos, sin letras chiquitas, sin sorpresas. Cancela cuando quieras. As&iacute; de f&aacute;cil.</p>

        <div className="pricing-grid">
          {plans.map(plan => (
            <SpotlightCard key={plan.name} className={`price-card fade-in ${plan.popular ? 'featured' : ''}`} spotlightColor="rgba(255,255,255,0.08)">
              {plan.popular && <div className="price-card-tag">{"\u{1F525}"} Popular</div>}
              <div className="price-card-name">
                <DecryptedText text={plan.name} animateOn="view" speed={60} sequential={true} revealDirection="start" className="" encryptedClassName="opacity-40" />
              </div>
              <div className="price-amount">{plan.price} <span>MXN/mes</span></div>
              <p className="price-desc">{plan.desc}</p>
              <ul className="price-features">
                {plan.features.map(f => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="https://billing.negashosting.com/order" className="price-btn cursor-target">Empezar</a>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features">
        <div className="section-label">// &iquest;Por qu&eacute; NegasHosting?</div>
        <h2 className="section-title">No es hosting cualquiera.</h2>
        <p className="section-desc">Infraestructura real, no promesas de PowerPoint.</p>

        <div className="features-grid">
          {features.map(f => (
            <SpotlightCard key={f.title} className="feature-card fade-in" spotlightColor="rgba(255,255,255,0.06)">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Terminal */}
      <div className="terminal-section" id="setup">
        <div>
          <div className="section-label fade-in">// Tu sitio en l&iacute;nea en minutos</div>
          <h2 className="section-title fade-in">M&aacute;s f&aacute;cil que<br />calentar un ramen.</h2>
          <p className="section-desc fade-in">Elige tu plan, conecta tu dominio, y en un par de clics ya tienes tu sitio arriba. WordPress se instala solito.</p>
        </div>
        <div className="terminal-window fade-in">
          <div className="terminal-bar">
            <div className="terminal-dot r"></div>
            <div className="terminal-dot y"></div>
            <div className="terminal-dot g"></div>
            <span>negashosting &mdash; panel</span>
          </div>
          <div className="terminal-body">
            <span className="comment"># Instalar WordPress en tu hosting</span><br />
            <span className="cmd">1.</span> Elige plan &rarr; <span className="str">El Ching&oacute;n</span><br />
            <span className="cmd">2.</span> Conecta dominio &rarr; <span className="str">tusitio.com</span><br />
            <span className="cmd">3.</span> Auto-install &rarr; <span className="str">WordPress 6.x</span><br /><br />
            <span className="success">&#9656;</span> SSL activado autom&aacute;ticamente<br />
            <span className="success">&#9656;</span> Correo: <span className="str">tu@tusitio.com</span> &#10003;<br />
            <span className="success">&#9656;</span> cPanel listo en: <span className="str">tusitio.com/cpanel</span><br />
            <span className="success">&#9656;</span> Status: <span className="success">EN L&Iacute;NEA</span> {"\u{1F680}"}<br /><br />
            <span className="comment"># A darle que es mole de olla {"\u{1FAD5}"}</span><br />
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
      <div className="cta-section" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, zIndex: 0 }}>
          <Squares direction="right" speed={0.2} borderColor="#444" squareSize={60} hoverFillColor="#222" />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label fade-in">// &iquest;Listo?</div>
          <h2 className="fade-in">Tu sitio merece<br />un hosting <span style={{ color: '#f0f0f0', textDecoration: 'underline', textDecorationColor: '#444', textUnderlineOffset: '6px' }}>ching&oacute;n</span>.</h2>
          <p className="fade-in">Empieza con $29 MXN al mes. Sin trucos, sin letras chiquitas. Nada m&aacute;s hosting que funciona.</p>
          <StarBorder as="a" href="https://billing.negashosting.com/signup" color="#fff" speed="5s" className="fade-in">
            Crear Mi Cuenta Ahora
          </StarBorder>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <span>&copy; 2026 NegasHosting. Todos los derechos reservados.</span>
        <div className="footer-links">
          <a href="#">T&eacute;rminos</a>
          <a href="#">Privacidad</a>
          <a href="#">Status</a>
          <a href="#">Contacto</a>
        </div>
        <div className="footer-credit">Desarrollado por <a href="https://alejandrodelarocha.com" target="_blank" rel="noopener noreferrer">Alejandro De La Rocha</a></div>
      </footer>
    </div>
  )
}
