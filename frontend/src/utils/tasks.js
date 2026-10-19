export function isCompleted(task) {
  return task.completed === true || task.completed === 1 || task.completed === '1'
}

export function isOverdue(task) {
  if (isCompleted(task) || !task.due_date) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(`${task.due_date}T00:00:00`)
  return due < today
}

export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (!a.due_date && !b.due_date) return 0
    if (!a.due_date) return 1
    if (!b.due_date) return -1
    return a.due_date.localeCompare(b.due_date)
  })
}

export function formatDueDate(value) {
  if (!value) return 'Sem data limite'
  const [year, month, day] = value.split('-')
  return `${day}/${month}/${year}`
}

export function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export function todayLabel() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}
