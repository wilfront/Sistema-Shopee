# 🚗 Mercado SPX - Manual de Uso

## 📋 Visão Geral

O **Mercado SPX** é um sistema de controle de veículos com 20 vagas numeradas. Cada vaga pode receber um veículo com informações de bancada, responsável e observações.

---

## 🎯 Funcionalidades

### **Sistema de Vagas**
- **20 vagas numeradas** (1 a 20)
- Status visual: **Livre** (cinza) ou **Ocupada** (laranja)
- Informações por vaga:
  - 🚗 **Veículo/Placa** (obrigatório)
  - 🏢 **Bancada** (obrigatório)
  - 👤 **Responsável** (opcional)
  - 📝 **Observação** (opcional)

### **Painel de Estatísticas**
- 🔵 **Total de Vagas:** 20
- 🟢 **Vagas Livres:** Quantidade disponível
- 🟠 **Vagas Ocupadas:** Quantidade em uso

---

## 👨‍💼 Modo Administrador

### **🚗 Adicionar Veículo**

1. Localize uma vaga **livre** (cinza)
2. Clique no botão **"Adicionar"** (verde)
3. Preencha o formulário:
   ```
   Veículo/Placa: ABC-1234 *obrigatório
   Bancada: Bancada 1 *obrigatório
   Responsável: João Silva (opcional)
   Observação: Veículo para carga (opcional)
   ```
4. Clique em **"Salvar"**
5. ✅ Veículo adicionado!

### **✏️ Editar Veículo**

1. Localize a vaga ocupada
2. Clique em **"Editar"** (azul)
3. Modifique os dados necessários
4. Clique em **"Salvar"**
5. ✅ Informações atualizadas!

### **🗑️ Remover Veículo**

1. Localize a vaga ocupada
2. Clique no ícone de **lixeira** (🗑️) vermelho
3. Confirme: "Remover veículo da vaga X?"
4. ✅ Vaga liberada!

### **🔄 Atualizar Dados**

- Clique no botão **"Atualizar"** (azul) no topo
- Recarrega os dados do servidor

### **🗑️ Limpar Tudo**

⚠️ **ATENÇÃO:** Remove TODOS os veículos!

1. Clique em **"Limpar Tudo"** (vermelho)
2. Confirme a ação
3. Todas as vagas ficam livres

---

## 👁️ Modo Usuário (Visualização)

### **O que você pode fazer:**
- ✅ Visualizar todas as 20 vagas
- ✅ Ver veículos, bancadas e responsáveis
- ✅ Acompanhar vagas livres/ocupadas
- ✅ Ver estatísticas em tempo real

### **O que você NÃO pode fazer:**
- ❌ Adicionar veículos
- ❌ Editar informações
- ❌ Remover veículos
- ❌ Limpar dados

**Modo leitura:** Ideal para acompanhamento sem risco de alterações acidentais.

---

## 🎨 Interface Visual

### **Cores das Vagas**

| Status | Cor | Ícone |
|--------|-----|-------|
| **Vaga Livre** | Cinza | ⬜ |
| **Vaga Ocupada** | Laranja | 🚗 |
| **Editando** | Azul (borda) | ✏️ |

### **Botões**

| Botão | Cor | Ação | Permissão |
|-------|-----|------|-----------|
| **Adicionar** | Verde | Nova entrada | Admin |
| **Editar** | Azul | Modificar dados | Admin |
| **Remover** | Vermelho | Deletar entrada | Admin |
| **Atualizar** | Azul | Recarregar dados | Admin |
| **Limpar Tudo** | Vermelho | Limpar sistema | Admin |

---

## 📊 Layout da Tela

```
┌─────────────────────────────────────────────┐
│  [Estatísticas]                              │
│  Total: 20 | Livres: 15 | Ocupadas: 5       │
├─────────────────────────────────────────────┤
│  [Atualizar] [Limpar Tudo]                  │
├─────────────────────────────────────────────┤
│  [Grid de Vagas - 5 colunas]                │
│                                              │
│  [1] [2] [3] [4] [5]                        │
│  [6] [7] [8] [9] [10]                       │
│  [11] [12] [13] [14] [15]                   │
│  [16] [17] [18] [19] [20]                   │
│                                              │
└─────────────────────────────────────────────┘
```

### **Card de Vaga Ocupada:**

```
┌──────────────────┐
│  (5)          🚗 │
│                  │
│  Veículo:        │
│  ABC-1234        │
│                  │
│  Bancada:        │
│  Bancada 2       │
│                  │
│  Responsável:    │
│  Maria Silva     │
│                  │
│  Obs:            │
│  Urgente         │
│                  │
│  [Editar] [🗑️]   │
└──────────────────┘
```

