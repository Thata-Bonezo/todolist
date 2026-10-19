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

          <button type="button" className={styles.item} tabIndex={-1}>
            <Icon>
              <svg {...line} viewBox="0 0 24 24">
                <path d="M4 7h16M4 12h10M4 17h13" />
              </svg>
            </Icon>
            Categories
          </button>

          <button type="button" className={styles.item} tabIndex={-1}>
            <Icon>
              <svg {...line} viewBox="0 0 24 24">
                <path d="M7 7h10v10H7z" />
                <path d="M10 12h8M15 9l3 3-3 3" />
              </svg>
            </Icon>
            Transfer
          </button>
        </nav>

        <div className={styles.divider} />

        <nav className={styles.nav}>
          <button type="button" className={styles.item} tabIndex={-1}>
            <Icon>
              <svg {...line} viewBox="0 0 24 24">
                <path d="M9 19c-4.3 1.4-4.3-2.1-6-2.5M15 22v-4a3.4 3.4 0 0 0-1-2.6c3.3-.4 6.8-1.6 6.8-7.4A5.4 5.4 0 0 0 19 4.2 5 5 0 0 0 18.9 1S17.7.6 15 2.5a13 13 0 0 0-6 0C6.3.6 5.1 1 5.1 1A5 5 0 0 0 5 4.2 5.4 5.4 0 0 0 3.2 8c0 5.8 3.5 7 6.8 7.4A3.4 3.4 0 0 0 9 18v4" />
              </svg>
            </Icon>
            Github
            <span className={`${styles.badge} ${styles.green}`}>git</span>
          </button>

          <button type="button" className={styles.item} tabIndex={-1}>
            <Icon>
              <svg {...line} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8v5" />
                <circle cx="12" cy="16" r="0.8" fill="currentColor" />
              </svg>
            </Icon>
            Report issue
            <span className={`${styles.badge} ${styles.orange}`}>new</span>
          </button>

          <button type="button" className={styles.item} tabIndex={-1}>
            <Icon>
              <svg {...line} viewBox="0 0 24 24">
                <path d="M4 12c2-6 14-6 16 0-2 6-14 6-16 0z" />
                <circle cx="12" cy="12" r="2.2" />
              </svg>
            </Icon>
            Buy me a coffee
            <span className={`${styles.badge} ${styles.pink}`}>♥</span>
          </button>

          <button type="button" className={`${styles.item} ${styles.logout}`} tabIndex={-1}>
            <Icon>
              <svg {...line} viewBox="0 0 24 24">
                <path d="M10 7V5a2 2 0 0 1 2-2h7v18h-7a2 2 0 0 1-2-2v-2" />
                <path d="M4 12h11M12 9l3 3-3 3" />
              </svg>
            </Icon>
            Logout
          </button>
        </nav>

        <button type="button" className={styles.settings} tabIndex={-1}>
          Settings
        </button>

        <div className={styles.user}>
          <span className={styles.avatar}>A</span>
          <div>
            <strong>Alex</strong>
            <small>Local workspace</small>
          </div>
        </div>

        <p className={styles.credits}>Todo App. · Oct 2026</p>
      </aside>
    </>
  )
}
