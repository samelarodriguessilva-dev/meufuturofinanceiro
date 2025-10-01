
import { useMemo, useState } from 'react'
import ResultCard from '../components/ResultCard'
import { fvMonthly } from '../utils/finance'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { useSaveLoad } from '../components/SaveLoadBar'
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function PrivatePensionSimulator(){
  const [aporte, setAporte] = useState(500)
  const [anos, setAnos] = useState(20)
  const [rentab, setRentab] = useState(8)
  const { save } = useSaveLoad('previdencia')

  const saldo = useMemo(()=> fvMonthly(aporte, anos, rentab), [aporte, anos, rentab])
  const series = useMemo(()=>{
    const months = Math.round(anos*12)
    const data = []
    let acc = 0
    const r = Math.pow(1 + rentab/100, 1/12) - 1
    for(let i=1;i<=months;i++){
      acc = acc*(1+r) + aporte
      if(i%12===0) data.push(acc)
    }
    return data
  }, [aporte, anos, rentab])

  const chartData = {
    labels: Array.from({length: Math.round(anos)}, (_,i)=>`${i+1}º ano`),
    datasets: [{ label:'Saldo acumulado (R$)', data: series }]
  }

  const handleSave = (payload:any) => {
    const title = `Previdência • Aporte R$${aporte} • ${anos}a • Saldo ~ R$ ${saldo.toFixed(2)}`
    save(title, payload)
  }

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <h2>Previdência Privada</h2>
        <p className="small">Projeção com aportes mensais constantes. Rentabilidade é ao ano; convertemos para taxa mensal composta.</p>
        <div className="grid grid3">
          <div>
            <div className="label">Aporte mensal (R$)</div>
            <input className="input" type="number" value={aporte} onChange={e=>setAporte(+e.target.value)} />
          </div>
          <div>
            <div className="label">Tempo (anos)</div>
            <input className="input" type="number" value={anos} onChange={e=>setAnos(+e.target.value)} />
          </div>
          <div>
            <div className="label">Rentabilidade (% a.a.)</div>
            <input className="input" type="number" value={rentab} onChange={e=>setRentab(+e.target.value)} />
          </div>
        </div>
      </div>
      <ResultCard title="Resultado - Previdência Privada" saveHandler={handleSave} dataForSave={{aporte, anos, rentab, saldo}}>
        <div className="grid grid3">
          <div className="kpi">
            <div className="hint">Saldo estimado</div>
            <div className="value">R$ {saldo.toFixed(2)}</div>
          </div>
          <div className="kpi">
            <div className="hint">Aportes totais</div>
            <div className="value">R$ {(aporte*12*anos).toFixed(2)}</div>
          </div>
          <div className="kpi">
            <div className="hint">Juros compostos (ganho)</div>
            <div className="value">R$ {(saldo - aporte*12*anos).toFixed(2)}</div>
          </div>
        </div>
        <div style={{marginTop:16}} className="card">
          <Line data={chartData} />
        </div>
      </ResultCard>
    </div>
  )
}