### **Card de Vaga Livre:**

```
┌──────────────────┐
│  (12)         ⬜ │
│                  │
│  Vaga Livre      │
│                  │
│  [Adicionar]     │
└──────────────────┘
```

---

## 💾 Armazenamento de Dados

### **Arquivo:** `data/mercadospx.json`

Estrutura dos dados:
```json
{
  "vagas": {
    "1": {
      "veiculo": "ABC-1234",
      "bancada": "Bancada 1",
      "responsavel": "João Silva",
      "observacao": "Veículo prioritário",
      "timestamp": "2026-01-06T10:30:00.000Z"
    },
    "5": {
      "veiculo": "XYZ-9876",
      "bancada": "Bancada 3",
      "responsavel": "",
      "observacao": "",
      "timestamp": "2026-01-06T11:00:00.000Z"
    }
  }
}
```

### **Backup:**
Para fazer backup, copie o arquivo `data/mercadospx.json`.

---

## 🔄 Fluxo de Trabalho Recomendado

### **Para Administradores:**

1. **Início do Dia:**
   - Verificar vagas livres
   - Preparar bancadas

2. **Chegada de Veículo:**
   - Escolher vaga disponível
   - Adicionar informações do veículo
   - Atribuir bancada e responsável

3. **Durante o Dia:**
   - Atualizar observações conforme necessário
   - Editar informações se houver mudanças

4. **Saída de Veículo:**
   - Remover veículo da vaga
   - Vaga fica disponível automaticamente

5. **Fim do Dia:**
   - Verificar se todas as vagas foram liberadas
   - Fazer backup se necessário

### **Para Usuários (Visualização):**

1. Acessar o sistema
2. Visualizar status das vagas
3. Identificar veículos e bancadas
4. Acompanhar disponibilidade

---

## 📱 Responsividade

O sistema funciona em:
- 💻 **Desktop:** Grid de 5 colunas
- 📱 **Tablet:** Grid de 3 colunas
- 📱 **Mobile:** Grid de 2 colunas

**Todos os recursos estão disponíveis em todos os dispositivos!**

---

## 🎓 Exemplos de Uso

### **Exemplo 1: Adicionar Veículo Simples**
```
Veículo: FGH-5678
Bancada: Bancada 5
[Salvar]
```
✅ Mínimo necessário para adicionar

### **Exemplo 2: Adicionar com Detalhes**
```
Veículo: ABC-1234
Bancada: Bancada 1
Responsável: Carlos Santos
Observação: Veículo VIP - prioridade máxima
[Salvar]
```
✅ Informações completas

### **Exemplo 3: Editar Bancada**
```
[Editar vaga 7]
Bancada: Bancada 1 → Bancada 3
[Salvar]
```
✅ Mudança de bancada

---

## 🆘 Perguntas Frequentes

**P: Posso ter mais de 20 vagas?**  
R: Atualmente o sistema suporta 20 vagas. Para alterar, é necessário modificar o código.

**P: O que acontece se eu fechar o navegador?**  
R: Os dados ficam salvos no arquivo JSON. Ao reabrir, tudo estará lá.

**P: Vários usuários podem usar ao mesmo tempo?**  
R: Sim! O sistema suporta múltiplos acessos simultâneos.

**P: Como faço backup dos dados?**  
R: Copie o arquivo `data/mercadospx.json` para um local seguro.

**P: Posso desfazer uma remoção?**  
R: Não há "desfazer". Sempre confirme antes de remover!

**P: O campo responsável é obrigatório?**  
R: Não, apenas Veículo e Bancada são obrigatórios.

---

## ⚠️ Avisos Importantes

1. ⚠️ **"Limpar Tudo"** remove TODOS os veículos sem confirmação dupla
2. ⚠️ Não há histórico de alterações
3. ⚠️ Remoções são permanentes (a menos que tenha backup)
4. ✅ Sempre verifique os dados antes de salvar
5. ✅ Faça backup regularmente

---

## 📞 Suporte

Para problemas técnicos:
1. Verifique o arquivo [CONTROLE_ACESSO.md](CONTROLE_ACESSO.md)
2. Confirme que está logado como Administrador (se precisar editar)
3. Tente atualizar a página
4. Verifique se o arquivo `data/mercadospx.json` existe

---

**Sistema:** Mercado SPX v1.0  
**Parte de:** Shopee Xpress - Sistema Integrado  
**Última atualização:** Janeiro 2026
