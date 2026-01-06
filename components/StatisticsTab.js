'use client'

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#EE4D2D', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function StatisticsTab({ data }) {
  // Conta itens por gaiola
  const getGaiolaStats = () => {
    const stats = {}
    Object.entries(data.bipados).forEach(([gaiola, items]) => {
      if (items && items.length > 0) {
        stats[gaiola] = items.length
      }
    })
    return stats
  }

  const gaiolaStats = getGaiolaStats()
  
  // Dados para gráfico de barras (top 10)
  const barData = Object.entries(gaiolaStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([gaiola, count]) => ({
      gaiola: `G${gaiola}`,
      quantidade: count,
    }))

  // Dados para gráfico de pizza (top 6)
  const pieData = Object.entries(gaiolaStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([gaiola, count]) => ({
      name: `Gaiola ${gaiola}`,
      value: count,
    }))

  const totalItems = data.estoque.length
  const totalGaiolas = Object.keys(gaiolaStats).length

  return (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-600 mb-2">Total de Itens</div>
          <div className="text-3xl font-bold text-shopee-primary">{totalItems}</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-600 mb-2">Gaiolas Utilizadas</div>
          <div className="text-3xl font-bold text-blue-600">{totalGaiolas}</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-sm text-gray-600 mb-2">Média por Gaiola</div>
          <div className="text-3xl font-bold text-green-600">
            {totalGaiolas > 0 ? (totalItems / totalGaiolas).toFixed(1) : 0}
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            📊 Top 10 Gaiolas - Quantidade de Itens
          </h3>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="gaiola" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantidade" fill="#EE4D2D" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              Sem dados para exibir
            </div>
          )}
        </div>

        {/* Gráfico de Pizza */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            🥧 Distribuição - Top 6 Gaiolas
          </h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              Sem dados para exibir
            </div>
          )}
        </div>
      </div>

      {/* Tabela detalhada */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          📋 Detalhamento por Gaiola
        </h3>
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 border-b">
                  Gaiola
                </th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 border-b">
                  Quantidade
                </th>
                <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 border-b">
                  Porcentagem
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(gaiolaStats)
                .sort(([, a], [, b]) => b - a)
                .map(([gaiola, count], idx) => (
                  <tr key={gaiola} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-sm font-bold">Gaiola {gaiola}</td>
                    <td className="px-4 py-3 text-sm text-right">{count}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      {((count / totalItems) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
