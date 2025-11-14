import type { FC } from 'react'
import { reports } from '../../data/reports'
import ReportCard from './components/ReportCard'
import styles from './Reports.module.css'

const Reports: FC = () => (
  <section className={`${styles.section} pageShell`} id="reports">
    <div className={styles.list}>
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  </section>
)

export default Reports
