import styles from './SearchBar.module.css'

export function SearchBar({ value, onChange }) {
  return (
    <label className={styles.wrap}>
      <span className={styles.icon} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3-3" strokeLinecap="round" />
        </svg>
      </span>
      <input
        className={styles.input}
        type="search"
        placeholder="Search tasks..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Buscar tarefas"
      />
    </label>
  )
}
