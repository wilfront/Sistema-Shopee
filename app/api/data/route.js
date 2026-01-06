import { promises as fs } from 'fs'
import path from 'path'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const dataFilePath = path.join(process.cwd(), 'data', 'bipagem.json')
const COLLECTION_NAME = 'bipagem'
const DOC_ID = 'data'

// Detectar se está na Vercel (ambiente serverless)
const isVercel = process.env.VERCEL === '1'

async function ensureDataFile() {
  if (isVercel) return
  try {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true })
    await fs.access(dataFilePath)
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify({ bipados: {}, estoque: [] }))
  }
}

async function loadData() {
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
    return { bipados: {}, estoque: [] }
  }
  
  // Modo local
  await ensureDataFile()
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Erro ao ler dados do arquivo:', error)
    return { bipados: {}, estoque: [] }
  }
}

async function saveData(data) {
  if (isVercel) {
    try {
      const docRef = doc(db, COLLECTION_NAME, DOC_ID)
      await setDoc(docRef, data, { merge: true })
      return true
    } catch (error) {
      console.error('Erro ao salvar dados no Firestore:', error)
      return false
    }
  }
  
  // Modo local
  await ensureDataFile()
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Erro ao salvar dados no arquivo:', error)
    return false
  }
}

export async function GET() {
  try {
    const data = await loadData()
    return Response.json(data)
  } catch (error) {
    console.error('Erro ao ler dados:', error)
    return Response.json({ bipados: {}, estoque: [] })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    const success = await saveData(data)
    
    if (success) {
      return Response.json({ success: true })
    } else {
      return Response.json({ success: false, error: 'Erro ao salvar' }, { status: 500 })
    }
  } catch (error) {
    console.error('Erro ao salvar dados:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
