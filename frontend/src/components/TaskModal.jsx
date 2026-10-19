import { useEffect, useState } from 'react'
import styles from './TaskModal.module.css'

export function TaskModal({ mode, task, onClose, onSubmit }) {
  const isEdit = mode === 'edit'
  const [title, setTitle] = useState(task?.title ?? '')
  const [dueDate, setDueDate] = useState(task?.due_date ?? '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim()) {
      setError('O título é obrigatório.')
      return
    }

    setSaving(true)
    setError('')

    try {
      await onSubmit({
        title: title.trim(),
        dueDate: dueDate || null,
      })
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="task-modal-title">{isEdit ? 'Edit Task' : 'Create Task'}</h2>

        <form onSubmit={handleSubmit}>
          <label className={styles.field}>
            Título
            <input
              autoFocus
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Nome da tarefa"
            />
          </label>

          <label className={styles.field}>
            Data limite (opcional)
            <input type="date" value={dueDate || ''} onChange={(event) => setDueDate(event.target.value)} />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.save} disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
