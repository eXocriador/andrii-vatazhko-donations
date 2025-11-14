import type { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

const Hero: FC = () => (
  <section className={`${styles.hero} pageShell`} id="hero">
    <div className={styles.content}>
      <div className={styles.contentInner}>
        <h1 className={styles.title}>Разом тримаємо гуманітарний фронт</h1>
        <p className={styles.subtitle}>
          Щотижня доправляємо медикаменти, продуктові набори й підтримуємо родини, які залишаються
          вдома або в евакуації. Кожна гривня перетворюється на конкретну доставку.
        </p>
        <div className={styles.ctaRow}>
          <Link className={`${styles.heroCta} ${styles.primaryCta}`} to="/requisites">
            Підтримати зараз
          </Link>
          <Link className={`${styles.heroCta} ${styles.secondaryCta}`} to="/campaigns">
            Дивитись звіти
          </Link>
        </div>
        <p className={styles.telegramHint}>
          Публікуємо звіти по зборам в нашому Telegram-каналі та на сайті. Приєднуйтесь, щоб знати,
          кого підтримуємо саме зараз.
        </p>
        <a
          className={`${styles.heroCta} ${styles.channelCta}`}
          href="https://t.me/KsHelpAV"
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.channelIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M21.5 4.5L18.9 19.2c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.2L18 6.7c.3-.3-.1-.5-.5-.2L7.3 13.6 2.3 11.9c-1.1-.3-1.1-1.1.2-1.6L20.1 3.8c.9-.3 1.7.2 1.4 0.7z" />
            </svg>
          </span>
          <span>
            Telegram <strong>@KsHelpAV</strong>
          </span>
        </a>
      </div>
    </div>
  </section>
)

export default Hero
