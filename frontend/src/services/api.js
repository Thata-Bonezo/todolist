// Em desenvolvimento o Vite faz proxy de /api → :3333 (evita CORS se a porta mudar).
// Em produção usa VITE_API_URL. Campos de envio: title, dueDate, completed.
function getBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL
  if (import.meta.env.DEV) return ''
  return String(envUrl || 'http://localhost:3333').replace(/\/$/, '')
}

const BASE_URL = getBaseUrl()

async function request(path, options = {}) {
  let response

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    })
  } catch {
    throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está em execução.')
  }

  if (response.status === 204) return null

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Algo deu errado. Tente novamente.')
  }

  return data
}

export function getTasks({ search = '', status = 'all' } = {}) {
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (status && status !== 'all') params.set('status', status)
  const query = params.toString()
  return request(`/api/tasks${query ? `?${query}` : ''}`)
}

export function createTask({ title, dueDate }) {
  const body = { title }
  if (dueDate) body.dueDate = dueDate
  return request('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function updateTask(id, payload) {
  return request(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export function deleteTask(id) {
  return request(`/api/tasks/${id}`, { method: 'DELETE' })
}
