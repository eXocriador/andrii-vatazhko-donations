import type { FC } from 'react'
import styles from './LightboxLoader.module.css'

const LightboxLoader: FC = () => (
  <div className={styles.loader} aria-label="Завантаження галереї">
    <div className={styles.spinner} />
    <span className={styles.text}>Завантаження...</span>
  </div>
)

export default LightboxLoader

