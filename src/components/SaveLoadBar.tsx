
type Entry = { id:string; type:string; title:string; payload:any; createdAt:number }

const KEY = 'mff_saved_entries'

function readAll(): Entry[] {
  try{
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  }catch{ return [] }
}
function writeAll(arr: Entry[]){
  localStorage.setItem(KEY, JSON.stringify(arr))
}

export function useSaveLoad(type: string){
  const save = (title:string, payload:any) => {
    const arr = readAll()
    const id = crypto.randomUUID()
    arr.push({ id, type, title, payload, createdAt: Date.now() })
    writeAll(arr)
    alert('Simulação salva! Você pode ver em Resultados.')
  }
  const list = (filterType?:string) => {
    const arr = readAll()
    return filterType ? arr.filter(a=>a.type===filterType) : arr
  }
  const remove = (id:string) => {
    const arr = readAll().filter(a=>a.id!==id); writeAll(arr)
  }
  return { save, list, remove }
}
