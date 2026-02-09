import { useState, useEffect, useRef } from 'react'
import { saveProject, setPendingDeploy, clearPendingDeploy } from '../../utils/projectStorage'
import deployProject from '../../utils/deployProject'

const BILLING_URL = 'https://billing.negashosting.com/order'

export default function DeployPanel({ state, dispatch, pendingDeploy }) {
  const [subdomain, setSubdomain] = useState('')
  const [status, setStatus] = useState(null)
  const [error, setError] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const deployingRef = useRef(false)

  // Auto-deploy when returning from billing with a pending deploy
  useEffect(() => {
    if (pendingDeploy && !deployingRef.current) {
      setSubdomain(pendingDeploy.subdomain)
      deployingRef.current = true
      doDeploy(pendingDeploy.subdomain)
    }
  }, [pendingDeploy])

  const doDeploy = async (sub) => {
    setStatus('deploying')
    setError('')
    try {
      const result = await deployProject(sub, state)
      setLiveUrl(result.url)
      setStatus('success')
      clearPendingDeploy()
    } catch (err) {
      setError(err.message)
      setStatus('error')
      deployingRef.current = false
    }
  }

  const handlePublish = () => {
    const clean = subdomain.trim().toLowerCase().replace(/[^a-z0-9-]/g, '')
    if (!clean || clean.length < 3) {
      setError('El subdominio debe tener al menos 3 caracteres')
      return
    }

    // Save project first
    const projectId = state.projectId || crypto.randomUUID()
    if (!state.projectId) {
      dispatch({ type: 'SET_PROJECT_ID', payload: projectId })
    }
    saveProject(projectId, state.projectName || state.title || 'Mi Sitio', state)

    // Save pending deploy
    setPendingDeploy(clean, projectId)

    // Redirect to billing
    setStatus('redirecting')
    window.location.href = BILLING_URL
  }

  return (
    <div className="builder-field">
      <label className="builder-label">Publicar</label>
      <div className="deploy-panel">
        <div className="deploy-subdomain">
          <input
            type="text"
            className="builder-input"
            placeholder="mi-negocio"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            disabled={status === 'deploying' || status === 'redirecting' || status === 'success'}
          />
          <span className="deploy-domain">.negashosting.com</span>
        </div>

        {status === 'deploying' && (
          <div className="deploy-status">Publicando tu sitio...</div>
        )}

        {status === 'success' && liveUrl && (
          <div className="deploy-success">
            Tu sitio esta en: <a href={liveUrl} target="_blank" rel="noopener noreferrer">{liveUrl}</a>
          </div>
        )}

        {status !== 'deploying' && status !== 'success' && (
          <button
            className="builder-btn-generate"
            onClick={handlePublish}
            disabled={!subdomain.trim() || status === 'redirecting'}
          >
            {status === 'redirecting' ? 'Redirigiendo a pago...' : 'Publicar y Pagar'}
          </button>
        )}

        {status === 'error' && (
          <>
            <div className="builder-error">{error}</div>
            <button
              className="builder-btn-generate"
              onClick={() => doDeploy(subdomain)}
            >
              Reintentar
            </button>
          </>
        )}
      </div>
    </div>
  )
}
