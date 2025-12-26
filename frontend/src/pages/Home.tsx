import type { FC } from 'react'
import SEO from '../components/common/SEO'
import Hero from '../components/Hero/Hero'

const Home: FC = () => (
  <>
    <SEO
      title="Головна"
      description="AV Donations допомагає Андрію Ватажку та команді швидко збирати кошти на гуманітарні місії, техніку й медицину для Херсона."
    />
    <Hero />
  </>
)

export default Home
