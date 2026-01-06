'use client'

import { useState, useEffect } from 'react'
import SystemSelector from '@/components/SystemSelector'
import Header from '@/components/Header'
import BiparTab from '@/components/BiparTab'
import BipadosTab from '@/components/BipadosTab'
import EstoqueTab from '@/components/EstoqueTab'
import EstoquePorGaiolaTab from '@/components/EstoquePorGaiolaTab'
import StatisticsTab from '@/components/StatisticsTab'
import MercadoSPXTab from '@/components/MercadoSPXTab'
import { loadData, saveData } from '@/lib/dataManager'
import { RefreshCw, Trash2, Lock, LogOut, Home as HomeIcon } from 'lucide-react'

// Credenciais temporárias (mover para Firebase Authentication depois)
const USERS = {
  admin: { email: 'admin@shopee.com', password: 'admin123', role: 'admin' },
  user: { email: 'usuario@shopee.com', password: 'user123', role: 'user' }
}

const TABS = [
  { id: 'bipar', label: '🏷️ Bipar', icon: '🏷️', adminOnly: true, system: 'bipagem' },
  { id: 'bipados', label: '🔲 Bipados (Volumosos)', icon: '🔲', adminOnly: false, system: 'bipagem' },
  { id: 'estoque', label: '📊 Estoque (Log)', icon: '📊', adminOnly: true, system: 'bipagem' },
  { id: 'gaiolas', label: '📦 Estoque por Gaiola', icon: '📦', adminOnly: true, system: 'bipagem' },
  { id: 'stats', label: '📈 Estatísticas', icon: '📈', adminOnly: true, system: 'bipagem' },
  { id: 'mercadospx', label: '🚗 Mercado SPX', icon: '🚗', adminOnly: false, system: 'mercadospx' },
]

