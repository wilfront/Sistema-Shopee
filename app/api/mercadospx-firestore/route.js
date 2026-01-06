import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const COLLECTION_NAME = 'mercadospx'
const DOC_ID = 'data'

// GET - Retornar dados do Firestore
export async function GET() {
  try {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data())
    } else {
      // Retornar estrutura vazia se não existir
      return NextResponse.json({ vagas: {} })
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
    return NextResponse.json(
      { error: 'Erro ao carregar dados', details: error.message },
      { status: 500 }
    )
  }
}

// POST - Salvar dados no Firestore
export async function POST(request) {
  try {
    const data = await request.json()
    const docRef = doc(db, COLLECTION_NAME, DOC_ID)
    
    await setDoc(docRef, data, { merge: true })
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Erro ao salvar dados:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao salvar dados', details: error.message },
      { status: 500 }
    )
  }
}
