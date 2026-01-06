# 🔐 Sistema de Controle de Acesso

## 🎯 Sistemas Disponíveis

O sistema agora possui **dois módulos independentes**:

1. **🏷️ Sistema de Bipagem** - Controle de itens, gaiolas e estoque
2. **🚗 Mercado SPX** - Controle de veículos e vagas

Ao fazer login, você escolhe qual sistema deseja acessar.

---

## 👥 Tipos de Usuário

### 🛡️ **Administrador**
- ✅ Acessa **todos os sistemas**
- ✅ Pode **adicionar e remover** dados
- ✅ Pode **resetar dados** (Novo Dia)
- ✅ Acesso completo aos dois sistemas

**No Sistema de Bipagem:**
- 🏷️ Bipar
- 🔲 Bipados (Volumosos)
- 📊 Estoque (Log)
- 📦 Estoque por Gaiola
- 📈 Estatísticas

**No Mercado SPX:**
- 🚗 Adicionar/Editar/Remover veículos
- 📋 Gerenciar vagas (1-20)
- 🏢 Atribuir bancadas e responsáveis
- 🗑️ Limpar todas as vagas

### 👁️ **Usuário (Visualização)**
- ✅ Acessa **ambos os sistemas simultaneamente**
- 👁️ **Modo leitura** (não pode modificar)
- 🔄 Visualiza atualizações em tempo real
- ❌ Não pode adicionar ou apagar dados
- 🎯 **Não precisa escolher sistema** - vê tudo ao mesmo tempo

**Abas disponíveis:**
- 🔲 Bipados (Volumosos) - visualização
- 🚗 Mercado SPX - visualização de veículos e vagas

---

## 🔑 Como Fazer Login

### **1. Tela Inicial - Escolha de Modo**

Ao abrir o sistema, você verá 2 opções:

```
┌─────────────────────────────┐
│   🔒 Administrador          │
│   [Digite a senha]          │
│   [Entrar como Admin]       │
│   ✅ Acesso completo         │
└─────────────────────────────┘

┌─────────────────────────────┐
│   👥 Usuário (Visualização) │
│   [Entrar como Usuário]     │
│   👁️ Apenas visualização     │
└─────────────────────────────┘
```

### **2. Login como Administrador**

**Senha padrão:** `admin123`

1. Digite a senha no campo
2. Clique em "Entrar como Admin" ou pressione Enter
3. ✅ Login realizado!
4. Escolha o sistema (Bipagem ou Mercado SPX)

### **3. Entrar como Usuário**

1. Clique em "Entrar como Usuário"
2. 👁️ Modo visualização ativado automaticamente
3. ✅ Acesso direto às abas "Bipados" e "Mercado SPX"
4. 🎯 Não precisa escolher sistema - vê tudo ao mesmo tempo

---

## 🎯 Seleção de Sistema

### **Para Administradores:**

Após fazer login, você verá a tela de seleção:

```
┌──────────────────────────────────┐
│  🏷️ Sistema de Bipagem          │
│  Controle de bipagem e estoque   │
│  [Acessar Bipagem]               │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│  🚗 Mercado SPX                  │
│  Controle de veículos e vagas    │
│  [Acessar Mercado SPX]           │
└──────────────────────────────────┘
```

**Trocar de Sistema:**
1. Clique no botão **"Voltar"** (🏠) no topo da tela
2. Escolha outro sistema

### **Para Usuários:**

❌ Não há seleção de sistema
✅ Acesso direto às duas abas:
- 🔲 Bipados (Volumosos)
- 🚗 Mercado SPX

👁️ Alterne entre as abas livremente

---

## 🚗 Mercado SPX - Funcionalidades

### **Visão Geral**
- **20 bancadas** para controle de atendimento
- Cada bancada tem um **responsável** (atendente)
- Cada bancada pode receber **múltiplos códigos** de motoristas/entregas
- Informações por bancada:
  - 👤 Responsável (nome do atendente)
  - 📦 Códigos (ex: A2, B06, C15)

### **Como Administrador:**

**Configurar Bancada:**
1. Clique em "Configurar" em uma bancada disponível
2. Digite o **nome do responsável** (atendente)
3. Clique em "Salvar"