export default function Home() {
  const [selectedSystem, setSelectedSystem] = useState(null) // null, 'bipagem', 'mercadospx'
  const [isAdmin, setIsAdmin] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [loginChecked, setLoginChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginType, setLoginType] = useState('admin') // 'admin' ou 'user'
  const [activeTab, setActiveTab] = useState('bipados')
  const [data, setData] = useState({ bipados: {}, estoque: [] })
  const [loading, setLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const fetchData = async () => {
    const newData = await loadData()
    setData(newData)
  }

  useEffect(() => {
    fetchData().then(() => setLoading(false))
    // Verificar se tem sessão de admin e sistema salvo
    const savedAdmin = localStorage.getItem('isAdmin')
    const savedSystem = localStorage.getItem('selectedSystem')
    
    if (savedAdmin === 'true') {
      setIsAdmin(true)
      setShowLogin(false)
    }
    
    if (savedSystem) {
      setSelectedSystem(savedSystem)
      if (savedSystem === 'bipagem') {
        setActiveTab(savedAdmin === 'true' ? 'bipar' : 'bipados')
      } else if (savedSystem === 'mercadospx') {
        setActiveTab('mercadospx')
      }
      setShowLogin(false)
    }
    
    setLoginChecked(true)
  }, [])

  // Auto-refresh a cada 3 segundos
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchData()
    }, 3000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const handleAddItem = async (gaiola, codigo) => {
    const timestamp = new Date().toLocaleString('pt-BR')
    
    // Adiciona ao grid de bipados
    const newBipados = { ...data.bipados }
    if (!newBipados[gaiola]) {
      newBipados[gaiola] = []
    }
    newBipados[gaiola].push(codigo)
    
    // Adiciona ao log de estoque
    const newEstoque = [...data.estoque, { timestamp, codigo, gaiola }]
    
    const newData = { bipados: newBipados, estoque: newEstoque }
    setData(newData)
    await saveData(newData)
  }

  const handleDeleteItems = async (itemsToDelete) => {
    const newBipados = { ...data.bipados }
    
    // Remove items do grid
    itemsToDelete.forEach(({ gaiola, index }) => {
      if (newBipados[gaiola] && newBipados[gaiola][index]) {
        newBipados[gaiola].splice(index, 1)
      }
    })
    
    const newData = { ...data, bipados: newBipados }
    setData(newData)
    await saveData(newData)
  }

  const handleResetData = async () => {
    if (!isAdmin) {
      alert('❌ Apenas administradores podem resetar os dados!')
      return
    }
    
    const confirmMessage = '⚠️ ATENÇÃO: Isso vai apagar TODOS os dados e começar do zero.\n\nEssa ação é usada para começar um NOVO DIA de bipagem.\n\nTem certeza?'
    
    if (!confirm(confirmMessage)) return
    
    // Confirmação dupla para segurança
    const doubleConfirm = prompt('Digite "RESETAR" (em maiúsculas) para confirmar:')
    if (doubleConfirm !== 'RESETAR') {
      alert('Cancelado. Nada foi alterado.')
      return
    }
    
    const newData = { bipados: {}, estoque: [] }
    setData(newData)
    await saveData(newData)
    alert('✅ Dados resetados com sucesso! Pronto para um novo dia.')
  }

  const handleLogin = () => {
    const user = Object.values(USERS).find(
      u => u.email === email && u.password === password
    )

    if (user) {
      const isAdminUser = user.role === 'admin'
      setIsAdmin(isAdminUser)
      localStorage.setItem('isAdmin', isAdminUser.toString())
      localStorage.setItem('userEmail', email)
      setShowLogin(false)
      setEmail('')
      setPassword('')
      
      if (isAdminUser) {
        alert('✅ Login como administrador realizado! Escolha o sistema que deseja acessar.')
      } else {
        // Usuário comum vê ambos os sistemas
        setSelectedSystem('user')
        setActiveTab('bipados')
        alert('✅ Login realizado! Acesso de visualização.')
      }
    } else {
      alert('❌ Email ou senha incorretos!')
      setPassword('')
    }
  }

  const handleLogout = () => {
    const message = isAdmin 
      ? 'Deseja sair e voltar para a seleção de sistema?' 
      : 'Deseja voltar à tela de seleção?'
    
    if (confirm(message)) {
      setIsAdmin(false)
      setSelectedSystem(null)
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('selectedSystem')
      localStorage.removeItem('userEmail')
      setShowLogin(true)
      setActiveTab('bipados')
      setEmail('')
      setPassword('')
      alert('✅ Logout realizado!')
    }
  }

  const handleSystemSelect = (system) => {
    setSelectedSystem(system)
    localStorage.setItem('selectedSystem', system)
    
    if (system === 'bipagem') {
      setActiveTab(isAdmin ? 'bipar' : 'bipados')
    } else if (system === 'mercadospx') {
      setActiveTab('mercadospx')
    }
  }

  const handleBackToSystemSelector = () => {
    if (confirm('Voltar para a seleção de sistema?')) {
      setSelectedSystem(null)
      localStorage.removeItem('selectedSystem')
    }
  }

  // Filtrar abas baseado no tipo de usuário e sistema selecionado
  const visibleTabs = TABS.filter(tab => {
    // Se sistema não foi selecionado, não mostrar abas
    if (!selectedSystem) return false
    
    // Usuário comum vê apenas Bipados e Mercado SPX
    if (selectedSystem === 'user') {
      return tab.id === 'bipados' || tab.id === 'mercadospx'
    }
    
    // Admin: Filtrar por sistema
    if (tab.system !== selectedSystem) return false
    
    // Filtrar por permissão de admin
    return !tab.adminOnly || isAdmin
  })

  if (loading || !loginChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-shopee-primary">Carregando...</div>
      </div>
    )
  }

  // Mostrar seleção de sistema se nenhum foi selecionado
  // Apenas para admin, usuário comum vai direto para as abas
  if (!selectedSystem && !showLogin && isAdmin) {
    return <SystemSelector onSelectSystem={handleSystemSelect} />
  }

  // Tela de login/escolha
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="mb-4 flex justify-center">
              <div className="text-5xl font-bold tracking-tight">
                <span className="text-[#EE4D2D]">Shopee</span>
                <span className="text-[#EE4D2D] ml-2" style={{fontStyle: 'italic', fontWeight: 900}}>Xpress</span>
              </div>
            </div>
            <p className="text-gray-600">Escolha seu modo de acesso</p>
          </div>

          <div className="space-y-6">
            {/* Seletor de Tipo de Login */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setLoginType('admin')}
                className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
                  loginType === 'admin' 
                    ? 'bg-white text-shopee-primary shadow' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                🔐 Administrador
              </button>
              <button
                onClick={() => setLoginType('user')}
                className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
                  loginType === 'user' 
                    ? 'bg-white text-blue-600 shadow' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                👥 Usuário
              </button>
            </div>

            {/* Formulário de Login */}
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Lock size={20} className={loginType === 'admin' ? 'text-shopee-primary' : 'text-blue-600'} />
                {loginType === 'admin' ? 'Login Administrador' : 'Login Usuário'}
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder={loginType === 'admin' ? 'admin@shopee.com' : 'usuario@shopee.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-shopee-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                  <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-shopee-primary focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={handleLogin}
                className={`w-full mt-4 py-2 px-4 rounded-md font-bold transition-colors ${
                  loginType === 'admin'
                    ? 'bg-shopee-primary text-white hover:bg-shopee-primary/90'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Entrar
              </button>
              
              <p className="text-xs text-gray-500 mt-3 text-center">
                {loginType === 'admin' 
                  ? '✅ Acesso completo: Bipar, visualizar e gerenciar' 
                  : '👁️ Apenas visualização dos Bipados e Mercado SPX'}
              </p>
            </div>
            
            {/* Credenciais de exemplo */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-blue-800 mb-2">🔑 Credenciais de teste:</p>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Admin:</strong> admin@shopee.com / admin123</p>
                <p><strong>Usuário:</strong> usuario@shopee.com / user123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isAdmin={isAdmin} 
        onLogout={handleLogout}
        systemName={
          selectedSystem === 'user' 
            ? 'Sistema de Visualização' 
            : selectedSystem === 'bipagem' 
              ? 'Sistema de Bipagem' 
              : 'Mercado SPX'
        }
      />
      
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        {/* Tabs navigation - com scroll horizontal em mobile */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
          <div className="flex min-w-max">
            {/* Botão Voltar - apenas para admin */}
            {isAdmin && (
              <button
                onClick={handleBackToSystemSelector}
                className="px-4 sm:px-6 py-3 font-bold text-xs sm:text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all whitespace-nowrap flex items-center gap-2"
                title="Voltar para seleção de sistema"
              >
                <HomeIcon size={16} />
                <span className="hidden sm:inline">Voltar</span>
              </button>
            )}
            
            {visibleTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-3 font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? selectedSystem === 'bipagem' || (selectedSystem === 'user' && tab.id === 'bipados')
                      ? 'bg-shopee-primary text-white border-b-2 border-shopee-primary'
                      : 'bg-blue-600 text-white border-b-2 border-blue-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Controles - em linha separada em mobile */}
        <div className="flex flex-col sm:flex-row gap-2 p-2 sm:p-3 bg-gray-50 border-t border-gray-200">
          {/* Botão de refresh manual - apenas para sistema de bipagem */}
          {(selectedSystem === 'bipagem' || selectedSystem === 'user') && (
            <>
              <button
                onClick={fetchData}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                title="Atualizar dados"
              >
                <RefreshCw size={16} />
                <span className="sm:inline">Atualizar</span>
              </button>

              {/* Toggle auto-refresh */}
              <label className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md cursor-pointer justify-center">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Auto-refresh (3s)</span>
              </label>

              {/* Botão de resetar dados (NOVO DIA) - apenas para admin */}
              {isAdmin && selectedSystem === 'bipagem' && (
                <button
                  onClick={handleResetData}
                  className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-sm font-bold"
                  title="Resetar todos os dados para começar novo dia"
                >
                  <Trash2 size={16} />
                  <span className="sm:inline">Novo Dia</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-4 md:p-6">
        {activeTab === 'bipar' && (
          <BiparTab data={data} onAddItem={handleAddItem} onDeleteItems={handleDeleteItems} />
        )}
        {activeTab === 'bipados' && (
          <BipadosTab data={data.bipados} />
        )}
        {activeTab === 'estoque' && (
          <EstoqueTab data={data.estoque} />
        )}
        {activeTab === 'gaiolas' && (
          <EstoquePorGaiolaTab data={data.bipados} estoque={data.estoque} />
        )}
        {activeTab === 'stats' && (
          <StatisticsTab data={data} />
        )}
        {activeTab === 'mercadospx' && (
          <MercadoSPXTab isAdmin={isAdmin} />
        )}
      </div>
    </div>
  )
}
