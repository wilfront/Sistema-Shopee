import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const MERCADOSPX_FILE = path.join(process.cwd(), 'data', 'mercadospx.json')
const COLLECTION_NAME = 'mercadospx'
const DOC_ID = 'data'

// Detectar se está na Vercel (ambiente serverless)
const isVercel = process.env.VERCEL === '1'

// Garantir que o diretório existe (apenas local)
function ensureDataDir() {
  if (isVercel) return
  const dataDir = path.dirname(MERCADOSPX_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Carregar dados do arquivo (local) ou Firestore (Vercel)
async function loadMercadoSPXData() {
  if (isVercel) {
    try {
      const docRef = doc(db, COLLECTION_NAME, DOC_ID)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return docSnap.data()
      }
    } catch (error) {
      console.error('Erro ao carregar dados do Firestore:', error)
    }
    return { vagas: {} }
  }
  
  // Modo local com arquivo
  ensureDataDir()
  
  try {
    if (fs.existsSync(MERCADOSPX_FILE)) {
      const data = fs.readFileSync(MERCADOSPX_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Erro ao carregar dados do arquivo:', error)
  }
  
  return { vagas: {} }
}

// Salvar dados no arquivo (local) ou Firestore (Vercel)
async function saveMercadoSPXData(data) {
  if (isVercel) {
    try {
      const docRef = doc(db, COLLECTION_NAME, DOC_ID)
      // Não usar merge para garantir que exclusões sejam persistidas
      await setDoc(docRef, data)
      return true
    } catch (error) {
      console.error('Erro ao salvar dados no Firestore:', error)
      return false
    }
  }
  
  // Modo local com arquivo
  ensureDataDir()
  
  try {
    fs.writeFileSync(MERCADOSPX_FILE, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('Erro ao salvar dados no arquivo:', error)
    return false
  }
}

// GET - Retornar dados
export async function GET() {
  try {
    const data = await loadMercadoSPXData()
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
    const success = await saveMercadoSPXData(data)
    
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