**Adicionar Códigos:**
1. Clique em "+ Código" na bancada configurada
2. Digite o **código do motorista/entrega** (ex: A2, B06)
3. Pressione Enter ou clique em "Adicionar Código"
4. Adicione quantos códigos precisar
5. Os códigos são automaticamente convertidos para MAIÚSCULAS

**Remover Código:**
1. Passe o mouse sobre o código
2. Clique no "X" que aparece
3. O código será removido

**Editar Responsável:**
1. Clique no botão "✏️" na bancada
2. Altere o nome do responsável
3. Clique em "Salvar"

**Remover Bancada:**
1. Clique no ícone de lixeira (🗑️) na bancada
2. Confirme a remoção
3. Remove o responsável e todos os códigos

**Limpar Tudo:**
1. Clique em "Limpar Tudo" no topo
2. Confirme a ação (remove todas as bancadas)

### **Como Usuário:**
- ✅ Visualiza todas as bancadas
- ✅ Vê o responsável de cada bancada
- ✅ Vê todos os códigos de cada bancada
- 👁️ Pode identificar quais códigos precisa atender
- ❌ Não pode adicionar, editar ou remover

---

## 🔄 Trocar de Modo

### **Sair e Voltar:**

1. Clique no botão **"Sair"** no cabeçalho (canto superior direito)
2. Confirme a ação
3. Retorna para tela de seleção de sistema

### **Status Visível:**

No cabeçalho, você sempre verá:
- 🛡️ **Administrador** ou 👁️ **Usuário**
- 🎯 **Sistema atual** (Bipagem ou Mercado SPX)
- 📅 Data e hora atual

---

## 🔐 Alterar Senha do Administrador

Para alterar a senha padrão, edite o arquivo:

**Arquivo:** `app/page.js`

**Linha 14:**
```javascript
const ADMIN_PASSWORD = 'admin123' // Altere aqui
```

**Exemplo:**
```javascript
const ADMIN_PASSWORD = 'minha_senha_segura'
```

---

## 📊 Persistência de Dados

### **Sistema de Bipagem:**
- Arquivo: `data/bipagem.json`
- Contém: bipados e estoque

### **Mercado SPX:**
- Arquivo: `data/mercadospx.json`
- Contém: informações das 20 vagas

### **Backup:**
Os dados são salvos automaticamente a cada alteração. Para fazer backup manual, copie os arquivos JSON da pasta `data/`.

---

## 🎨 Interface

### **Cores dos Sistemas:**
- **Sistema de Bipagem:** 🟠 Laranja (Shopee)
- **Mercado SPX:** 🔵 Azul

### **Grid de Bancadas (Mercado SPX):**
- **Bancada Disponível:** Cinza
- **Bancada Configurada:** Azul
- **Códigos:** Laranja
- **Número da Bancada:** Círculo colorido no canto superior esquerdo

---

## 💡 Dicas de Uso

1. **Auto-refresh:** O sistema de bipagem atualiza automaticamente a cada 3 segundos
2. **Sessão Persistente:** Seu login e sistema escolhido ficam salvos no navegador
3. **Voltar:** Use o botão 🏠 para voltar à seleção de sistema (apenas admin)
4. **Mobile:** Interface responsiva, funciona em celulares e tablets
5. **Múltiplos Usuários:** Vários usuários podem acessar simultaneamente
6. **Códigos em Maiúsculas:** No Mercado SPX, códigos são convertidos automaticamente
7. **Múltiplos Códigos:** Uma bancada pode ter vários códigos simultâneos

---

## 🆘 Solução de Problemas

**Dados não aparecem?**
- Verifique se os arquivos JSON existem em `data/`
- Clique em "Atualizar" ou "Refresh"

**Não consigo adicionar veículos?**
- Verifique se está logado como Administrador
- Badge deve mostrar 🛡️ Administrador

**Esqueci a senha?**
- Veja a seção "Alterar Senha do Administrador"
- Edite `app/page.js` linha 14

**Sistema lento?**
- Desative o auto-refresh no Sistema de Bipagem
- Use o botão "Atualizar" manualmente

---

## 📱 Acesso Remoto

Para acessar de outros dispositivos na mesma rede:

1. Inicie o servidor: `npm run dev`
2. Encontre o IP da máquina: `ifconfig` ou `ipconfig`
3. Acesse de outro dispositivo: `http://IP:3000`

**Exemplo:** `http://192.168.1.100:3000`

---

## 🔒 Segurança

