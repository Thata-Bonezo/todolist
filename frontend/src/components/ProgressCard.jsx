import styles from './ProgressCard.module.css'

export function ProgressCard({ total, completed }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - percent / 100)

  return (
    <section className={styles.card} aria-label="Progresso das tarefas">
      <div className={styles.ringWrap}>
        <svg className={styles.ring} viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7b61ff" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          <circle className={styles.track} cx="50" cy="50" r={radius} />
          <circle
            className={styles.bar}
            cx="50"
            cy="50"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <strong className={styles.percent}>{percent}%</strong>
      </div>

      <div className={styles.stats}>
        <p className={styles.caption}>Today's progress</p>
        <div className={styles.counters}>
          <div>
            <span className={styles.value}>{total}</span>
            <span className={styles.label}>Total</span>
          </div>
          <div>
            <span className={styles.value}>{completed}</span>
            <span className={styles.label}>Concluídas</span>
          </div>
        </div>
      </div>
    </section>
  )
}
