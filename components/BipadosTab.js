export default function BipadosTab({ data }) {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">
        🔲 Visualização Completa das Gaiolas
      </h2>

      <div className="overflow-auto border border-gray-300 rounded-lg max-h-[400px] sm:max-h-[700px]">
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
                    className="border border-gray-300 px-4 py-2 text-center"
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
    </div>
  )
}
