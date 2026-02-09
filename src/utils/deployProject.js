import generateHTML from './generateHTML'

export default async function deployProject(subdomain, state) {
  const html = generateHTML(state)

  const res = await fetch('/api/deploy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subdomain, html })
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Error al publicar: ${res.status}`)
  }

  return res.json()
}
