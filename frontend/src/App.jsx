import { useCallback, useEffect, useState } from 'react'
import { FloatingButton } from './components/FloatingButton'
import { ProgressCard } from './components/ProgressCard'
import { SearchBar } from './components/SearchBar'
import { Sidebar } from './components/Sidebar'
import { TaskList } from './components/TaskList'
import { TaskModal } from './components/TaskModal'
import { useDebounce } from './hooks/useDebounce'
import { createTask, deleteTask, getTasks, updateTask } from './services/api'
import { greeting, isCompleted, sortTasks, todayLabel } from './utils/tasks'
import styles from './App.module.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [total, setTotal] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modal, setModal] = useState(null)
  const [purging, setPurging] = useState(false)

  const debouncedSearch = useDebounce(search, 400)

  // GET /api/tasks devolve { tasks, total, completed }. due_date vem do MySQL.
  const loadTasks = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getTasks({ search: debouncedSearch })
      setTasks(sortTasks(data.tasks || []))
      setTotal(data.total ?? 0)
      setCompleted(data.completed ?? 0)
    } catch (err) {
      setError(err.message)
      setTasks([])
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  function openCreate() {
    setSidebarOpen(false)
    setModal({ mode: 'create' })
  }

  function openEdit(task) {
    setModal({ mode: 'edit', task })
  }

  async function handleSave({ title, dueDate }) {
    if (modal?.mode === 'edit') {
      await updateTask(modal.task.id, { title, dueDate })
    } else {
      await createTask({ title, dueDate })
    }

    setModal(null)
    await loadTasks()
  }

  async function handleToggle(task) {
    try {
      await updateTask(task.id, { completed: !isCompleted(task) })
      await loadTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(task) {
    if (!window.confirm(`Excluir "${task.title}"?`)) return

    try {
      await deleteTask(task.id)
      await loadTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handlePurge() {
    setPurging(true)
    try {
      const { tasks: completedTasks } = await getTasks({ status: 'completed' })
      if (!completedTasks?.length) {
        window.alert('Não há tarefas concluídas para excluir.')
        return
      }

      if (!window.confirm('Excluir todas as tarefas concluídas?')) return

      await Promise.all(completedTasks.map((task) => deleteTask(task.id)))
      setSidebarOpen(false)
      await loadTasks()
    } catch (err) {
      setError(err.message)
    } finally {
      setPurging(false)
    }
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div>
          <h1>{greeting()}</h1>
          <p>Let's make this day productive.</p>
          <span className={styles.date}>{todayLabel()}</span>
        </div>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <ProgressCard total={total} completed={completed} />

      <div className={styles.chipRow}>
        <span className={styles.chip}>Tasks ({total})</span>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {error && (
        <div className={styles.error} role="alert">
          {error}
          <button type="button" onClick={loadTasks}>
            Tentar novamente
          </button>
        </div>
      )}

      {!error && (
        <TaskList
          tasks={tasks}
          loading={loading}
          onToggle={handleToggle}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      <nav className={styles.bottomNav} aria-label="Navegação">
        <button type="button" className={styles.navActive} aria-label="Tasks">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 10.5 12 4l8 6.5V20H4z" />
          </svg>
        </button>
        <button type="button" aria-label="Calendário" tabIndex={-1}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="5" width="16" height="15" rx="2" />
            <path d="M4 10h16M8 3v4M16 3v4" />
          </svg>
        </button>
        <button type="button" aria-label="Notificações" tabIndex={-1}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16z" />
            <path d="M10 20a2 2 0 0 0 4 0" />
          </svg>
        </button>
        <button type="button" aria-label="Perfil" tabIndex={-1}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="8" r="3.2" />
            <path d="M5 19c1.5-3 4-4.5 7-4.5S17.5 16 19 19" />
          </svg>
        </button>
      </nav>

      <FloatingButton onClick={openCreate} />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onAddTask={openCreate}
        onPurge={handlePurge}
        purging={purging}
      />

      {modal && (
        <TaskModal
          mode={modal.mode}
          task={modal.task}
          onClose={() => setModal(null)}
          onSubmit={handleSave}
        />
      )}
    </div>
  )
}
