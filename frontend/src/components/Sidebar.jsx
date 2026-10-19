import styles from './Sidebar.module.css'

function Icon({ children }) {
  return (
    <span className={styles.icon} aria-hidden="true">
      {children}
    </span>
  )
}

const line = {
  width: 20,
  height: 20,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function Sidebar({ open, onClose, onAddTask, onPurge, purging }) {
  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}
        onClick={onClose}
      />

      <aside className={`${styles.drawer} ${open ? styles.open : ''}`} aria-hidden={!open}>
        <div className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4">
              <path d="M5 12.5l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <strong>Todo App.</strong>
        </div>

        <nav className={styles.nav}>
          <button type="button" className={`${styles.item} ${styles.active}`} onClick={onClose}>
            <Icon>
              <svg {...line} viewBox="0 0 24 24">
                <rect x="4" y="4" width="7" height="7" rx="1.5" />
                <rect x="13" y="4" width="7" height="7" rx="1.5" />
                <rect x="4" y="13" width="7" height="7" rx="1.5" />
                <rect x="13" y="13" width="7" height="7" rx="1.5" />
              </svg>
            </Icon>
            Tasks
          </button>

          <button type="button" className={styles.item} onClick={onAddTask}>
            <Icon>
              <svg {...line} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </Icon>
            Add Task
          </button>

          <button type="button" className={styles.item} onClick={onPurge} disabled={purging}>
            <Icon>
              <svg {...line} viewBox="0 0 24 24">
                <path d="M5 7h14M10 11v6M14 11v6M9 7l1-2h4l1 2M8 7l1 13h6l1-13" />
              </svg>
            </Icon>
            {purging ? 'Purging...' : 'Purge Tasks'}
          </button>
        </nav>
      </aside>
    </>
  )
}
