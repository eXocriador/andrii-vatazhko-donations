import { useState } from 'react'
import type { FC } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Lightbox from '../components/Lightbox/Lightbox'
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
  const images = report.images.map((image) => ({ src: image.src, alt: image.alt }))
  const [heroImage, ...additionalImages] = images
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (start = 0) => {
    if (images.length > 0) {
      setLightboxIndex(start)
    }
  }

  const closeLightbox = () => setLightboxIndex(null)

  return (
    <section className={`${styles.page} pageShell`}>
      <Link to="/campaigns" className={`uiBackLink ${styles.backLink}`}>
        ← Повернутися до зборів
      </Link>

      <article className={`uiCard ${styles.reportCard}`}>
        <div className={styles.header}>
          <div>
            <span className={styles.date}>{report.date}</span>
            <h1>{report.title}</h1>
            <p className={styles.summary}>{report.summary}</p>
            <div className={styles.tagList}>
              {report.tags.map((tag) => (
                <span key={tag} className={`uiTag ${styles.tag}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.heroMedia}>
            {heroImage ? (
              <figure
                role="button"
                tabIndex={0}
                onClick={() => openLightbox(0)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') openLightbox(0)
                }}
              >
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

        {additionalImages.length > 0 && (
          <button type="button" className={styles.galleryTrigger} onClick={() => openLightbox(1)}>
            Переглянути фото зі звіту
          </button>
        )}

        <div className={styles.actions}>
          <Link to="/requisites" className={`uiButton ${styles.cta}`}>
            Підтримати наступний збір
          </Link>
        </div>
      </article>
      {images.length > 0 && (
        <Lightbox images={images} index={lightboxIndex ?? 0} open={lightboxIndex !== null} onClose={closeLightbox} />
      )}
    </section>
  )
}

export default CampaignReportPage
