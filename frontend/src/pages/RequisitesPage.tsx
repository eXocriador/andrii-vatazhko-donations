import type { FC } from 'react'
import SEO from '../components/common/SEO'
import Donations from '../components/Donations/Donations'

const RequisitesPage: FC = () => (
  <>
    <SEO
      title="Реквізити"
      description="Підтримайте наші збори через Monobank, банківську карту або PayPal. Кожна гривня має значення."
      path="/requisites"
    />
    <Donations />
  </>
)

export default RequisitesPage
