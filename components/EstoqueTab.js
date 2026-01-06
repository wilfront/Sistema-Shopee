export default function EstoqueTab({ data }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">
        📊 Histórico de Estoque
      </h2>

      <div className="overflow-auto border border-gray-300 rounded-lg max-h-[400px] sm:max-h-[700px]">
        <table className="w-full min-w-[500px]">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold text-gray-700 border-b">
                Data/Hora
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold text-gray-700 border-b">
                Código
              </th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm font-bold text-gray-700 border-b">
                Gaiola
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6 sm:py-8 text-sm text-gray-500">
                  Nenhum registro no estoque
                </td>
              </tr>
            ) : (
              [...data].reverse().map((item, idx) => (
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
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 text-center font-bold">
                    {item.gaiola}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Total de registros: <span className="font-bold">{data.length}</span>
      </div>
    </div>
  )
}
