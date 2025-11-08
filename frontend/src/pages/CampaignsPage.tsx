import { useMemo, useState } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import Reports from '../components/Reports/Reports'
import styles from './CampaignsPage.module.css'

type Campaign = {
  id: string
  title: string
  summary: string
  goal: number
  raised: number
  deadline: string
  tags: string[]
}

const activeCampaigns: Campaign[] = [
  {
    id: 'boats-2025',
    title: 'Катери та мотори для Херсонської евакуації',
    summary: 'Фінансуємо 2 гумові човни, ехо-лод та мотори, щоби вивозити людей з підтоплених сіл.',
    goal: 420000,
    raised: 235000,
    deadline: '28 бер 2025',
    tags: ['Евакуація', 'Гуманітарка'],
  },
  {
    id: 'med-2025',
    title: 'Тактична медицина для штурмових груп',
    summary:
      'Збираємо на 120 аптечок IFAK, турнікети й декомпресійні голки для підрозділів на лівому березі.',
    goal: 310000,
    raised: 148000,
    deadline: '10 кві 2025',
    tags: ['Медицина', 'Штурмові групи'],
  },
  {
    id: 'drones-2025',
    title: 'Парк FPV-дронів для 124 бригади',
    summary: 'Закуповуємо 40 FPV, станції для зарядки й комплекти антен.',
    goal: 520000,
    raised: 402000,
    deadline: '02 тра 2025',
    tags: ['FPV', 'Розвідка'],
  },
]

const currency = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 0,
})

const CampaignsPage: FC = () => {
  const [tab, setTab] = useState<'active' | 'reports'>('active')
  const campaigns = useMemo(() => activeCampaigns, [])

  return (
    <section className={styles.page}>
      {/* <div className={styles.heading}>
        <h1>Керування зборами</h1>
        <p>Відстежуй активні кампанії та переглядай звіти для вже закритих зборів.</p>
      </div> */}
      <div className={styles.tabs}>
        <button
          type="button"
          className={
            tab === 'active' ? `${styles.tabButton} ${styles.tabButtonActive}` : styles.tabButton
          }
          onClick={() => setTab('active')}
        >
          Активні збори
        </button>
        <button
          type="button"
          className={
            tab === 'reports' ? `${styles.tabButton} ${styles.tabButtonActive}` : styles.tabButton
          }
          onClick={() => setTab('reports')}
        >
          Закриті / звіти
        </button>
      </div>

      {tab === 'active' ? (
        <div className={styles.grid}>
          {campaigns.map((campaign) => {
            const progress = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100))
            return (
              <article key={campaign.id} className={styles.card}>
                <h3>{campaign.title}</h3>
                <p>{campaign.summary}</p>
                <div className={styles.meta}>
                  <span>
                    {currency.format(campaign.raised)} з {currency.format(campaign.goal)}
                  </span>
                  <span>{campaign.deadline}</span>
                </div>
                <div className={styles.progressBarWrapper}>
                  <div className={styles.progressBar} style={{ width: `${progress}%` }} />
                </div>
                <div className={styles.tags}>
                  {campaign.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to="/requisites" className={styles.cta}>
                  Підтримати
                </Link>
              </article>
            )
          })}
        </div>
      ) : (
        <Reports />
      )}
    </section>
  )
}

export default CampaignsPage
