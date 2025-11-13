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

const Donations: FC = () => {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <section className={styles.section} id="donations">
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
              <button
                type="button"
                className={`uiButton uiButton--block ${styles.actionButton}`}
                onClick={() => handleCopy(req.value, req.label)}
              >
                {copied === req.label ? 'Скопійовано' : 'Скопіювати реквізит'}
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Donations
