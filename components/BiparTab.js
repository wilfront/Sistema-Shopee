'use client'

import { useState } from 'react'
import GridComponent from './GridComponent'
import { Save, Trash2 } from 'lucide-react'

export default function BiparTab({ data, onAddItem, onDeleteItems }) {
  const [gaiola, setGaiola] = useState(1)
  const [codigo, setCodigo] = useState('')
  const [status, setStatus] = useState('Pronto para bipar')
  const [selectedCells, setSelectedCells] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!codigo.trim()) return

    onAddItem(gaiola, codigo.trim())
    setCodigo('')
    setStatus(`✅ Item "${codigo}" adicionado à Gaiola ${gaiola}`)
    setTimeout(() => setStatus('Pronto para bipar'), 3000)
  }

  const handleDelete = () => {
    if (selectedCells.length === 0) {
      alert('Selecione células para apagar')
      return
    }

    if (confirm(`Apagar ${selectedCells.length} item(ns) selecionado(s)?`)) {
      onDeleteItems(selectedCells)
      setSelectedCells([])
      setStatus(`🗑️ ${selectedCells.length} item(ns) apagado(s)`)
      setTimeout(() => setStatus('Pronto para bipar'), 3000)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Input Card */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Gaiola:
            </label>
            <select
              value={gaiola}
              onChange={(e) => setGaiola(Number(e.target.value))}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-shopee-primary focus:border-transparent text-sm sm:text-base"
            >
              {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[300px]">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Código:
            </label>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Digite o código..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-shopee-primary focus:border-transparent"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-shopee-primary text-white font-bold rounded-md hover:bg-shopee-dark transition-colors flex items-center gap-2"
          >
            ✔ Bipar
          </button>

          <span className="text-green-600 font-medium italic">
            {status}
          </span>
        </form>
      </div>

      {/* Grid Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">📋 Grade de Bipagem</h2>
        </div>

        <GridComponent
          data={data.bipados}
          selectedCells={selectedCells}
          onSelectionChange={setSelectedCells}
        />

        {/* Controls */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={handleDelete}
            disabled={selectedCells.length === 0}
            className="px-6 py-2 bg-shopee-primary text-white font-bold rounded-md hover:bg-shopee-dark transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={18} /> Apagar Selecionadas [Del]
          </button>

          <p className="text-sm text-gray-600">
            💡 Dicas: Clique nas células | Shift+Setas = múltiplas | Ctrl+A = todas | Esc = limpar
          </p>
        </div>
      </div>
    </div>
  )
}
