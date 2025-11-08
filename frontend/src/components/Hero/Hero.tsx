import type { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

const Hero: FC = () => (
  <section className={styles.hero} id="hero">
    <div className={styles.content}>
      <div className={styles.contentInner}>
        <p className={styles.kicker}>Допомога Херсонцям Безкоштовно</p>
        <p className={styles.subtitle}>
          Кожного тижня доставляємо ліки, продуктові набори, гігієну та підтримуємо звʼязок із
          близькими. Допомагаємо безкоштовно тим, хто під обстрілами й в евакуації.
        </p>
        <div className={styles.ctaRow}>
          <Link className={styles.primaryCta} to="/requisites">
            Підтримати зараз
          </Link>
          <Link className={styles.secondaryCta} to="/campaigns">
            Дивитись звіти
          </Link>
          <a
            className={styles.channelCta}
            href="https://t.me/KsHelpAV"
            target="_blank"
            rel="noreferrer"
          >
            Telegram @KsHelpAV
          </a>
        </div>
      </div>
    </div>
  </section>
)

export default Hero
