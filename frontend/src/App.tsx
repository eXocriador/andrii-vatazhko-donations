import type { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import './styles/ui.css'
import ErrorBoundary from './components/common/ErrorBoundary'
import ScrollToTop from './components/common/ScrollToTop'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import CampaignReportPage from './pages/CampaignReportPage'
import CampaignsPage from './pages/CampaignsPage'
import Home from './pages/Home'
import RequisitesPage from './pages/RequisitesPage'

const App: FC = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Header />
        <main id="main" className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/campaigns/:id/report" element={<CampaignReportPage />} />
            <Route path="/requisites" element={<RequisitesPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </ErrorBoundary>
)

export default App
