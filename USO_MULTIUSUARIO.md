# 👥 Guia de Uso Multi-Usuário

## 🌐 Como Funcionar com Várias Pessoas

### ✅ O que já está funcionando:

O sistema **já possui atualização automática em tempo real**! Quando configurado corretamente, todas as pessoas verão as mudanças automaticamente.

## 🚀 Configuração para Múltiplos Usuários

### **Opção 1: Servidor Central (Recomendado)**

Uma pessoa roda o servidor e compartilha o IP na rede local:

#### 1️⃣ **Pessoa que vai hospedar:**

```bash
# 1. Entre na pasta do projeto
cd /home/linux/bipagem

# 2. Instale as dependências (apenas primeira vez)
npm install

# 3. Inicie o servidor (escutando em todas as interfaces)
npm run dev -- --hostname 0.0.0.0
```

#### 2️⃣ **Descubra o IP da máquina:**

```bash
# Linux/Mac
hostname -I | awk '{print $1}'

# Ou veja todas as conexões
ip addr show
```

Exemplo de resultado: `192.168.1.100`

#### 3️⃣ **Outras pessoas acessam:**

No navegador das outras máquinas, acesse:
```
http://192.168.1.100:3000
```

**Substitua `192.168.1.100` pelo IP real da máquina que está rodando o servidor!**

---

### **Opção 2: Cada um roda localmente (Não recomendado)**

❌ **Problema:** Cada máquina terá seus próprios dados separados. Não sincroniza entre pessoas.

---

## 🔄 Atualização Automática (Tempo Real)

O sistema possui **auto-refresh a cada 3 segundos**:

- ✅ **Auto-refresh ativado** (padrão): Os dados são atualizados automaticamente
- ⏸️ **Auto-refresh desativado**: Você precisa clicar em "Atualizar" manualmente
- 🔄 **Botão Atualizar**: Força uma atualização imediata dos dados

### Como funciona:

1. **Pessoa A bipa um item** na Gaiola 5
2. Em **até 3 segundos**, **todas as outras pessoas** verão o item aparecer
3. Todos veem a **mesma tabela atualizada** em tempo real

---

## 🗓️ Começar Novo Dia

Para resetar todos os dados e começar um novo processo de bipagem:

1. Clique no botão **"Novo Dia"** (vermelho) no topo da página
2. Confirme a ação (tem confirmação dupla por segurança)
3. **Todos os dados serão apagados**
4. Pronto para começar do zero!

⚠️ **ATENÇÃO:** Esta ação é irreversível e apaga tudo. Use com cuidado!

---

## 📊 Fluxo de Trabalho Diário

### **Início do Dia:**
1. Uma pessoa inicia o servidor
2. Compartilha o IP com a equipe
3. Todos acessam pelo navegador
4. Se for um novo dia, clique em "Novo Dia" para resetar

### **Durante o Dia:**
1. Qualquer pessoa pode bipar itens
2. Todos veem as mudanças automaticamente
3. O auto-refresh mantém todos sincronizados

### **Fim do Dia:**
1. Os dados ficam salvos no servidor
2. Pode fechar os navegadores
3. No próximo dia, use "Novo Dia" para resetar

---

## 🔧 Configuração de Porta (Opcional)

Se a porta 3000 estiver ocupada, use outra:

```bash
# Usar porta 4000
npm run dev -- --hostname 0.0.0.0 --port 4000

# Acessar em: http://IP:4000
```

---

## 🔐 Segurança na Rede Local

### ✅ **Firewall:**

Se outras máquinas não conseguirem acessar, libere a porta:

**Ubuntu/Linux:**
```bash
sudo ufw allow 3000
```

**Windows:**
- Painel de Controle → Firewall → Adicionar Regra
- Porta TCP 3000

---

## 📱 Acessar de Celular/Tablet

Funciona também! Basta acessar:
```
http://IP_DO_SERVIDOR:3000
```

---

## ❓ Problemas Comuns

### **Outras pessoas não conseguem acessar:**

1. ✅ Servidor está rodando?
2. ✅ Usou `--hostname 0.0.0.0`?
3. ✅ Firewall liberado?
4. ✅ Mesma rede WiFi/LAN?
5. ✅ IP correto?

### **Dados não atualizam:**

1. ✅ Auto-refresh está ativado (checkbox marcado)?
2. ✅ Todas as pessoas acessando o **mesmo servidor**?
3. ✅ Conexão com internet/rede ok?

### **Teste de conexão:**

```bash
# De outra máquina, teste se consegue alcançar
ping 192.168.1.100

# Teste se a porta está aberta
curl http://192.168.1.100:3000
```

---

## 🎯 Resumo Rápido

| Recurso | Status |
|---------|--------|
| ✅ Multi-usuário | Sim (servidor central) |
| ✅ Tempo real | Sim (auto-refresh 3s) |
| ✅ Resetar diário | Sim (botão "Novo Dia") |
| ✅ Mobile | Sim (responsivo) |
| ✅ Rede local | Sim |
| ❌ Internet pública | Não (apenas LAN) |

---

## 🚀 Comando Rápido para Iniciar

```bash
cd /home/linux/bipagem
npm run dev -- --hostname 0.0.0.0
```

**Pronto! Compartilhe o IP com a equipe e todos podem acessar! 🎉**
