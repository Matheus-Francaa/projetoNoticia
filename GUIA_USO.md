# 📱 Guia de Uso - Portal de Notícias

## 🎯 Começando

### 1. Iniciar a Aplicação

```bash
cd projetoNoticia
npm start
```

### 2. Escolher Plataforma de Teste

No terminal Expo, você verá as opções:

- **Pressione `w`** para abrir no navegador (WEB) - **Recomendado para testes**
- **Pressione `a`** para Android (se tiver Android Studio)
- **Pressione `i`** para iOS (necessário macOS)

## 📋 Fluxo de Navegação

### HOME (Sem Login)

1. **Tela Inicial**
   - Lista de todas as notícias publicadas
   - Cards com título, autor, data e tags
   - Search bar para buscar por título

2. **Botões de Ação (Top)**
   - 📝 **Cadastro**: Criar uma nova conta
   - 🔐 **Login**: Acessar como Autor, Leitor ou Super Admin
   - 🔑 **Recuperar**: Recuperar acesso (código demo: 123456)

3. **Filtros**
   - **Tags**: Clique em uma tag para filtrar notícias
   - **Estados**: Selecione um estado para filtrar por UF

4. **Detalhe da Notícia**
   - Clique em qualquer card para ver a notícia completa
   - Visualize comentários existentes
   - **Para comentar**: Faça login primeiro

### CADASTRO

1. Preencha:
   - Nome Completo *
   - Email *
   - Senha * (mín. 6 caracteres)
   - Confirmar Senha *

2. Após criação, vá para Login

### LOGIN - Escolha seu Perfil

#### ✍️ AUTOR
```
Credenciais: João Autor / joao@noticia.com
```

**Funcionalidades:**
- 👤 Meu Perfil: Editar informações
- 📰 Minhas Notícias: Ver suas notícias
  - ✏️ Editar: Modificar notícia existente
  - 🗑️ Deletar: Remover notícia
- ✨ Nova Notícia: Criar nova
  - Título *
  - Resumo *
  - Conteúdo *
  - Tags (opcional)
  - Selecionar Estado
- 💬 Comentar: Em qualquer notícia
- 🏠 Voltar para Home: Sair do painel

#### 👁️ LEITOR
```
Credenciais: Maria Leitora / maria@noticia.com
```

**Funcionalidades:**
- 👤 Meu Perfil: Editar informações e interesses
- 📰 Ler Notícias: Acessar home como leitor autenticado
- 💬 Comentar: Em notícias (agora funcionará sem ser redirecionado)
- 📱 Minhas Leituras: Ver notícias que você leu/comentou

#### 📋 EDITOR
```
Credenciais: Pedro Editor / pedro@noticia.com
```

**Funcionalidades:**
- 👤 Meu Perfil: Editar informações
- 📊 Painel de Publicação: 
  - Ver todas as notícias
  - 📤 Publicar/Despublicar notícias
  - ✏️ Editar qualquer notícia
  - Ver status de publicação

#### 👑 SUPER ADMIN
```
Credenciais: Admin Sistema / admin@noticia.com
```

**Funcionalidades:**
- 🏙️ CRUD Cidades
- 🏷️ CRUD Tags
- 👥 CRUD Perfis
- 📍 CRUD UF (Estados)
- 📰 CRUD Notícias
- 👤 CRUD Usuários
- 💬 Gerenciar Comentários

## 🔄 Fluxo de Comentários

### Público/Não autenticado:
1. Vá para Home
2. Clique em uma notícia
3. Veja os comentários existentes
4. Para comentar: Clique "Faça login para comentar" → vai para Login

### Autenticado (Leitor/Autor):
1. Vá para Home
2. Clique em uma notícia
3. Digite seu comentário no campo
4. Clique "Enviar Comentário"
5. Seu comentário aparece na lista

## 🔓 Recuperação de Acesso

1. Na Home, clique 🔑 **Recuperar**
2. Passo 1: Digite seu email → Clique "Enviar Código"
3. Passo 2: Digite o código (demo: **123456**)
4. Passo 3: Digite sua nova senha (mín. 6 caracteres)
5. Redefinição concluída → Ao fazer login

## 🎯 Exemplos de Uso

### 1. Listar notícias por tag
- Home → Clique em tag (ex: "React Native") → Veja apenas essas notícias

### 2. Listar notícias por estado
- Home → Clique em estado (ex: "SP") → Veja notícias de SP

### 3. Criar uma notícia (como Autor)
- Login como Autor → ✨ Nova Notícia
- Preencha todos os campos
- Clique "Publicar Notícia"

### 4. Editar notícia publicada (como Editor)
- Login como Editor → 📊 Painel
- Encontre a notícia
- Clique ✏️ Editar

### 5. Gerenciar perfil
- Após login → 👤 Meu Perfil
- Edite nome, email, telefone
- Clique "Salvar Alterações"

## 📊 Dados de Teste

### Notícias Pré-carregadas
- 4 notícias de exemplo
- Tags: React Native, JavaScript, Mobile, Desenvolvimento, etc.
- Estados: SP, RJ, MG, BA, PR, DF

### Usuários de Teste
- João Autor (Author)
- Maria Leitora (Reader)
- Pedro Editor (Editor)
- Admin Sistema (SuperAdmin)

## ⚙️ Recursos Ativos

✅ Navegação entre telas
✅ Autenticação por perfil
✅ Listagem de notícias com filtros
✅ Detalhe de notícia completo
✅ Sistema de comentários
✅ Criação de notícias
✅ Edição de perfil
✅ Menu contextual por perfil
✅ Recuperação de acesso
✅ Cadastro de usuário

## 🐛 Problemas Comuns

### "Aplicação não carrega"
```bash
npm start -- --clear
```

### "Erro de navegação"
- Verifique se está no perfil correto
- Faça logout e login novamente

### "Comentários não salvam"
- Faça login antes de comentar
- Atualize a página após comentar

## 💡 Dicas

1. **Teste todos os perfis** para entender as diferentes permissões
2. **Use os filtros (tags/UF)** para testar a busca
3. **Crie notícias** como Autor para ver na home
4. **Gerencie publicações** como Editor
5. **Acesse Admin** para ver o dashboard completo

## 📱 Responsividade

A app foi desenvolvida para:
- ✅ Celulares (Portrait)
- ✅ Tablets (iPad)
- ✅ Web (Browser)
- ✅ Android
- ✅ iOS

Todos os componentes se adaptam automaticamente!

---

**Aproveite! 🎉**
