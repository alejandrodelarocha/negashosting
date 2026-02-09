import express from 'express'
import { execSync } from 'child_process'
import { writeFileSync, existsSync } from 'fs'

const app = express()
app.use(express.json({ limit: '10mb' }))

const DOMAIN_SUFFIX = 'negashosting.com'
const HESTIA_USER = 'admin'

app.post('/api/deploy', (req, res) => {
  const { subdomain, html } = req.body

  if (!subdomain || !html) {
    return res.status(400).json({ error: 'Faltan subdomain o html' })
  }

  if (!/^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/.test(subdomain)) {
    return res.status(400).json({ error: 'Subdominio invalido (3-30 caracteres, letras minusculas, numeros, guiones)' })
  }

  // Block reserved subdomains
  const reserved = ['www', 'mail', 'billing', 'server', 'admin', 'api', 'ftp', 'cpanel', 'webmail']
  if (reserved.includes(subdomain)) {
    return res.status(400).json({ error: 'Ese subdominio esta reservado' })
  }

  const domain = `${subdomain}.${DOMAIN_SUFFIX}`
  const webDir = `/home/${HESTIA_USER}/web/${domain}/public_html`

  try {
    const domainExists = existsSync(`/home/${HESTIA_USER}/web/${domain}`)

    if (!domainExists) {
      execSync(`/usr/local/hestia/bin/v-add-web-domain ${HESTIA_USER} ${domain}`, { timeout: 30000 })

      // SSL (may fail if DNS not propagated yet)
      try {
        execSync(`/usr/local/hestia/bin/v-add-letsencrypt-domain ${HESTIA_USER} ${domain}`, { timeout: 60000 })
      } catch (sslErr) {
        console.warn('SSL pendiente (DNS puede no estar propagado):', sslErr.message)
      }
    }

    writeFileSync(`${webDir}/index.html`, html, 'utf-8')
    execSync(`chown ${HESTIA_USER}:${HESTIA_USER} ${webDir}/index.html`)

    res.json({ url: `https://${domain}`, domain })
  } catch (err) {
    console.error('Deploy error:', err)
    res.status(500).json({ error: `Error al publicar: ${err.message}` })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Deploy API en puerto ${PORT}`)
})
