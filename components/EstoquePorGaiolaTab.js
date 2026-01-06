'use client'

import { useState } from 'react'

export default function EstoquePorGaiolaTab({ data, estoque }) {
  const [activeGaiola, setActiveGaiola] = useState(1)

  const getGaiolaItems = (gaiola) => {
    return estoque
      .filter((item) => item.gaiola === gaiola)
      .reverse()
  }

  const currentItems = getGaiolaItems(activeGaiola)

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">
        📦 Estoque por Gaiola
      </h2>

      {/* Gaiola tabs - com scroll horizontal */}
      <div className="overflow-x-auto scrollbar-thin mb-6 border-b border-gray-300 pb-4">
        <div className="flex gap-2 min-w-max">
          {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setActiveGaiola(n)}
              className={`px-3 sm:px-4 py-2 font-bold text-xs sm:text-sm rounded transition-colors whitespace-nowrap ${
                activeGaiola === n
                  ? 'bg-white border-2 border-gray-400 text-black'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-sm sm:text-md font-bold text-gray-700 mb-3">
          Gaiola {activeGaiola} - {currentItems.length} item(ns)
        </h3>

        <div className="overflow-auto border border-gray-300 rounded-lg max-h-[400px] sm:max-h-[600px]">
          <table className="w-full min-w-[300px]">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold text-gray-700 border-b">
                  Data/Hora
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold text-gray-700 border-b">
                  Código
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center py-6 sm:py-8 text-sm text-gray-500">
                    Nenhum item nesta gaiola
                  </td>
                </tr>
              ) : (
                currentItems.map((item, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">
                      {item.timestamp}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">
                      {item.codigo}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
