import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const MERCADOSPX_FILE = path.join(process.cwd(), 'data', 'mercadospx.json')

// Garantir que o diretório existe
function ensureDataDir() {
  const dataDir = path.dirname(MERCADOSPX_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Carregar dados do arquivo
function loadMercadoSPXData() {
  ensureDataDir()
  
  try {
    if (fs.existsSync(MERCADOSPX_FILE)) {
      const data = fs.readFileSync(MERCADOSPX_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Erro ao carregar dados do Mercado SPX:', error)
  }
  
  return { vagas: {} }
}

// Salvar dados no arquivo
function saveMercadoSPXData(data) {
  ensureDataDir()
  
  try {
    fs.writeFileSync(MERCADOSPX_FILE, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('Erro ao salvar dados do Mercado SPX:', error)
    return false
  }
}

// GET - Retornar dados
export async function GET() {
  try {
    const data = loadMercadoSPXData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao carregar dados', details: error.message },
      { status: 500 }
    )
  }
}

// POST - Salvar dados
export async function POST(request) {
  try {
    const data = await request.json()
    const success = saveMercadoSPXData(data)
    
    if (success) {
      return NextResponse.json({ success: true, data })
    } else {
      return NextResponse.json(
        { success: false, error: 'Erro ao salvar dados' },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao processar requisição', details: error.message },
      { status: 500 }
    )
  }
}
