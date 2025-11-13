import type { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import RequisitesPage from './pages/RequisitesPage'
import CampaignsPage from './pages/CampaignsPage'
import CampaignReportPage from './pages/CampaignReportPage'

const App: FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/campaigns/:id/report" element={<CampaignReportPage />} />
          <Route path="/requisites" element={<RequisitesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
)

export default App
