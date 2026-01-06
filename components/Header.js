import { LogOut, Shield, User } from 'lucide-react'

export default function Header({ isAdmin = false, onLogout = () => {}, systemName = 'Sistema de Controle' }) {
  const now = new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <header className="bg-shopee-primary text-white shadow-lg">
      <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
              <span>⚡</span> Shopee Xpress
            </h1>
            <p className="text-shopee-light text-xs sm:text-sm mt-1">
              {systemName}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Status do usuário */}
            <div className="text-right">
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-md mb-1">
                {isAdmin ? (
                  <>
                    <Shield size={16} />
                    <span className="text-xs sm:text-sm font-bold">Administrador</span>
                  </>
                ) : (
                  <>
                    <User size={16} />
                    <span className="text-xs sm:text-sm font-bold">Usuário</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-shopee-light whitespace-nowrap">{now}</p>
            </div>
            
            {/* Botão de logout (para admin e usuário) */}
            <button
              onClick={onLogout}
              className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-md transition-colors flex items-center gap-2"
              title={isAdmin ? "Sair do modo administrador" : "Sair do modo usuário"}
            >
              <LogOut size={16} />
              <span className="hidden sm:inline text-sm">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
