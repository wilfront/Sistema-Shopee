# 🔄 Sincronização Entre Dispositivos - Atualização

## O que mudou?

Agora o sistema sincroniza automaticamente entre **celular e desktop**!

## ✨ Recursos

### 1. **Auto-refresh a cada 3 segundos**
- A planilha atualiza automaticamente
- Funciona em todos os dispositivos conectados
- Pode ser desligado usando o checkbox "Auto-refresh"

### 2. **Botão de atualização manual**
- Clique no botão "🔄 Atualizar" para forçar atualização imediata
- Útil quando auto-refresh está desligado

### 3. **Dados centralizados no servidor**
- Substitui localStorage por arquivo JSON no servidor
- Localizado em: `data/bipagem.json`
- Todos os dispositivos leem/escrevem no mesmo arquivo

## 🚀 Como usar

### Desktop
1. Acesse: http://localhost:3000
2. Adicione/remova dados normalmente
3. Alterações aparecem automaticamente no celular

### Celular
1. Acesse: http://192.168.1.12:3000
2. Visualize dados em tempo real
3. Adicione/remova dados (sincroniza com desktop)

## 📁 Estrutura técnica

### API Route
- **Endpoint**: `/api/data`
- **GET**: Carrega dados do servidor
- **POST**: Salva dados no servidor

### Arquivo de dados
```
data/
  └── bipagem.json
```

### dataManager.js
- Substituído localStorage por `fetch('/api/data')`
- Funções agora são assíncronas (async/await)

### page.js
- Adicionado estado `autoRefresh`
- Implementado `setInterval` para polling a cada 3s
- Botões de controle na barra de tabs

## ⚙️ Configuração

### Auto-refresh
- **Ativado por padrão**: ✅
- **Intervalo**: 3 segundos
- **Pode desligar**: Checkbox "Auto-refresh"

### Performance
- Cache desabilitado: `cache: 'no-store'`
- Garante dados sempre atualizados
- Não sobrecarrega o servidor (apenas 3s intervalo)

## 🔧 Resolução de problemas

### Dados não sincronizam
1. Verifique se ambos dispositivos estão na mesma rede WiFi
2. Certifique que auto-refresh está ativado (checkbox marcado)
3. Clique em "Atualizar" para forçar sincronização

### Planilha não carrega
1. Verifique se o servidor está rodando
2. Veja o console do navegador (F12) para erros
3. Reinicie o servidor: `npm run dev`

## 📊 Migração de dados

Os dados antigos do localStorage **não serão migrados** automaticamente.

Para migrar manualmente:
1. No desktop, abra o console (F12)
2. Digite: `localStorage.getItem('bipagem_data.json')`
3. Copie o conteúdo
4. Crie o arquivo `data/bipagem.json` com esse conteúdo

## 🎯 Próximos passos sugeridos

- [ ] WebSockets para sincronização instantânea (sem polling)
- [ ] Indicador visual de "Sincronizando..."
- [ ] Backup automático dos dados
- [ ] Modo offline com sincronização posterior
