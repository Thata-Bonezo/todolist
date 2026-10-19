import styles from './EmptyState.module.css'

export function EmptyState() {
  return (
    <div className={styles.wrap}>
      <div className={styles.art} aria-hidden="true">
        <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
          <rect x="16" y="14" width="56" height="60" rx="14" fill="#ece8ff" />
          <rect x="26" y="8" width="36" height="16" rx="8" fill="#7b61ff" />
          <path d="M32 44h24M32 54h16" stroke="#7b61ff" strokeWidth="3" strokeLinecap="round" />
          <circle cx="64" cy="62" r="14" fill="#1c1c1e" />
          <path d="M58 62.5l4 4 8-9" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className={styles.text}>You have no pending tasks.</p>
    </div>
  )
}
