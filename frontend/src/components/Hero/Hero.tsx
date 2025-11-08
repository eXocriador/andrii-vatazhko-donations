import type { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

const stats = [
  { label: 'зібрано за 2024', value: '₴12.5М+' },
  { label: 'успішних закритих зборів', value: '48' },
  { label: 'активних команд підтримки', value: '9' },
]

const Hero: FC = () => (
  <section className={styles.hero} id="hero">
    <div className={styles.content}>
      <div className={styles.contentInner}>
        <p className={styles.kicker}>Разом до перемоги</p>
        <h1 className={styles.title}>Збираємо донати для підрозділів, яким довіряємо</h1>
        <p className={styles.subtitle}>
          Фінансуємо розвідку, дрони та евакуаційні авто. Кожна гривня трансформується у реальну
          допомогу для військових.
        </p>
        <div className={styles.ctaRow}>
          <Link className={styles.primaryCta} to="/requisites">
            Підтримати зараз
          </Link>
          <Link className={styles.secondaryCta} to="/campaigns">
            Дивитись звіти
          </Link>
        </div>
        <ul className={styles.stats}>
          {stats.map((item) => (
            <li key={item.label}>
              <span className={styles.statNumber}>{item.value}</span>
              <span className={styles.statLabel}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
)

export default Hero
