import { promises as fs } from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'bipagem.json')

async function ensureDataFile() {
  try {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true })
    await fs.access(dataFilePath)
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify({ bipados: {}, estoque: [] }))
  }
}

export async function GET() {
  try {
    await ensureDataFile()
    const data = await fs.readFile(dataFilePath, 'utf8')
    return Response.json(JSON.parse(data))
  } catch (error) {
    console.error('Erro ao ler dados:', error)
    return Response.json({ bipados: {}, estoque: [] })
  }
}

export async function POST(request) {
  try {
    await ensureDataFile()
    const data = await request.json()
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
    return Response.json({ success: true })
  } catch (error) {
    console.error('Erro ao salvar dados:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
