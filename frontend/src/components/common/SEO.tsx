import type { FC } from 'react'
import { Helmet } from 'react-helmet-async'

type SEOProps = {
  title?: string
  description?: string
  image?: string
  path?: string
  type?: string
}

const BASE_URL = 'https://andrii-vatazhko-donations.vercel.app'
const DEFAULT_TITLE = 'AV Donations · Волонтерська підтримка Андрія Ватажка'
const DEFAULT_DESCRIPTION =
  'AV Donations допомагає Андрію Ватажку та команді швидко збирати кошти на гуманітарні місії, техніку й медицину для Херсона.'
const DEFAULT_IMAGE = `${BASE_URL}/kherson.webp`

const SEO: FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  path = '',
  type = 'website',
}) => {
  const fullTitle = title ? `${title} · AV Donations` : DEFAULT_TITLE
  const url = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="AV Donations" />
      <meta property="og:locale" content="uk_UA" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO

