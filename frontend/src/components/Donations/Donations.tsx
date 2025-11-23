import { useState } from 'react'
import type { FC } from 'react'
import styles from './Donations.module.css'

type Brand = 'monobank' | 'card' | 'paypal'

type Requisite = {
  label: string
  value: string
  description: string
  brand: Brand
  isLink?: boolean
}

const requisites: Requisite[] = [
  {
    label: 'Monobank Банка',
    value: 'https://send.monobank.ua/jar/K7etYH1QC',
    description: 'Офіційна банка для швидких переказів карткою чи Apple/Google Pay.',
    brand: 'monobank',
    isLink: true,
  },
  {
    label: 'Карта до банки',
    value: '5375 4112 1940 2984',
    description: 'Якщо зручніше переказати напряму на картку, привʼязану до банки.',
    brand: 'card',
  },
  {
    label: 'PayPal',
    value: 'vatazkoandrej@gmail.com',
    description: 'Для міжнародних донатів у валюті.',
    brand: 'paypal',
  },
]

const brandBadge: Record<Brand, string> = {
  monobank: 'monobank',
  card: 'card transfer',
  paypal: 'paypal',
}

const fallbackCopy = (value: string) => {
  try {
    const textarea = document.createElement('textarea')
    textarea.value = value
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    const successful = document.execCommand('copy')
    document.body.removeChild(textarea)
    return successful
  } catch {
    return false
  }
}

const Donations: FC = () => {
  const [feedback, setFeedback] = useState<{ label: string; status: 'success' | 'error' } | null>(
    null,
  )

  const handleCopy = async (value: string, label: string) => {
    let success = false

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value)
        success = true
      } catch {
        success = false
      }
    }

    if (!success) {
      success = fallbackCopy(value)
    }

    setFeedback({ label, status: success ? 'success' : 'error' })
    window.setTimeout(() => setFeedback(null), 1800)
  }

  return (
    <section className={`${styles.section} pageShell`} id="donations">
      <div className={styles.layout}>
        {requisites.map((req) => (
          <article
            key={req.label}
            className={`uiCard ${styles.card} ${styles[`brand-${req.brand}`] ?? ''}`}
          >
            <div className={styles.cardHeader}>
              <span className={styles.brand}>{brandBadge[req.brand]}</span>
              <p className={styles.label}>{req.label}</p>
              <span className={styles.cardHint}>{req.description}</span>
            </div>
            <div className={styles.value}>{req.value}</div>
            {req.isLink ? (
              <a
                href={req.value}
                target="_blank"
                rel="noreferrer"
                className={`uiButton uiButton--outline uiButton--block ${styles.actionButton}`}
              >
                Відкрити форму
              </a>
            ) : (
              <>
                <button
                  type="button"
                  className={`uiButton uiButton--block ${styles.actionButton}`}
                  onClick={() => handleCopy(req.value, req.label)}
                >
                  {feedback?.label === req.label
                    ? feedback.status === 'success'
                      ? 'Скопійовано'
                      : 'Не вдалося скопіювати'
                    : 'Скопіювати реквізит'}
                </button>
                <span aria-live="polite" className="visually-hidden">
                  {feedback?.label === req.label
                    ? feedback.status === 'success'
                      ? `${req.label} скопійовано`
                      : `Не вдалося скопіювати ${req.label}`
                    : ''}
                </span>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Donations
