import { formatDueDate, isCompleted, isOverdue } from '../utils/tasks'
import styles from './TaskItem.module.css'

export function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const done = isCompleted(task)
  const overdue = isOverdue(task)

  return (
    <article className={`${styles.item} ${done ? styles.done : ''}`}>
      <button
        type="button"
        className={`${styles.check} ${done ? styles.checked : ''}`}
        onClick={() => onToggle(task)}
        aria-label={done ? 'Marcar como pendente' : 'Marcar como concluída'}
      >
        {done && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
            <path d="M5 12.5l5 5L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className={styles.body}>
        <h3 className={`${styles.title} ${overdue ? styles.overdueTitle : ''}`}>{task.title}</h3>
        <p className={styles.meta}>
          <span>{formatDueDate(task.due_date)}</span>
          {overdue && <span className={styles.badge}>Em atraso</span>}
        </p>
      </div>

      <div className={styles.avatar} aria-hidden="true">
        {task.title.trim().charAt(0).toUpperCase()}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.iconBtn} onClick={() => onEdit(task)} aria-label="Editar tarefa">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 20h4l11-11-4-4L4 16v4z" strokeLinejoin="round" />
            <path d="M13 5l4 4" />
          </svg>
        </button>
        <button type="button" className={styles.iconBtn} onClick={() => onDelete(task)} aria-label="Excluir tarefa">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 7h14M10 11v6M14 11v6M9 7l1-2h4l1 2M8 7l1 13h6l1-13" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </article>
  )
}
