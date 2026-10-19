import styles from './FloatingButton.module.css'

export function FloatingButton({ onClick }) {
  return (
    <button className={styles.fab} type="button" onClick={onClick} aria-label="Add Task">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
    </button>
  )
}
