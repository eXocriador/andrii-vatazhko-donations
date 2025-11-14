import { useMemo, useState } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { reports } from '../data/reports'
import styles from './CampaignsPage.module.css'

type CampaignStatus = 'active' | 'closed'

type Campaign = {
  id: string
  title: string
  summary: string
  goal: number
  raised: number
  deadline: string
  tags: string[]
  status: CampaignStatus
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
    status: 'active',
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
    status: 'active',
  },
  {
    id: 'drones-2025',
    title: 'Парк FPV-дронів для 124 бригади',
    summary: 'Закуповуємо 40 FPV, станції для зарядки й комплекти антен.',
    goal: 520000,
    raised: 402000,
    deadline: '02 тра 2025',
    tags: ['FPV', 'Розвідка'],
    status: 'active',
  },
]

const closedCampaigns: Campaign[] = reports.map((report) => ({
  id: report.id,
  title: report.title,
  summary: report.summary,
  goal: report.goal,
  raised: report.amountRaised,
  deadline: report.date,
  tags: report.tags,
  status: 'closed' as const,
}))

const currency = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 0,
})

const CampaignCard: FC<{ campaign: Campaign }> = ({ campaign }) => {
  const progress = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100))
  const isClosed = campaign.status === 'closed'

  return (
    <article className={`uiCard ${styles.card} ${isClosed ? styles.cardClosed : ''}`}>
      <div className={styles.cardHeader}>
        <span className={`${styles.statusBadge} ${isClosed ? styles.statusClosed : styles.statusActive}`}>
          {isClosed ? 'Збір завершено' : 'Активний збір'}
        </span>
        <div>
          <h3>{campaign.title}</h3>
          <p>{campaign.summary}</p>
        </div>
      </div>
      <div className={styles.meta}>
        <span>
          {currency.format(campaign.raised)} з {currency.format(campaign.goal)}
        </span>
        <span>{isClosed ? `Закрито: ${campaign.deadline}` : `До: ${campaign.deadline}`}</span>
      </div>
      <div
        className={
          isClosed
            ? `${styles.progressBarWrapper} ${styles.progressBarWrapperClosed}`
            : styles.progressBarWrapper
        }
      >
        <div
          className={`${styles.progressBar} ${isClosed ? styles.progressBarClosed : ''}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={styles.tags}>
        {campaign.tags.map((tag) => (
          <span key={tag} className={`uiTag ${styles.tag}`}>
            {tag}
          </span>
        ))}
      </div>
      <Link
        to={isClosed ? `/campaigns/${campaign.id}/report` : '/requisites'}
        className={
          isClosed
            ? `uiButton uiButton--ghost ${styles.cta} ${styles.ctaClosed}`
            : `uiButton ${styles.cta}`
        }
      >
        {isClosed ? 'Переглянути звіт' : 'Підтримати'}
      </Link>
    </article>
  )
}

const CampaignsPage: FC = () => {
  const [tab, setTab] = useState<'active' | 'reports'>('active')
  const campaigns = useMemo(() => activeCampaigns, [])
  const finishedCampaigns = useMemo(() => closedCampaigns, [])

  return (
    <section className={`${styles.page} pageShell`}>
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
        <div className={styles.list}>
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className={styles.list}>
          {finishedCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </section>
  )
}

export default CampaignsPage
