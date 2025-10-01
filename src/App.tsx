
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import InssSimulator from './pages/InssSimulator'
import PrivatePensionSimulator from './pages/PrivatePensionSimulator'
import SeveranceCalculator from './pages/SeveranceCalculator'
import ResultsPage from './pages/ResultsPage'

export default function App(){
  return (
    <div>
      <header className="header">
        <div className="header-inner container">
          <div className="logo">MFF</div>
          <div className="title">Meu Futuro Financeiro</div>
          <nav className="nav">
            <Link to="/" className="btn">Início</Link>
            <Link to="/inss" className="btn">Aposentadoria INSS</Link>
            <Link to="/previdencia" className="btn">Previdência Privada</Link>
            <Link to="/rescisao" className="btn">Rescisão</Link>
            <Link to="/resultados" className="btn ghost">Resultados</Link>
          </nav>
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inss" element={<InssSimulator />} />
          <Route path="/previdencia" element={<PrivatePensionSimulator />} />
          <Route path="/rescisao" element={<SeveranceCalculator />} />
          <Route path="/resultados" element={<ResultsPage />} />
        </Routes>
      </main>
      <footer>
        <div className="container">Este app fornece estimativas simplificadas e não substitui orientação profissional. Atualize parâmetros conforme necessário.</div>
      </footer>
    </div>
  )
}
