import type { FC } from 'react'
import styles from './About.module.css'

type FocusArea = {
  title: string
  description: string
}

const focusAreas: FocusArea[] = [
  {
    title: 'Аеророзвідка та БПЛА',
    description: 'Закуповуємо дрони, оптику та комплектуючі для підрозділів, які працюють на передовій.',
  },
  {
    title: 'Тактична медицина',
    description: 'Системно передаємо аптечки, турнікети й евак-носилки в найгарячіші напрямки.',
  },
  {
    title: 'Логістика',
    description: 'Ремонтуємо та купуємо пікапи, швидкі та вантажівки для швидкої доставки спорядження.',
  },
]

const stats = [
  { value: '3+', label: 'роки допомоги' },
  { value: '740+', label: 'виїздів та рейсів' },
  { value: '28', label: 'громад працюють із нами' },
]

const principles = [
  'Щотижневі звіти у Telegram та на сайті',
  'Прямий контакт з підрозділами й лікарнями',
  'Публікуємо бюджети кожного збору до копійки',
]

const About: FC = () => (
  <section className={`${styles.about} pageShell`} id="about">
    <div className={styles.heading}>
      <p className={styles.kicker}>Чим займаємось</p>
      <h2>Прозора допомога з чітким фокусом</h2>
      <p>
        Працюємо безпосередньо з командирами підрозділів і лікарень, щоб спочатку отримати запит,
        а вже потім відкривати збір. Кожна закупівля супроводжується актами передачі.
      </p>
    </div>

    <div className={styles.stats}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.statItem}>
          <span className={styles.statValue}>{stat.value}</span>
          <span className={styles.statLabel}>{stat.label}</span>
        </div>
      ))}
    </div>

    <div className={styles.content}>
      <div className={styles.story}>
        <h3>Як працюємо</h3>
        <p>
          Основна команда базується у Херсоні та Миколаєві. Координуємося з волонтерами в селах,
          щоб знати, де саме потрібні медикаменти, генератори чи евакуаційний транспорт.
        </p>
        <ul>
          <li>аналізуємо потребу разом з місцевим штабом або медиками;</li>
          <li>відкриваємо збір, закуповуємо і власними силами доставляємо вантаж;</li>
          <li>публікуємо фото-, відео- та фінансові звіти в день передачі.</li>
        </ul>
        <div className={styles.principles}>
          {principles.map((principle) => (
            <span key={principle}>{principle}</span>
          ))}
        </div>
      </div>
      <div className={styles.grid}>
        {focusAreas.map((area) => (
          <article className={styles.card} key={area.title}>
            <h3>{area.title}</h3>
            <p>{area.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default About
