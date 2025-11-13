import type { FC } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getReportById } from '../data/reports'
import styles from './CampaignReportPage.module.css'

const currency = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 0,
})

const CampaignReportPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const report = id ? getReportById(id) : undefined

  if (!report) {
    return <Navigate to="/campaigns" replace />
  }

  const progress = Math.min(100, Math.round((report.amountRaised / report.goal) * 100))
  const [heroImage, ...additionalImages] = report.images

  return (
    <section className={styles.page}>
      <Link to="/campaigns" className={styles.backLink}>
        ← Повернутися до зборів
      </Link>

      <article className={styles.reportCard}>
        <div className={styles.header}>
          <div>
            <span className={styles.date}>{report.date}</span>
            <h1>{report.title}</h1>
            <p className={styles.summary}>{report.summary}</p>
            <div className={styles.tagList}>
              {report.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.heroMedia}>
            {heroImage ? (
              <figure>
                <img src={heroImage.src} alt={heroImage.alt} loading="lazy" decoding="async" />
                <figcaption>{heroImage.alt}</figcaption>
              </figure>
            ) : (
              <div className={styles.mediaPlaceholder}>Фото буде додано після публікації</div>
            )}
          </div>
        </div>

        <div className={styles.stats}>
          <div>
            <span>Зібрано</span>
            <strong>{currency.format(report.amountRaised)}</strong>
          </div>
          <div>
            <span>Ціль</span>
            <strong>{currency.format(report.goal)}</strong>
          </div>
          <div>
            <span>Прогрес</span>
            <strong>{progress}%</strong>
          </div>
        </div>

        <div className={styles.progressBarWrapper}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>

        <div className={styles.details}>
          <h2>Що зробили</h2>
          <p>{report.details}</p>

          <h3>Передано</h3>
          <ul>
            {report.itemsDelivered.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.gallery}>
          {additionalImages.length > 0 ? (
            additionalImages.map((image) => (
              <figure key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                <figcaption>{image.alt}</figcaption>
              </figure>
            ))
          ) : (
            <div className={styles.galleryPlaceholder}>Тут зʼявляться фото зі звіту</div>
          )}
        </div>

        <div className={styles.actions}>
          <Link to="/requisites" className={styles.cta}>
            Підтримати наступний збір
          </Link>
        </div>
      </article>
    </section>
  )
}

export default CampaignReportPage
