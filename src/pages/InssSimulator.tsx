
import { useMemo, useState } from 'react'
import ResultCard from '../components/ResultCard'
import { inssBenefitEstimate } from '../utils/finance'
import { useSaveLoad } from '../components/SaveLoadBar'

export default function InssSimulator(){
  const [idade, setIdade] = useState(35)
  const [tempoContrib, setTempoContrib] = useState(10)
  const [salarioMedio, setSalarioMedio] = useState(3500)
  const [metaAnos, setMetaAnos] = useState(35)
  const { save } = useSaveLoad('inss')

  const anosRestantes = Math.max(0, metaAnos - tempoContrib)
  const idadeEstimativa = idade + anosRestantes
  const beneficio = useMemo(()=> inssBenefitEstimate(salarioMedio, tempoContrib), [salarioMedio, tempoContrib])

  const handleSave = (payload:any) => {
    const title = `INSS • Benefício ~ R$ ${beneficio.toFixed(2)} • Restante ${anosRestantes}a`
    save(title, payload)
  }

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <h2>Aposentadoria pelo INSS</h2>
        <p className="small">Informe sua idade, tempo de contribuição e salário médio de contribuição. Ajuste a meta de anos de contribuição conforme seu cenário.</p>
        <div className="grid grid3">
          <div>
            <div className="label">Idade atual</div>
            <input className="input" type="number" value={idade} onChange={e=>setIdade(+e.target.value)} />
          </div>
          <div>
            <div className="label">Tempo de contribuição (anos)</div>
            <input className="input" type="number" value={tempoContrib} onChange={e=>setTempoContrib(+e.target.value)} />
          </div>
          <div>
            <div className="label">Salário médio (R$)</div>
            <input className="input" type="number" value={salarioMedio} onChange={e=>setSalarioMedio(+e.target.value)} />
          </div>
          <div>
            <div className="label">Meta de anos de contribuição</div>
            <input className="input" type="number" value={metaAnos} onChange={e=>setMetaAnos(+e.target.value)} />
          </div>
        </div>
      </div>

      <ResultCard title="Resultado - INSS" saveHandler={handleSave} dataForSave={{idade, tempoContrib, salarioMedio, metaAnos, beneficio}}>
        <div className="grid grid3">
          <div className="kpi">
            <div className="hint">Tempo restante</div>
            <div className="value">{anosRestantes.toFixed(0)} anos</div>
          </div>
          <div className="kpi">
            <div className="hint">Idade estimada na aposentadoria</div>
            <div className="value">{idadeEstimativa.toFixed(0)} anos</div>
          </div>
          <div className="kpi">
            <div className="hint">Benefício estimado</div>
            <div className="value">R$ {beneficio.toFixed(2)}</div>
          </div>
        </div>
        <p className="small" style={{marginTop:12}}>Estimativa baseada em percentual simplificado sobre o salário médio: 60% + 2% por ano acima de 20 anos de contribuição, limitado a 100%. Ajuste a meta conforme suas regras.</p>
      </ResultCard>
    </div>
  )
}
