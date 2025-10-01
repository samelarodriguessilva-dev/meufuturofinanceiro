
import { jsPDF } from 'jspdf'

export default function ResultCard({ title, children, saveHandler, dataForSave }: { 
  title: string, 
  children: any, 
  saveHandler?: (data:any)=>void,
  dataForSave?: any
}){
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
  return (
    <div className="card">
      <div className="stack" style={{justifyContent:'space-between'}}>
        <h3 style={{margin:0}}>{title}</h3>
        <div className="stack">
          {saveHandler && <button className="btn" onClick={save}>Salvar</button>}
          <button className="btn primary" onClick={exportPDF}>Exportar PDF</button>
        </div>
      </div>
      <div id="result-content" style={{marginTop:12}}>
        {children}
      </div>
    </div>
  )
}
