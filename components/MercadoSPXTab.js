'use client'

import { useState, useEffect } from 'react'
import { User, Trash2, Save, RefreshCw, Plus, X } from 'lucide-react'

export default function MercadoSPXTab({ isAdmin }) {
  const [vagas, setVagas] = useState({})
  const [editingVaga, setEditingVaga] = useState(null)
  const [editMode, setEditMode] = useState('nome') // 'nome' ou 'codigo'
  const [formData, setFormData] = useState({
    responsavel: '',
    gaiola: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const TOTAL_VAGAS = 20

  useEffect(() => {
    loadVagas()
    
    // Auto-refresh a cada 2 segundos para sincronizar status
    // Mas não recarrega se estiver salvando
    const interval = setInterval(() => {
      if (!saving) {
        loadVagas()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [saving])

  const loadVagas = async () => {
    try {
      const response = await fetch('/api/mercadospx')
      if (response.ok) {
        const data = await response.json()
        setVagas(data.vagas || {})
      }
    } catch (error) {
      console.error('Erro ao carregar vagas:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveVagas = async (newVagas) => {
    if (saving) return false // Previne múltiplas chamadas simultâneas
    
    setSaving(true)
    try {
      const response = await fetch('/api/mercadospx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vagas: newVagas })
      })
      
      if (response.ok) {
        setVagas(newVagas)
        return true
      }
      return false
    } catch (error) {
      console.error('Erro ao salvar vagas:', error)
      return false
    } finally {
      setSaving(false)
    }
  }

  const handleAddResponsavel = async () => {
    if (!editingVaga || !formData.responsavel.trim()) {
      alert('Digite o nome do responsável pela bancada')
      return
    }

    const newVagas = {
      ...vagas,
      [editingVaga]: {
        responsavel: formData.responsavel.trim(),
        codigos: vagas[editingVaga]?.codigos || [],
        status: vagas[editingVaga]?.status || 'disponivel' // Inicia como disponível
      }
    }

    const success = await saveVagas(newVagas)
    if (success) {
      setFormData({ responsavel: '', gaiola: '' })
      setEditingVaga(null)
      setEditMode('nome')
    }
  }

  const handleAddCodigo = async () => {
    if (!editingVaga || !formData.gaiola.trim()) {
      alert('Digite o número da gaiola')
      return
    }

    const vaga = vagas[editingVaga]
    if (!vaga || !vaga.responsavel) {
      alert('Configure o responsável da bancada primeiro')
      return
    }

    const novoCodigo = {
      codigo: formData.gaiola.trim().toUpperCase(),
      concluido: false,
      timestamp: new Date().toISOString()
    }

    const newCodigos = [...(vaga.codigos || []), novoCodigo]

    const newVagas = {
      ...vagas,
      [editingVaga]: {
        ...vaga,
        codigos: newCodigos,
        status: 'ocupado' // Automaticamente ocupado quando adiciona gaiola
      }
    }

    const success = await saveVagas(newVagas)
    if (success) {
      setFormData({ ...formData, gaiola: '' })
    }
  }

  const handleMarcarCodigoConcluido = async (vagaNumber, codigoIndex) => {
    const vaga = vagas[vagaNumber]
    if (!vaga) return

    const newCodigos = [...vaga.codigos]
    newCodigos[codigoIndex] = {
      ...newCodigos[codigoIndex],
      concluido: true
    }

    // Verifica se todos os códigos foram concluídos
    const todosConcluidos = newCodigos.every(c => c.concluido)

    const newVagas = {
      ...vagas,
      [vagaNumber]: {
        ...vaga,
        codigos: newCodigos,
        status: todosConcluidos ? 'disponivel' : 'ocupado'
      }
    }

    await saveVagas(newVagas)
  }

  const handleRemoveCodigo = async (vagaNumber, codigoIndex) => {
    const vaga = vagas[vagaNumber]
    const newCodigos = vaga.codigos.filter((_, index) => index !== codigoIndex)

    // Verifica se ainda tem códigos pendentes
    const temCodigosPendentes = newCodigos.some(c => !c.concluido)

    const newVagas = {
      ...vagas,
      [vagaNumber]: {
        ...vaga,
        codigos: newCodigos,
        status: temCodigosPendentes ? 'ocupado' : 'disponivel'
      }
    }

    await saveVagas(newVagas)
  }

  const handleRemoveVeiculo = async (vagaNumber) => {
    if (saving) return // Previne cliques durante salvamento
    if (!confirm(`Remover configuração da Bancada ${vagaNumber}?`)) return

    const newVagas = { ...vagas }
    delete newVagas[vagaNumber]
    
    const success = await saveVagas(newVagas)
    if (!success) {
      alert('Erro ao remover bancada. Tente novamente.')
    }
  }

  const handleEditVaga = (vagaNumber, mode = 'nome') => {
    const vaga = vagas[vagaNumber]
    setEditingVaga(vagaNumber)
    setEditMode(mode)
    
    if (vaga) {
      setFormData({
        responsavel: vaga.responsavel || '',
        gaiola: ''
      })
    } else {
      setFormData({ responsavel: '', gaiola: '' })
    }
  }

  const handleClearAll = async () => {
    if (!confirm('Limpar todas as vagas? Esta ação não pode ser desfeita!')) return
    await saveVagas({})
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  const vagasOcupadas = Object.keys(vagas).length
  const vagasLivres = TOTAL_VAGAS - vagasOcupadas
  const vagasDisponiveis = vagasOcupadas // Bancadas ativas = disponíveis
  const vagasOcupadasAtendendo = Object.values(vagas).filter(v => v.status === 'ocupado').length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-600 font-medium">Total</p>
              <p className="text-2xl font-bold text-blue-700">{TOTAL_VAGAS}</p>
            </div>
            <User className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded-lg border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-600 font-medium">Disponíveis</p>
              <p className="text-2xl font-bold text-green-700">{vagasDisponiveis}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-3 rounded-lg border-2 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-red-600 font-medium">Ocupados</p>
              <p className="text-2xl font-bold text-red-700">{vagasOcupadasAtendendo}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xs">
              !
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 font-medium">Inativas</p>
              <p className="text-2xl font-bold text-gray-700">{vagasLivres}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
              ⚪
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {isAdmin && (
        <div className="flex gap-2">
          <button
            onClick={loadVagas}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </button>
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Limpar Tudo
          </button>
        </div>
      )}

      {/* Grid de Bancadas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: TOTAL_VAGAS }, (_, i) => i + 1).map((vagaNumber) => {
          const vaga = vagas[vagaNumber]
          const isConfigurada = !!vaga
          const isEditing = editingVaga === vagaNumber

          return (
            <div
              key={vagaNumber}
              className={`
                relative p-4 rounded-xl border-2 transition-all min-h-[180px]
                ${isConfigurada 
                  ? 'bg-blue-50 border-blue-300 shadow-md' 
                  : 'bg-gray-50 border-gray-200 opacity-90'
                }
                ${isEditing ? 'ring-4 ring-blue-400' : ''}
              `}
            >
              {/* Número da Bancada */}
              <div className={`
                absolute top-2 left-2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm
                ${isConfigurada ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'}
              `}>
                {vagaNumber}
              </div>

              {/* Status Badge */}
              <div className="absolute top-2 right-2">
                {isConfigurada ? (
                  vaga.status === 'disponivel' ? (
                    <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Disponível
                    </div>
                  ) : vaga.status === 'ocupado' ? (
                    <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      Ocupado
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                      <User className="w-3 h-3" />
                      Ativa
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-1 bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Inativa
                  </div>
                )}
              </div>

              <div className="mt-12 space-y-2">
                {isConfigurada ? (
                  <>
                    {/* Responsável */}
                    <div className="bg-white p-2 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 font-medium">👤 Responsável:</p>
                      <p className="text-sm font-bold text-blue-700">
                        {vaga.responsavel}
                      </p>
                    </div>

                    {/* Gaiolas */}
                    {vaga.codigos && vaga.codigos.length > 0 && (
                      <div className="bg-white p-2 rounded-lg border border-orange-200">
                        <p className="text-xs text-gray-600 font-medium mb-1">📦 Gaiolas:</p>
                        <div className="flex flex-wrap gap-1">
                          {vaga.codigos.map((codigoObj, idx) => {
                            const codigo = typeof codigoObj === 'string' ? codigoObj : codigoObj.codigo
                            const concluido = typeof codigoObj === 'object' ? codigoObj.concluido : false
                            
                            return (
                              <div
                                key={idx}
                                className={`group relative inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${
                                  concluido 
                                    ? 'bg-green-100 text-green-700 line-through opacity-60' 
                                    : 'bg-orange-100 text-orange-800'
                                }`}
                              >
                                {/* Botão de check para usuário */}
                                {!isAdmin && !concluido && (
                                  <button
                                    onClick={() => handleMarcarCodigoConcluido(vagaNumber, idx)}
                                    className="hover:scale-110 transition-transform"
                                    title="Marcar como concluído"
                                  >
                                    <div className="w-4 h-4 border-2 border-green-600 rounded flex items-center justify-center hover:bg-green-600 hover:text-white">
                                      ✓
                                    </div>
                                  </button>
                                )}
                                
                                {/* Ícone de concluído */}
                                {concluido && (
                                  <div className="w-4 h-4 bg-green-600 text-white rounded flex items-center justify-center text-xs">
                                    ✓
                                  </div>
                                )}
                                
                                <span>{codigo}</span>
                                
                                {/* Botão X para admin remover */}
                                {isAdmin && (
                                  <button
                                    onClick={() => handleRemoveCodigo(vagaNumber, idx)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="w-3 h-3 text-red-600 hover:text-red-800" />
                                  </button>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Removido: Botão para usuário marcar como disponível */}
                    
                    {isAdmin && (
                      <div className="flex gap-1 pt-2">
                        <button
                          onClick={() => handleEditVaga(vagaNumber, 'codigo')}
                          className="flex-1 px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 flex items-center justify-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          Gaiola
                        </button>
                        <button
                          onClick={() => handleEditVaga(vagaNumber, 'nome')}
                          className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleRemoveVeiculo(vagaNumber)}
                          disabled={saving}
                          className={`px-2 py-1 text-white text-xs rounded transition-colors ${
                            saving 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-red-500 hover:bg-red-600'
                          }`}
                          title={saving ? 'Salvando...' : 'Remover bancada'}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-center py-6">
                      <div className="text-4xl mb-2 opacity-30">⚪</div>
                      <p className="text-sm text-gray-500 font-medium">
                        Bancada Inativa
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Sem responsável configurado
                      </p>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => handleEditVaga(vagaNumber, 'nome')}
                        className="w-full px-2 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        Configurar Bancada
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Form Modal */}
      {isAdmin && editingVaga && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-xl font-bold text-gray-800">
              Bancada {editingVaga}
            </h3>

            {editMode === 'nome' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    👤 Nome do Responsável *
                  </label>
                  <input
                    type="text"
                    value={formData.responsavel}
                    onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: João Silva"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddResponsavel()}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Pessoa que vai atender nesta bancada
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddResponsavel}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                  <button
                    onClick={() => {
                      setEditingVaga(null)
                      setFormData({ responsavel: '', codigo: '' })
                      setEditMode('nome')
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold">Responsável:</span> {vagas[editingVaga]?.responsavel}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    📦 Número da Gaiola *
                  </label>
                  <input
                    type="text"
                    value={formData.gaiola}
                    onChange={(e) => setFormData({ ...formData, gaiola: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent uppercase"
                    placeholder="Ex: A2, B06, C15"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCodigo()}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Número da gaiola que o motorista pegou
                  </p>
                </div>

                {/* Lista de gaiolas já adicionadas */}
                {vagas[editingVaga]?.codigos && vagas[editingVaga].codigos.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Gaiolas adicionadas:</p>
                    <div className="flex flex-wrap gap-2">
                      {vagas[editingVaga].codigos.map((codigoObj, idx) => {
                        const codigo = typeof codigoObj === 'string' ? codigoObj : codigoObj.codigo
                        const concluido = typeof codigoObj === 'object' ? codigoObj.concluido : false
                        
                        return (
                          <div
                            key={idx}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                              concluido 
                                ? 'bg-green-100 text-green-700 line-through' 
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {concluido && <span className="text-green-600">✓</span>}
                            {codigo}
                            <button
                              onClick={() => handleRemoveCodigo(editingVaga, idx)}
                              className="hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={handleAddCodigo}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar Gaiola
                  </button>
                  <button
                    onClick={() => {
                      setEditingVaga(null)
                      setFormData({ responsavel: '', gaiola: '' })
                      setEditMode('nome')
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
