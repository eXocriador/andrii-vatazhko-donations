import type { FC } from 'react'
import SEO from '../components/common/SEO'
import { reports } from '../data/reports'
import styles from './AdminPage.module.css'

const drafts = [
  {
    id: 'boats-next',
    title: 'Катери для Берислава',
    goal: 540000,
    deadline: '10 кві 2025',
  },
  {
    id: 'stabilization',
    title: 'Мобільні стабілізаційні пункти',
    goal: 320000,
    deadline: '21 кві 2025',
  },
]

const workflow = [
  {
    title: 'Заявка',
    description: 'Військові або лікарі залишають запит через форму або Telegram.',
  },
  {
    title: 'Верифікація',
    description: 'Координатори підтверджують запит, формують кошторис та дедлайн.',
  },
  {
    title: 'Збір',
    description: 'Публікуємо кампанію, оновлення й push у соцмережах.',
  },
  {
    title: 'Звіт',
    description: 'Фото/відео із передачі та фінальний акт у PDF.',
  },
]

const currency = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 0,
})

const AdminPage: FC = () => {
  const recentReports = reports.slice(0, 2)

  return (
    <>
      <SEO
        title="Адмін-панель"
        description="Внутрішня CRM для керування зборами та публікації звітів."
        path="/admin"
      />
      <section className={`${styles.page} pageShell`}>
        <header className={styles.header}>
          <span className={styles.badge}>beta</span>
          <h1>Адмін-панель</h1>
          <p>
            Тут зʼявиться внутрішня CRM для керування зборами, аналітики по банці та швидкого
            публікування звітів. Поки що це лише попередній макет.
          </p>
        </header>

        <div className={styles.grid}>
          <article className={`uiCard ${styles.card}`}>
            <div className={styles.cardHeader}>
              <h2>Чернетки зборів</h2>
              <span className={styles.meta}>2 у роботі</span>
            </div>
            <ul className={styles.list}>
              {drafts.map((draft) => (
                <li key={draft.id}>
                  <div>
                    <strong>{draft.title}</strong>
                    <span>
                      {currency.format(draft.goal)} · дедлайн {draft.deadline}
                    </span>
                  </div>
                  <span className={styles.status}>Чернетка</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={`uiCard ${styles.card}`}>
            <div className={styles.cardHeader}>
              <h2>Алгоритм</h2>
              <span className={styles.meta}>4 кроки</span>
            </div>
            <ol className={styles.timeline}>
              {workflow.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </article>

          <article className={`uiCard ${styles.card}`}>
            <div className={styles.cardHeader}>
              <h2>Останні звіти</h2>
              <span className={styles.meta}>auto-sync</span>
            </div>
            <div className={styles.reports}>
              {recentReports.map((report) => (
                <div key={report.id} className={styles.reportItem}>
                  <div>
                    <p className={styles.reportTitle}>{report.title}</p>
                    <p className={styles.reportMeta}>
                      {report.date} · {currency.format(report.amountRaised)}
                    </p>
                  </div>
                  {report.tags[0] && <span className={styles.tag}>{report.tags[0]}</span>}
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className={`uiCard ${styles.callout}`}>
          <div>
            <h3>Вхід буде доступний після релізу бекенду</h3>
            <p>
              Плануємо підтримати авторизацію через email-код та Telegram. Слідкуй за апдейтами.
            </p>
          </div>
          <button type="button" className="uiButton" disabled>
            Вхід тимчасово вимкнено
          </button>
        </div>
      </section>
    </>
  )
}

export default AdminPage
