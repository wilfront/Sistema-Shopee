'use client'

import { Building2, Package } from 'lucide-react'

export default function SystemSelector({ onSelectSystem }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Sistema Integrado
          </h1>
          <p className="text-xl text-gray-600">
            Escolha o sistema que deseja acessar
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Sistema de Bipagem */}
          <button
            onClick={() => onSelectSystem('bipagem')}
            className="group relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-orange-500"
          >
            <div className="absolute top-4 right-4 bg-orange-100 rounded-full p-3">
              <Package className="w-8 h-8 text-orange-600" />
            </div>
            
            <div className="mt-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                🏷️ Sistema de Bipagem
              </h2>
              <p className="text-gray-600 mb-6">
                Controle completo de bipagem, estoque e gaiolas
              </p>
              
              <div className="space-y-2 text-left">
                <div className="flex items-center text-sm text-gray-700">
                  <span className="mr-2">✅</span>
                  Bipar itens e controlar estoque
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="mr-2">✅</span>
                  Visualizar bipados por gaiola
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="mr-2">✅</span>
                  Estatísticas e relatórios
                </div>
              </div>

              <div className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold group-hover:bg-orange-600 transition-colors">
                Acessar Bipagem
              </div>
            </div>
          </button>

          {/* Mercado SPX */}
          <button
            onClick={() => onSelectSystem('mercadospx')}
            className="group relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-blue-500"
          >
            <div className="absolute top-4 right-4 bg-blue-100 rounded-full p-3">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            
            <div className="mt-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                🚗 Mercado SPX
              </h2>
              <p className="text-gray-600 mb-6">
                Controle de veículos e vagas do mercado
              </p>
              
              <div className="space-y-2 text-left">
                <div className="flex items-center text-sm text-gray-700">
                  <span className="mr-2">✅</span>
                  Gerenciar 20 vagas de veículos
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="mr-2">✅</span>
                  Controle de bancadas e responsáveis
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="mr-2">✅</span>
                  Visualização em tempo real
                </div>
              </div>

              <div className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold group-hover:bg-blue-600 transition-colors">
                Acessar Mercado SPX
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          Shopee Xpress - Sistema Integrado de Gestão
        </div>
      </div>
    </div>
  )
}
