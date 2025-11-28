
import { jsPDF } from 'jspdf'
import { formatCurrency, formatNumber } from '@/utils/format'

type ResultCardProps = {
  title: string
  children?: any
  saveHandler?: (data:any)=>void
  dataForSave?: any
  value?: number | string
  format?: 'currency' | 'number' | 'raw'
  className?: string
}

export default function ResultCard({
  title, children, saveHandler, dataForSave, value, format = 'raw', className = ''
}: ResultCardProps) {
  const exportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text(title, 14, 18)
    doc.setFontSize(11)
    const text = (document.getElementById('result-content')?.textContent || '').trim()
    const lines = doc.splitTextToSize(text, 180)
    doc.text(lines, 14, 28)
    doc.save(`${title.replace(/\s+/g,'_')}.pdf`)
  }
  const save = () => { if(saveHandler && dataForSave){ saveHandler(dataForSave) } }

  const formattedValue = (() => {
    if (value === undefined || value === null) return null
    if (format === 'currency') return formatCurrency(value as number)
    if (format === 'number') return formatNumber(value as number)
    return String(value)
  })()

  return (
    <div className={`card ${className}`}>
      <div className="stack" style={{justifyContent:'space-between'}}>
        <h3 style={{margin:0}}>{title}</h3>
        <div className="stack">
          {saveHandler && <button className="btn" onClick={save}>Salvar</button>}
          <button className="btn primary" onClick={exportPDF}>Exportar PDF</button>
        </div>
      </div>

      {formattedValue !== null && (
        <div style={{marginTop:10, marginBottom:8}}>
          <div style={{fontSize: '1.25rem', fontWeight: 800, color:'#1f6f4a'}}>{formattedValue}</div>
        </div>
      )}

      <div id="result-content" style={{marginTop:12}}>
        {children}
      </div>
    </div>
  )
}
