import { useState, useEffect } from 'react'
import { listProjects, loadProject, deleteProject } from '../../utils/projectStorage'

export default function ProjectListModal({ onClose, onLoad }) {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    setProjects(listProjects())
  }, [])

  const handleDelete = (id) => {
    deleteProject(id)
    setProjects(listProjects())
  }

  const handleLoad = (id) => {
    const project = loadProject(id)
    if (project) onLoad(project.state, project.id, project.name)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Proyectos Guardados</h2>
          <button onClick={onClose}>&times;</button>
        </div>

        {projects.length === 0 ? (
          <p style={{ color: '#707070', fontSize: '0.85rem' }}>No hay proyectos guardados.</p>
        ) : (
          projects.map((p) => (
            <div key={p.id} className="project-list-item">
              <div>
                <span>{p.name}</span>
                <div style={{ fontSize: '0.7rem', color: '#707070', marginTop: '2px' }}>
                  {p.title} &middot; {new Date(p.savedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="project-list-actions">
                <button onClick={() => handleLoad(p.id)}>Cargar</button>
                <button className="danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
