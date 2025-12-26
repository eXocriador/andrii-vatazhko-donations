import type { FC } from 'react'
import SEO from '../components/common/SEO'
import About from '../components/About/About'

const AboutPage: FC = () => (
  <>
    <SEO
      title="Про нас"
      description="Дізнайтесь більше про AV Donations: наші принципи, напрямки роботи та як ми допомагаємо Херсонщині."
      path="/about"
    />
    <About />
  </>
)

export default AboutPage
