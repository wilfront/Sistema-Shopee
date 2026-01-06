# 🚀 Shopee Xpress - Sistema Integrado

Sistema moderno de gestão desenvolvido com Next.js 14, React 18 e Tailwind CSS. Inclui dois módulos completos: **Sistema de Bipagem** e **Mercado SPX**.

## 🎯 Sistemas Disponíveis

### 🏷️ **Sistema de Bipagem**
Controle completo de itens, gaiolas e estoque.

- 📦 **50 Gaiolas** - Sistema organizado para controle de 50 gaiolas
- 🏷️ **Bipagem Rápida** - Interface intuitiva para registro rápido
- 📊 **Grid Excel-like** - Visualização em grade similar ao Excel
- 🎯 **Seleção Múltipla** - Suporte para Ctrl+Click, Shift+Arrows, Ctrl+A
- 🗑️ **Exclusão de Células** - Delete células individuais ou múltiplas
- 📈 **Estatísticas** - Gráficos de barras e pizza com Recharts
- 💾 **Auto-save** - Persistência automática
- 🔄 **Auto-refresh** - Atualização a cada 3 segundos

### 🚗 **Mercado SPX**
Controle de veículos e vagas.

- 🚗 **20 Vagas** - Controle de vagas numeradas (1-20)
- 🏢 **Bancadas** - Atribuição de veículos a bancadas
- 👤 **Responsáveis** - Registro de responsável por vaga
- 📝 **Observações** - Campo livre para anotações
- 🎨 **Visual Intuitivo** - Status claro: livre/ocupado
- 💾 **Persistência** - Dados salvos automaticamente

## ✨ Recursos Gerais

- 🔐 **Controle de Acesso** - Modo Administrador e Usuário (visualização)
- 👥 **Multi-usuário** - Várias pessoas acessam simultaneamente
- 🎨 **Design Moderno** - Interface profissional com cores Shopee
- 📱 **Responsivo** - Funciona em desktop, tablet e mobile
- 🔄 **Tempo Real** - Atualizações automáticas para todos os usuários

## 🚀 Como Executar

### Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🔐 Sistema de Acesso

### **🔑 Login**

**Modo Administrador** (Senha: `admin123`)
- ✅ Acesso completo aos dois sistemas
- ✅ Pode adicionar, editar e remover dados
- ✅ Botão "Novo Dia" para resetar (Bipagem)
- ✅ Pode limpar todas as vagas (Mercado SPX)

**Modo Usuário** (Sem senha)
- 👁️ Visualização de ambos os sistemas
- 🔄 Acompanha atualizações em tempo real
- ❌ Não pode modificar dados

### **🎯 Seleção de Sistema**

Após fazer login, escolha qual sistema acessar:
1. **🏷️ Sistema de Bipagem** - Controle de itens e gaiolas
2. **🚗 Mercado SPX** - Controle de veículos e vagas

Use o botão **"Voltar"** (🏠) para trocar de sistema.

📖 **Documentação completa:** [CONTROLE_ACESSO.md](CONTROLE_ACESSO.md)

## 👥 Uso Multi-Usuário

O sistema suporta múltiplos usuários acessando simultaneamente:

1. **Uma pessoa inicia o servidor:**
   ```bash
   npm run dev -- --hostname 0.0.0.0
   ```

2. **Descubra o IP da máquina:**
   ```bash
   hostname -I | awk '{print $1}'
   ```

3. **Todos acessam pelo navegador:**
   ```
   http://SEU_IP:3000
   ```

4. **Atualizações em tempo real:**
   - Auto-refresh a cada 3 segundos
   - Todos veem as mudanças automaticamente

📖 **Guia completo:** [USO_MULTIUSUARIO.md](USO_MULTIUSUARIO.md)

## 📂 Estrutura do Projeto

```
bipagem/
├── app/                    # Next.js App Router
│   ├── layout.js          # Layout principal
│   ├── page.js            # Página inicial com seleção de sistema
│   ├── globals.css        # Estilos globais
│   └── api/               # API Routes
│       ├── data/          # API Sistema de Bipagem
│       └── mercadospx/    # API Mercado SPX
├── components/            # Componentes React
│   ├── SystemSelector.js  # Seleção de sistema
│   ├── Header.js          # Cabeçalho
│   ├── BiparTab.js        # Aba de bipagem
│   ├── BipadosTab.js      # Grid completo
│   ├── EstoqueTab.js      # Log de estoque
│   ├── EstoquePorGaiolaTab.js  # Estoque por gaiola
│   ├── StatisticsTab.js   # Estatísticas
│   ├── MercadoSPXTab.js   # Controle de vagas do Mercado SPX
│   └── GridComponent.js   # Grid com seleção
├── lib/                   # Utilitários
│   └── dataManager.js     # Gerenciamento de dados
├── data/                  # Arquivos de dados
│   ├── bipagem.json       # Dados do Sistema de Bipagem
│   └── mercadospx.json    # Dados do Mercado SPX
├── CONTROLE_ACESSO.md     # Manual de controle de acesso
├── MERCADO_SPX.md         # Manual do Mercado SPX
└── package.json           # Dependências

```

## 📚 Documentação

- 📖 **[CONTROLE_ACESSO.md](CONTROLE_ACESSO.md)** - Sistema de login e permissões
- 🚗 **[MERCADO_SPX.md](MERCADO_SPX.md)** - Manual completo do Mercado SPX
- 👥 **[USO_MULTIUSUARIO.md](USO_MULTIUSUARIO.md)** - Configuração multi-usuário
- 🔄 **[SYNC_UPDATE.md](SYNC_UPDATE.md)** - Sincronização de dados

## ⌨️ Atalhos de Teclado

- **Click** - Seleciona célula
- **Ctrl+Click** - Seleciona múltiplas células
- **Shift+Arrows** - Expande seleção
- **Ctrl+A** - Seleciona todas
- **Delete** - Apaga células selecionadas
- **Esc** - Limpa seleção

## 🎨 Tecnologias

- **Next.js 14** - Framework React
- **React 18** - Biblioteca UI
- **Tailwind CSS** - Estilização
- **Recharts** - Gráficos
- **Lucide React** - Ícones
- **LocalStorage** - Persistência de dados

## 📝 Licença

Desenvolvido para Shopee Xpress
