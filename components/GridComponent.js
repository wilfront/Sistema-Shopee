'use client'

import { useState, useEffect, useCallback } from 'react'

export default function GridComponent({ data, selectedCells = [], onSelectionChange }) {
  const [anchor, setAnchor] = useState(null)

  // Organiza dados em formato de grid
  const getGridData = () => {
    const maxRows = Math.max(
      ...Object.values(data).map((items) => items?.length || 0),
      0
    )
    
    const grid = []
    for (let row = 0; row < maxRows; row++) {
      const rowData = []
      for (let col = 1; col <= 50; col++) {
        rowData.push(data[col]?.[row] || '')
      }
      grid.push(rowData)
    }
    return grid
  }

  const gridData = getGridData()

  const isCellSelected = (row, col) => {
    return selectedCells.some((cell) => cell.gaiola === col + 1 && cell.index === row)
  }

  const handleCellClick = (row, col, e) => {
    const value = gridData[row][col]
    if (!value) return

    const cellId = { gaiola: col + 1, index: row }

    if (e.ctrlKey || e.metaKey) {
      // Ctrl+Click: toggle
      const isSelected = isCellSelected(row, col)
      if (isSelected) {
        onSelectionChange(selectedCells.filter(
          (c) => !(c.gaiola === cellId.gaiola && c.index === cellId.index)
        ))
      } else {
        onSelectionChange([...selectedCells, cellId])
        setAnchor({ row, col })
      }
    } else {
      // Click simples: nova seleção
      onSelectionChange([cellId])
      setAnchor({ row, col })
    }
  }

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onSelectionChange([])
      setAnchor(null)
      return
    }

    if (e.key === 'Delete') {
      // Delete será tratado pelo componente pai
      return
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
      e.preventDefault()
      // Seleciona todas as células com conteúdo
      const allCells = []
      gridData.forEach((row, rowIdx) => {
        row.forEach((value, colIdx) => {
          if (value) {
            allCells.push({ gaiola: colIdx + 1, index: rowIdx })
          }
        })
      })
      onSelectionChange(allCells)
      return
    }

    // Shift+Arrows: expandir seleção
    if (e.shiftKey && anchor && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
      let newRow = anchor.row
      let newCol = anchor.col

      if (e.key === 'ArrowUp' && anchor.row > 0) newRow--
      if (e.key === 'ArrowDown' && anchor.row < gridData.length - 1) newRow++
      if (e.key === 'ArrowLeft' && anchor.col > 0) newCol--
      if (e.key === 'ArrowRight' && anchor.col < 49) newCol++

      const value = gridData[newRow][newCol]
      if (value) {
        const cellId = { gaiola: newCol + 1, index: newRow }
        if (!isCellSelected(newRow, newCol)) {
          onSelectionChange([...selectedCells, cellId])
        }
        setAnchor({ row: newRow, col: newCol })
      }
    }
  }, [anchor, selectedCells, gridData, onSelectionChange])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="overflow-auto border border-gray-300 rounded-lg max-h-[600px]">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="border border-gray-300 px-2 py-2 text-center bg-gray-200 w-12">
              #
            </th>
            {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
              <th
                key={n}
                className="border border-gray-300 px-4 py-2 text-center font-bold bg-gray-100 min-w-[100px]"
              >
                {n}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {gridData.map((row, rowIdx) => (
            <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-2 py-2 text-center font-bold bg-gray-100">
                {rowIdx + 1}
              </td>
              {row.map((value, colIdx) => (
                <td
                  key={colIdx}
                  onClick={(e) => handleCellClick(rowIdx, colIdx, e)}
                  className={`border border-gray-300 px-4 py-2 text-center cursor-pointer transition-colors ${
                    isCellSelected(rowIdx, colIdx)
                      ? 'cell-selected'
                      : value
                      ? 'cell-hover'
                      : ''
                  }`}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
          {gridData.length === 0 && (
            <tr>
              <td colSpan={51} className="text-center py-8 text-gray-500">
                Nenhum item bipado ainda
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
