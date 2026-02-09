const STORAGE_KEY = 'negasbuilder_projects'

function getAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function saveProject(id, name, state) {
  const projects = getAll()
  projects[id] = {
    id,
    name,
    title: state.title || 'Sin titulo',
    savedAt: new Date().toISOString(),
    state
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export function listProjects() {
  const projects = getAll()
  return Object.values(projects).sort((a, b) => b.savedAt.localeCompare(a.savedAt))
}

export function loadProject(id) {
  const projects = getAll()
  return projects[id] || null
}

export function deleteProject(id) {
  const projects = getAll()
  delete projects[id]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

// Pending deploy (survives redirect to billing)
const PENDING_KEY = 'negasbuilder_pending_deploy'

export function setPendingDeploy(subdomain, projectId) {
  localStorage.setItem(PENDING_KEY, JSON.stringify({ subdomain, projectId, ts: Date.now() }))
}

export function getPendingDeploy() {
  try {
    const data = JSON.parse(localStorage.getItem(PENDING_KEY))
    if (data && Date.now() - data.ts < 24 * 60 * 60 * 1000) return data
    clearPendingDeploy()
    return null
  } catch { return null }
}

export function clearPendingDeploy() {
  localStorage.removeItem(PENDING_KEY)
}
