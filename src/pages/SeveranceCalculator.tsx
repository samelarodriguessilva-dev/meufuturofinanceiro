
import { useMemo, useState } from 'react'
import ResultCard from '../components/ResultCard'
import { severanceEstimate } from '../utils/finance'
import { useSaveLoad } from '../components/SaveLoadBar'

export default function SeveranceCalculator(){
  const [salary, setSalary] = useState(4000)
  const [years, setYears] = useState(3)
  const [monthsYear, setMonthsYear] = useState(8)
  const [hasOverdueVacation, setHasOverdueVacation] = useState(false)
  const [tipo, setTipo] = useState<'pedido'|'sem_justa_causa'|'com_justa_causa'>('sem_justa_causa')
  const { save } = useSaveLoad('rescisao')

  const result = useMemo(()=> severanceEstimate({
    salary, companyYears: years, monthsInCurrentYear: monthsYear, hasOverdueVacation, type: tipo
  }), [salary, years, monthsYear, hasOverdueVacation, tipo])

  const handleSave = (payload:any) => {
    const title = `Rescisão • ${tipo.replaceAll('_',' ')} • Total ~ R$ ${result.total.toFixed(2)}`
    save(title, payload)
  }

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <h2>Rescisão Trabalhista</h2>
        <p className="small">Cálculo aproximado com base em verbas comuns. Valores reais variam por convenção e caso específico.</p>
        <div className="grid grid3">
          <div>
            <div className="label">Salário atual (R$)</div>
            <input className="input" type="number" value={salary} onChange={e=>setSalary(+e.target.value)} />
          </div>
          <div>
            <div className="label">Tempo de empresa (anos)</div>
            <input className="input" type="number" value={years} onChange={e=>setYears(+e.target.value)} />
          </div>
          <div>
            <div className="label">Meses trabalhados no ano atual</div>
            <input className="input" type="number" value={monthsYear} onChange={e=>setMonthsYear(+e.target.value)} />
          </div>
          <div>
            <div className="label">Férias vencidas?</div>
            <select className="select" value={hasOverdueVacation? 'sim' : 'nao'} onChange={e=>setHasOverdueVacation(e.target.value==='sim')}>
              <option value="nao">Não</option>
              <option value="sim">Sim</option>
            </select>
          </div>
          <div>
            <div className="label">Tipo de rescisão</div>
            <select className="select" value={tipo} onChange={e=>setTipo(e.target.value as any)}>
              <option value="pedido">Pedido de demissão</option>
              <option value="sem_justa_causa">Sem justa causa</option>
              <option value="com_justa_causa">Com justa causa</option>
            </select>
          </div>
        </div>
      </div>

      <ResultCard title="Resultado - Rescisão Trabalhista" saveHandler={handleSave} dataForSave={{salary, years, monthsYear, hasOverdueVacation, tipo, result}}>
        <div className="grid grid3">
          <div className="kpi"><div className="hint">Aviso prévio</div><div className="value">R$ {result.avisoPrevio.toFixed(2)}</div></div>
          <div className="kpi"><div className="hint">13º proporcional</div><div className="value">R$ {result.decimoProporcional.toFixed(2)}</div></div>
          <div className="kpi"><div className="hint">Férias proporcionais (+1/3)</div><div className="value">R$ {result.feriasProporcionais.toFixed(2)}</div></div>
          <div className="kpi"><div className="hint">Férias vencidas (+1/3)</div><div className="value">R$ {result.feriasVencidas.toFixed(2)}</div></div>
          <div className="kpi"><div className="hint">FGTS - depósitos aprox.</div><div className="value">R$ {result.fgtsDeposits.toFixed(2)}</div></div>
          <div className="kpi"><div className="hint">Multa FGTS</div><div className="value">R$ {result.multaFgts.toFixed(2)}</div></div>
        </div>
        <h3>Total estimado: R$ {result.total.toFixed(2)}</h3>
        <p className="small">Atenção: aviso-prévio pode variar por tempo de serviço; depósitos e multa do FGTS dependem do saldo real. Use como referência inicial.</p>
      </ResultCard>
    </div>
  )
}
