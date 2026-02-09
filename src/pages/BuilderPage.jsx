import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useBuilderStateWithHistory from '../hooks/useBuilderStateWithHistory'
import BuilderForm from '../components/builder/BuilderForm'
import ProtectedPreview from '../components/builder/ProtectedPreview'
import SaveLoadBar from '../components/builder/SaveLoadBar'
import ProjectListModal from '../components/builder/ProjectListModal'
import exportAsZip from '../utils/exportZip'
import { getPendingDeploy, loadProject } from '../utils/projectStorage'

export default function BuilderPage() {
  const [state, dispatch, { canUndo, canRedo }] = useBuilderStateWithHistory()
  const [showProjectList, setShowProjectList] = useState(false)
  const [pendingDeploy, setPendingDeploy] = useState(null)

  // On mount: check for pending deploy (returning from billing)
  useEffect(() => {
    const pending = getPendingDeploy()
    if (pending) {
      const project = loadProject(pending.projectId)
      if (project) {
        dispatch({ type: 'LOAD_STATE', payload: project.state })
        dispatch({ type: 'SET_PROJECT_ID', payload: pending.projectId })
        dispatch({ type: 'SET_PROJECT_NAME', payload: project.name })
        // Set pending after a tick so state is loaded first
        setTimeout(() => setPendingDeploy(pending), 100)
      }
    }
  }, [])

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault()
        dispatch({ type: 'REDO' })
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault()
        dispatch({ type: 'UNDO' })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch])

  return (
    <div className="builder-page">
      <div className="builder-topbar">
        <div className="builder-topbar-left">
          <Link to="/" className="builder-back">&larr; NegasHosting</Link>
          <span className="builder-topbar-title">Landing Page Builder</span>
        </div>
        <div className="builder-topbar-actions">
          <button
            className="builder-topbar-btn"
            disabled={!canUndo}
            onClick={() => dispatch({ type: 'UNDO' })}
            title="Deshacer (Ctrl+Z)"
          >
            &#x21A9;
          </button>
          <button
            className="builder-topbar-btn"
            disabled={!canRedo}
            onClick={() => dispatch({ type: 'REDO' })}
            title="Rehacer (Ctrl+Shift+Z)"
          >
            &#x21AA;
          </button>
          <span className="builder-topbar-sep" />
          <SaveLoadBar
            state={state}
            dispatch={dispatch}
            onOpenProjects={() => setShowProjectList(true)}
          />
          <span className="builder-topbar-sep" />
          <button
            className="builder-topbar-btn"
            onClick={() => exportAsZip(state)}
          >
            Descargar ZIP
          </button>
        </div>
      </div>
      <div className="builder-layout">
        <div className="builder-panel-left">
          <BuilderForm
            state={state}
            dispatch={dispatch}
            pendingDeploy={pendingDeploy}
            onDeployDone={() => setPendingDeploy(null)}
          />
        </div>
        <div className="builder-panel-right">
          <ProtectedPreview state={state} />
        </div>
      </div>
      {showProjectList && (
        <ProjectListModal
          onClose={() => setShowProjectList(false)}
          onLoad={(projectState, id, name) => {
            dispatch({ type: 'LOAD_STATE', payload: projectState })
            dispatch({ type: 'SET_PROJECT_ID', payload: id })
            dispatch({ type: 'SET_PROJECT_NAME', payload: name })
            setShowProjectList(false)
          }}
        />
      )}
    </div>
  )
}