### **Recomendações:**

1. ✅ **Altere a senha padrão** `admin123`
2. ✅ Use senha forte (letras, números, símbolos)
3. ✅ Não compartilhe a senha de administrador
4. ✅ Faça backup regular dos dados
5. ⚠️ O sistema é para uso em rede local/interna

### **Limitações:**

- Senha armazenada no código (não use em produção pública)
- Sem criptografia de dados
- Sem controle de sessão avançado
- Adequado apenas para ambientes internos/controlados

---

## 📝 Resumo Rápido

| Recurso | Administrador | Usuário |
|---------|--------------|---------|
| **Login** | Com senha | Sem senha |
| **Bipagem - Bipar** | ✅ Sim | ❌ Não |
| **Bipagem - Ver** | ✅ Sim | ✅ Sim |
| **Bipagem - Apagar** | ✅ Sim | ❌ Não |
| **Mercado SPX - Adicionar** | ✅ Sim | ❌ Não |
| **Mercado SPX - Ver** | ✅ Sim | ✅ Sim |
| **Mercado SPX - Editar** | ✅ Sim | ❌ Não |
| **Trocar Sistema** | ✅ Sim | ❌ Não* |

*Usuário vê ambos sistemas simultaneamente, não precisa trocar
| **Resetar Dados** | ✅ Sim | ❌ Não |

---

**Versão:** 2.0 - Sistema Integrado  
**Última atualização:** Janeiro 2026

## 🎯 Fluxo de Trabalho Recomendado

### **Cenário: Equipe de Bipagem**

#### **Administrador (1 pessoa):**
- Faz login como admin
- Acessa aba "Bipar"
- Realiza a bipagem dos itens
- Gerencia o sistema

#### **Equipe (várias pessoas):**
- Fazem login como usuários
- Acessam aba "Bipados"
- Acompanham em tempo real
- Visualizam o progresso

---

## 🔒 Segurança

### **Sessão persistente:**

O login de administrador fica salvo no navegador (localStorage), então:

- ✅ Não precisa logar toda vez
- ✅ Mantém sessão mesmo fechando aba
- ❌ Para sair, use o botão "Sair"

### **Limpar sessão manualmente:**

Se precisar limpar a sessão forçadamente:

1. Abra o Console do navegador (F12)
2. Vá na aba "Console"
3. Digite: `localStorage.removeItem('isAdmin')`
4. Recarregue a página (F5)

---

## ⚠️ Observações Importantes

### **Botão "Novo Dia":**
- 🔴 **Apenas administradores** veem este botão
- ⚠️ Apaga **todos os dados**
- 🔒 Requer confirmação dupla

### **Auto-refresh:**
- Funciona para **todos os usuários** (admin e comum)
- Atualiza a cada 3 segundos
- Pode ser desativado manualmente

### **Múltiplos usuários:**
- ✅ Vários usuários podem acessar simultaneamente
- ✅ Atualizações em tempo real para todos
- ✅ Apenas admins podem modificar dados

---

## 🆘 Problemas Comuns

### **"Esqueci a senha de admin"**

**Solução:** Edite o arquivo [app/page.js](app/page.js) linha 12 e altere a senha.

### **"Não consigo sair do modo admin"**

**Solução:** Limpe o localStorage manualmente (veja seção Segurança).

### **"Quero mais de um admin"**

**Solução:** Compartilhe a senha com as pessoas autorizadas.

### **"Quero senhas diferentes por pessoa"**

Isso requer implementação mais avançada com backend e banco de dados. O sistema atual é simplificado para facilidade de uso.

---

## 📝 Resumo Rápido

| Recurso | Admin | Usuário |
|---------|-------|---------|
| 🏷️ Bipar | ✅ | ❌ |
| 👁️ Ver Bipados | ✅ | ✅ |
| 🗑️ Apagar itens | ✅ | ❌ |
| 🔴 Novo Dia | ✅ | ❌ |
| 📊 Estatísticas | ✅ | ❌ |
| 🔄 Auto-refresh | ✅ | ✅ |
| 🚪 Logout | ✅ | ❌ |

---

## 🎉 Pronto!

Agora seu sistema tem controle de acesso:
- 🛡️ Apenas admins podem bipar
- 👁️ Usuários acompanham em tempo real
- 🔐 Sistema simples e eficaz

**Senha padrão:** `admin123`
