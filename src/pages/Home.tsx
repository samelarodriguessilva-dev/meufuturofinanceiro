
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="grid" style={{gap:24}}>
      <div className="card">
        <h2>Planeje seu futuro com clareza</h2>
        <p className="small">Três calculadoras simples e diretas: Aposentadoria pelo INSS, Previdência Privada e Rescisão Trabalhista. Layout limpo nas cores verde, branco e cinza — resultados sem termos técnicos.</p>
        <div className="warning small">Aviso: as regras do INSS e de rescisão podem mudar com o tempo e variam por caso. Este app usa estimativas simplificadas para ajudar no planejamento inicial.</div>
      </div>
      <div className="grid grid3">
        <div className="card">
          <h3>Aposentadoria INSS</h3>
          <p>Estimativa de tempo restante e valor do benefício.</p>
          <Link to="/inss" className="btn primary">Simular</Link>
        </div>
        <div className="card">
          <h3>Previdência Privada</h3>
          <p>Projeção de saldo futuro e gráfico de crescimento.</p>
          <Link to="/previdencia" className="btn primary">Simular</Link>
        </div>
        <div className="card">
          <h3>Rescisão Trabalhista</h3>
          <p>Estimativa de valores por tipo de rescisão.</p>
          <Link to="/rescisao" className="btn primary">Calcular</Link>
        </div>
      </div>
    </div>
  )
}
