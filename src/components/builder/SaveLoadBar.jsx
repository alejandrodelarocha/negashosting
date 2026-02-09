import { useState, useEffect, useRef } from 'react'
import { saveProject } from '../../utils/projectStorage'

export default function SaveLoadBar({ state, dispatch, onOpenProjects }) {
  const [projectName, setProjectName] = useState(state.projectName || '')
  const [saved, setSaved] = useState(false)
  const projectId = useRef(state.projectId || crypto.randomUUID())

  useEffect(() => {
    if (state.projectName !== undefined) setProjectName(state.projectName)
  }, [state.projectName])

  const handleSave = () => {
    const name = projectName.trim() || 'Mi Proyecto'
    saveProject(projectId.current, name, state)
    dispatch({ type: 'SET_PROJECT_NAME', payload: name })
    dispatch({ type: 'SET_PROJECT_ID', payload: projectId.current })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="save-load-bar">
      <input
        type="text"
        className="builder-input save-name-input"
        placeholder="Nombre del proyecto"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button className="builder-topbar-btn" onClick={handleSave}>
        {saved ? 'Guardado' : 'Guardar'}
      </button>
      <button className="builder-topbar-btn" onClick={onOpenProjects}>
        Cargar
      </button>
    </div>
  )
}
