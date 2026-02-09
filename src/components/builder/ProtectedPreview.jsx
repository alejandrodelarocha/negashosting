import { useState, useEffect, useRef } from 'react'
import generateHTML from '../../utils/generateHTML'
import protectHTML from '../../utils/protectHTML'

const viewports = [
  { id: 'desktop', label: '🖥', width: '100%' },
  { id: 'tablet', label: '⊞', width: '768px' },
  { id: 'mobile', label: '📱', width: '375px' },
]

export default function ProtectedPreview({ state }) {
  const [blobUrl, setBlobUrl] = useState(null)
  const [viewport, setViewport] = useState('desktop')
  const timeoutRef = useRef(null)
  const prevUrlRef = useRef(null)

  useEffect(() => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      const html = generateHTML(state)
      const protected_ = protectHTML(html)
      const blob = new Blob([protected_], { type: 'text/html' })
      const url = URL.createObjectURL(blob)

      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current)
      prevUrlRef.current = url
      setBlobUrl(url)
    }, 250)

    return () => clearTimeout(timeoutRef.current)
  }, [state])

  useEffect(() => {
    return () => {
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current)
    }
  }, [])

  const current = viewports.find(v => v.id === viewport)

  return (
    <div className="builder-preview-wrapper">
      <div className="preview-toolbar">
        {viewports.map(v => (
          <button
            key={v.id}
            className={`preview-viewport-btn ${viewport === v.id ? 'active' : ''}`}
            onClick={() => setViewport(v.id)}
            title={v.id}
          >
            {v.label}
          </button>
        ))}
        <span className="preview-viewport-label">
          {viewport === 'desktop' ? 'Desktop' : viewport === 'tablet' ? 'Tablet (768px)' : 'Mobile (375px)'}
        </span>
      </div>
      <div className="preview-container">
        <div
          className={`preview-device ${viewport !== 'desktop' ? 'preview-device-framed' : ''}`}
          style={{ width: current.width }}
        >
          {blobUrl && (
            <iframe
              src={blobUrl}
              sandbox="allow-scripts allow-same-origin"
              className="builder-preview-iframe"
            />
          )}
          <div className="builder-preview-overlay" style={{ pointerEvents: 'none' }} />
        </div>
      </div>
    </div>
  )
}
