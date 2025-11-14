import { useState } from 'react'
import type { FC } from 'react'
import Lightbox from '../../Lightbox/Lightbox'
import type { Report } from '../../../types/report'
import styles from './ReportCard.module.css'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(value)

const buildImageSrc = (url: string) => {
  try {
    const [base, query = ''] = url.split('?')
    const params = new URLSearchParams(query)
    params.set('auto', 'format')
    params.set('fit', 'crop')
    params.set('w', '600')
    params.set('q', '80')
    return `${base}?${params.toString()}`
  } catch {
    return url
  }
}

const ReportCard: FC<{ report: Report }> = ({ report }) => {
  const [open, setOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const progress = Math.min(100, Math.round((report.amountRaised / report.goal) * 100))
  const galleryImages = report.images.map((image) => ({
    src: buildImageSrc(image.src),
    alt: image.alt,
  }))

  const handleOpenLightbox = (index: number) => setLightboxIndex(index)
  const handleCloseLightbox = () => setLightboxIndex(null)

  return (
    <article className={`uiCard ${styles.card}`}>
      <header className={styles.header}>
        <div>
          <p className={styles.date}>{report.date}</p>
          <h3>{report.title}</h3>
          <p className={styles.summary}>{report.summary}</p>
        </div>
        <button
          type="button"
          className={`uiButton uiButton--ghost ${styles.toggle}`}
          onClick={() => setOpen(!open)}
        >
          {open ? 'Згорнути' : 'Детальніше'}
        </button>
      </header>

      <div className={styles.progress}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        <div className={styles.progressMeta}>
          <span>{formatCurrency(report.amountRaised)} зібрано</span>
          <span>Ціль: {formatCurrency(report.goal)}</span>
        </div>
      </div>

      {open && (
        <div className={styles.details}>
          <p>{report.details}</p>
          <ul>
            {report.itemsDelivered.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.gallery}>
            {galleryImages.map((image, idx) => (
              <figure
                key={image.src}
                tabIndex={0}
                role="button"
                onClick={() => handleOpenLightbox(idx)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') handleOpenLightbox(idx)
                }}
              >
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" width={400} height={240} />
                <figcaption>{image.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
      {galleryImages.length > 0 && (
        <Lightbox
          images={galleryImages}
          index={lightboxIndex ?? 0}
          open={lightboxIndex !== null}
          onClose={handleCloseLightbox}
        />
      )}
    </article>
  )
}

export default ReportCard
