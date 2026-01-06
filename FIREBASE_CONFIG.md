# Configuração do Firebase para Deploy na Vercel

## Por que preciso do Firebase?

A Vercel não permite escrita em arquivos no sistema serverless. Por isso, precisamos usar um banco de dados em nuvem. O Firebase Firestore é gratuito e perfeito para esta aplicação.

## Passos para configurar:

### 1. Criar projeto no Firebase Console

1. Acesse: https://console.firebase.google.com/
2. Clique em "Adicionar projeto" ou "Create a project"
3. Nome do projeto: `shopee-xpress-bipagem` (ou qualquer nome)
4. Desabilite o Google Analytics (não é necessário)
5. Clique em "Criar projeto"

### 2. Ativar o Firestore

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Selecione "Iniciar no modo de produção"
4. Escolha a localização: `southamerica-east1` (São Paulo) ou mais próxima
5. Clique em "Ativar"

### 3. Configurar regras de segurança

No Firestore, vá em "Regras" e substitua por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura e escrita para todos (para simplificar)
    // Em produção real, implemente autenticação adequada
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**IMPORTANTE**: Estas regras permitem acesso público. Para produção, implemente autenticação adequada.

### 4. Obter as credenciais

1. No Firebase Console, clique no ícone de engrenagem ⚙️ > "Configurações do projeto"
2. Role até "Seus aplicativos" e clique no ícone da Web `</>`
3. Registre o app com o nome: `Shopee Xpress Bipagem`
4. NÃO precisa configurar Firebase Hosting
5. Copie as configurações que aparecem

Você verá algo assim:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### 5. Configurar variáveis de ambiente na Vercel

1. Acesse seu projeto na Vercel: https://vercel.com/
2. Vá em Settings > Environment Variables
3. Adicione cada variável:

```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = seu-projeto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 123456789012
NEXT_PUBLIC_FIREBASE_APP_ID = 1:123456789012:web:abcdef123456
```

4. Marque "Production", "Preview" e "Development"
5. Clique em "Save"

### 6. Redeploy na Vercel

Depois de adicionar as variáveis:

1. Vá em Deployments
2. Clique nos 3 pontinhos do último deployment
3. Clique em "Redeploy"
4. Confirme

**Pronto!** Agora o sistema funcionará na Vercel salvando os dados no Firestore.

## Como funciona?

- **Localmente**: Continua usando arquivos JSON em `data/`
- **Na Vercel**: Usa automaticamente o Firestore
- A detecção é automática pela variável `process.env.VERCEL`

## Testando

Após o deploy:
1. Acesse seu site na Vercel
2. Faça login
3. Adicione um responsável a uma bancada
4. Verifique se salvou (recarregue a página)
5. Os dados devem persistir no Firestore

## Custo

O Firebase Firestore tem um plano gratuito generoso:
- 1 GB de armazenamento
- 50.000 leituras por dia
- 20.000 escritas por dia
- 20.000 exclusões por dia

Para este sistema, é mais do que suficiente e **totalmente gratuito**.
