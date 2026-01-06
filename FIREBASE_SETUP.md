# Configuração do Firebase Authentication

Este guia explica como configurar o Firebase para autenticação de usuários no sistema.

## 📋 Pré-requisitos

1. Conta no Google/Firebase Console
2. Projeto criado no Firebase

## 🔧 Passo a Passo

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Digite o nome do projeto (ex: "shopee-xpress-bipagem")
4. Siga os passos de criação

### 2. Ativar Authentication

1. No menu lateral, clique em "Authentication"
2. Clique em "Começar"
3. Na aba "Sign-in method", ative "Email/Senha"

### 3. Criar Usuários

1. Na aba "Users", clique em "Adicionar usuário"
2. Adicione os usuários:
   - **Administrador**: `admin@shopee.com` / `admin123`
   - **Usuário**: `usuario@shopee.com` / `user123`

### 4. Configurar Firestore Database

⚠️ **IMPORTANTE: Use Modo PRODUÇÃO para dados permanentes!**

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. **Escolha "Modo de produção"** (Production mode)
   - ❌ NÃO escolha "Modo de teste" - expira em 30 dias e apaga tudo!
   - ✅ Produção = Dados salvos PERMANENTEMENTE, nunca expiram
4. Selecione a localização: **southamerica-east1 (São Paulo)**
5. Clique em "Ativar"

### 5. Regras de Segurança do Firestore

⚠️ **Configure as regras para permitir acesso permanente:**

1. Na aba "Regras", cole o código abaixo
2. Clique em "Publicar"

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ✅ Permite leitura e escrita para usuários autenticados
    // ✅ SEM EXPIRAÇÃO - dados nunca são apagados automaticamente
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Collection de usuários
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Collection de bipagem
    match /bipagem/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Collection de mercado SPX
    match /mercadospx/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

✅ **Com essas regras, seus dados ficam salvos para sempre!**

### 6. Obter Credenciais do Firebase

1. No menu lateral, clique no ícone de engrenagem ⚙️ > "Configurações do projeto"
2. Role até "Seus aplicativos"
3. Clique no ícone `</>` (Web)
4. Registre o app com um nome (ex: "Web App")
5. Copie as configurações do Firebase

### 7. Configurar Variáveis de Ambiente

Edite o arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua-api-key-aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### 8. Instalar Dependências

```bash
npm install firebase
```

### 9. Reiniciar o Servidor

```bash
npm run dev
```

## 🔐 Credenciais Padrão (Para Desenvolvimento)

**Administrador:**
- Email: `admin@shopee.com`
- Senha: `admin123`
- Permissões: Acesso completo (bipar, editar, visualizar)

**Usuário:**
- Email: `usuario@shopee.com`
- Senha: `user123`
- Permissões: Apenas visualização

## 📱 Estrutura de Dados no Firestore

```
/users/{userId}
  - email: string
  - role: 'admin' | 'user'
  - createdAt: timestamp

/bipagem/data
  - bipados: object
  - estoque: array
  - updatedAt: timestamp

/mercadospx/data
  - vagas: object
  - updatedAt: timestamp
```

## 🔄 Migrar para Firebase (Futuro)

Para migrar completamente para Firebase:

1. Substituir o objeto `USERS` por Firebase Authentication
2. Mover dados de `data/bipagem.json` para Firestore
3. Mover dados de `data/mercadospx.json` para Firestore
4. Atualizar `lib/dataManager.js` para usar Firestore

## 🆘 Suporte

Em caso de dúvidas, consulte:
- [Documentação Firebase](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
