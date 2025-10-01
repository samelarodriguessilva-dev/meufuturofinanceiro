import { useMemo, useState } from 'react'
import { useSaveLoad } from '../components/SaveLoadBar'

export default function ResultsPage(){
  const { list, remove } = useSaveLoad('')
  const [filter, setFilter] = useState<string>('all')

  const entries = useMemo(()=>{
    const all = list()
    return filter==='all' ? all : all.filter((e:any)=>e.type===filter)
  }, [filter, list])

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <h2>Resultados Salvos</h2>
        <div className="stack">
          <button className={'btn'+(filter==='all'?' primary':'')} onClick={()=>setFilter('all')}>Tudo</button>
          <button className={'btn'+(filter==='inss'?' primary':'')} onClick={()=>setFilter('inss')}>INSS</button>
          <button className={'btn'+(filter==='previdencia'?' primary':'')} onClick={()=>setFilter('previdencia')}>Previdência</button>
          <button className={'btn'+(filter==='rescisao'?' primary':'')} onClick={()=>setFilter('rescisao')}>Rescisão</button>
        </div>
      </div>

      <div className="grid" style={{gap:12}}>
        {entries.map((e:any)=>(
          <div className="card" key={e.id}>
            <div className="stack" style={{justifyContent:'space-between'}}>
              <div>
                <div className="small" style={{color:'#6b7280'}}>{new Date(e.createdAt).toLocaleString()}</div>
                <h3 style={{margin:'6px 0'}}>{e.title}</h3>
                <div className="small">Tipo: {e.type?.toUpperCase?.() || '—'}</div>
              </div>
              <button className="btn" onClick={()=>{ remove(e.id); location.reload() }}>Excluir</button>
            </div>
            <pre style={{whiteSpace:'pre-wrap'}} className="small">{JSON.stringify(e.payload, null, 2)}</pre>
          </div>
        ))}
        {entries.length===0 && <div className="card">Nenhum resultado salvo ainda.</div>}
      </div>
    </div>
  )
}
