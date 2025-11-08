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

const About: FC = () => (
  <section className={styles.about} id="about">
    <div className={styles.heading}>
      <p className={styles.kicker}>Чим займаємось</p>
      <h2>Прозора допомога з чітким фокусом</h2>
      <p>
        Працюємо безпосередньо з командирами підрозділів і щотижня публікуємо фінансові звіти,
        щоби ти знав, куди пішли твої кошти.
      </p>
    </div>
    <div className={styles.grid}>
      {focusAreas.map((area) => (
        <article className={styles.card} key={area.title}>
          <h3>{area.title}</h3>
          <p>{area.description}</p>
        </article>
      ))}
    </div>
  </section>
)

export default About
