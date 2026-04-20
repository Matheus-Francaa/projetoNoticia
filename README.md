# 📰 Portal de Notícias com Persistência Local

Aplicação React Native com Expo para gerenciamento de notícias com **CRUD completo** e persistência local usando **SQLite + Drizzle ORM**.

## 🚀 Como Rodar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar a Aplicação
```bash
npm start
```

### 3. Escolher Plataforma
- Pressione `w` para web
- Pressione `a` para Android  
- Pressione `i` para iOS

Na tela de Login, escolha um dos 3 perfis (Público, Autor, Leitor, Editor ou Admin).

## 💾 CRUD de Notícias

### Usar em Qualquer Componente

```typescript
import { useNews } from '@/src/context/NewsContext';

export function MeuComponente() {
  const { news, addNews, updateNews, deleteNews } = useNews();
}
```

### Exemplo: Listar, Criar, Editar e Deletar

```typescript
import { useNews } from '@/src/context/NewsContext';
import { FlatList, Button, Text, View } from 'react-native';

export function NewsScreen() {
  const { news, addNews, updateNews, deleteNews } = useNews();

  // Criar notícia
  const criar = async () => {
    await addNews({
      title: 'Meu Título',
      subtitle: 'Subtítulo',
      content: 'Conteúdo da notícia...',
      author: 'João Silva',
      authorId: 'author1',
      date: '2024-04-20',
      category: 'Tecnologia',
      status: 'draft'
    });
  };

  // Atualizar notícia
  const atualizar = async (id: string) => {
    await updateNews(id, { status: 'published' });
  };

  // Deletar notícia
  const deletar = async (id: string) => {
    await deleteNews(id);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Nova Notícia" onPress={criar} />
      
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.author}</Text>
            <Button title="Editar" onPress={() => atualizar(item.id)} />
            <Button title="Deletar" onPress={() => deletar(item.id)} color="red" />
          </View>
        )}
      />
    </View>
  );
}
```

### Operações Disponíveis

**CREATE (Criar):**
```typescript
await addNews({ title, subtitle, content, author, authorId, date, category, status })
```

**READ (Ler):**
```typescript
news                          // Todas as notícias
getNewsById(id)              // Uma específica
getNewsByAuthor(authorId)    // Notícias de um autor
getPendingNews()             // Notícias pendentes
getPublishedNews()           // Notícias publicadas
```

**UPDATE (Atualizar):**
```typescript
await updateNews(id, { status: 'published' })
await publishNews(id)         // Atalho: muda status para 'published'
await rejectNews(id)          // Atalho: muda status para 'rejected'
```

**DELETE (Deletar):**
```typescript
await deleteNews(id)
```

## 🗄️ Banco de Dados

- **SQLite** com expo-sqlite (persistência local)
- **Drizzle ORM** para queries type-safe
- **Tabela**: `news` com 12 campos
- **Dados Demo**: 3 notícias iniciais (carregadas automaticamente na primeira vez)

## 📁 Arquivos Criados

```
src/db/
├── schema.ts          ← Schema Drizzle (definição da tabela)
└── init.ts            ← Inicialização do SQLite

src/services/
└── newsStorage.ts     ← Serviço CRUD (operações de banco)

src/context/
└── NewsContext.tsx    ← React Context com persistência (hook useNews)
```

## ✨ Características

- ✅ **Persistência Automática** - Dados salvam em SQLite
- ✅ **Type-Safe** - TypeScript + Drizzle ORM
- ✅ **Pronto para Usar** - Nenhuma configuração extra necessária
- ✅ **Sincronizado** - State React sincronizado com banco
- ✅ **Dados Demo** - 3 notícias iniciais quando banco está vazio

## 🎯 Funcionalidades por Perfil

### 👤 Público
- Ver notícias publicadas
- Cadastro e login

### ✍️ Autor  
- Criar, editar e deletar próprias notícias
- Comentar em notícias

### 👁️ Leitor
- Ler notícias publicadas
- Comentar

### 📋 Editor
- Gerenciar publicação de notícias

### 👑 Admin
- Acesso completo ao sistema

## 📋 Pré-requisitos

- Node.js 16+
- npm
- Expo Go (opcional, para celular)

## ✅ Pronto para Usar

Código compilado sem erros:
```bash
npm run lint
# ✅ PASSOU
```

Agora é só usar!
