const API_URL = '/api/data'
const API_MERCADOSPX_URL = '/api/mercadospx'

export async function loadData() {
  try {
    const response = await fetch(API_URL, { cache: 'no-store' })
    if (!response.ok) throw new Error('Erro ao carregar dados')
    return await response.json()
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    return { bipados: {}, estoque: [] }
  }
}

export async function loadMercadoSPX() {
  try {
    const response = await fetch(API_MERCADOSPX_URL, { cache: 'no-store' })
    if (!response.ok) throw new Error('Erro ao carregar dados do Mercado SPX')
    return await response.json()
  } catch (error) {
    console.error('Erro ao carregar dados do Mercado SPX:', error)
    return { vagas: {} }
  }
}

export async function saveMercadoSPX(data) {
  try {
    const response = await fetch(API_MERCADOSPX_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) throw new Error('Erro ao salvar dados do Mercado SPX')
    return await response.json()
  } catch (error) {
    console.error('Erro ao salvar dados do Mercado SPX:', error)
    return { success: false }
  }
}

export async function saveData(data) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) throw new Error('Erro ao salvar dados')
    return await response.json()
  } catch (error) {
    console.error('Erro ao salvar dados:', error)
    return { success: false }
  }
}

export function exportData() {
  const data = loadData()
  const dataStr = JSON.stringify(data, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `bipagem_backup_${new Date().toISOString().split('T')[0]}.json`
  link.click()
  
  URL.revokeObjectURL(url)
}

export function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        saveData(data)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = reject
    reader.readAsText(file)
  })
}
