import { EmptyState } from './EmptyState'
import { TaskItem } from './TaskItem'
import styles from './TaskList.module.css'

export function TaskList({ tasks, loading, onToggle, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className={styles.loading} role="status">
        Carregando tarefas...
      </div>
    )
  }

  if (!tasks.length) {
    return <EmptyState />
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  )
}
