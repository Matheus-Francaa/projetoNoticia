# 🏗️ Arquitetura Técnica - Portal de Notícias

## 📐 Estrutura Geral

```
projetoNoticia/
├── App.js                          # Entrada principal
├── app.json                        # Config Expo
├── package.json                    # Dependências
├── src/
│   ├── screens/                    # Todas as telas
│   │   ├── Public/                # Telas públicas (sem auth)
│   │   │   ├── HomeScreen.js      # Home com lista de notícias
│   │   │   └── NewsDetailScreen.js # Detalhe + comentários
│   │   ├── Auth/                  # Autenticação
│   │   │   ├── LoginScreen.js     # Escolher perfil
│   │   │   ├── RegisterScreen.js  # Criar conta
│   │   │   └── RecoveryScreen.js  # Recuperar acesso
│   │   ├── Author/                # Perfil Autor
│   │   │   ├── AuthorHomeScreen.js
│   │   │   ├── AuthorMyNewsScreen.js
│   │   │   ├── AuthorNewNewsScreen.js
│   │   │   ├── AuthorProfileScreen.js
│   │   │   └── AuthorEditNewsScreen.js
│   │   ├── Reader/                # Perfil Leitor
│   │   │   ├── ReaderHomeScreen.js
│   │   │   └── ReaderProfileScreen.js
│   │   ├── Editor/                # Perfil Editor
│   │   │   ├── EditorHomeScreen.js
│   │   │   ├── EditorPanelScreen.js
│   │   │   └── EditorProfileScreen.js
│   │   └── Admin/                 # Perfil Super Admin
│   │       └── AdminHomeScreen.js
│   ├── navigation/
│   │   └── RootNavigator.js       # Stack navigation por perfil
│   ├── context/
│   │   └── AuthContext.js         # Context de autenticação
│   ├── components/                # Componentes reutilizáveis
│   │   ├── CustomButton.js        # Botão customizado
│   │   ├── Header.js              # Header com title + back
│   │   └── NewsCard.js            # Card de notícia
│   └── utils/
│       └── mockData.js            # Dados de exemplo
└── assets/                        # Imagens e ícones
```

## 🔐 Fluxo de Autenticação

### AuthContext.js

```javascript
// Provides:
- user: { id, name, email, role, avatar }
- userRole: 'author' | 'reader' | 'editor' | 'admin' | null
- login(role): Autentica usuario com um perfil
- logout(): Limpa autenticação
```

### Fluxo:
1. App.js → AuthProvider wrapper
2. RootNavigator verifica userRole
3. Se null → PublicStack (Home, Login, Register, Recovery)
4. Se role → StackNavigator específico do role

## 🧭 Navegação

```
RootNavigator (NavigationContainer)
  ├── PublicStackNavigator
  │   ├── HomeScreen
  │   ├── NewsDetailScreen
  │   ├── LoginScreen → autentica
  │   ├── RegisterScreen
  │   └── RecoveryScreen
  │
  ├── AuthorStackNavigator
  │   ├── AuthorHomeScreen
  │   ├── AuthorProfileScreen
  │   ├── AuthorMyNewsScreen
  │   ├── AuthorNewNewsScreen
  │   ├── AuthorEditNewsScreen
  │   ├── NewsDetailScreen (compartilhado)
  │   └── HomeScreen (voltar para home pública)
  │
  ├── ReaderStackNavigator
  │   ├── ReaderHomeScreen
  │   ├── ReaderProfileScreen
  │   ├── HomeScreen (linkar para ler)
  │   └── NewsDetailScreen
  │
  ├── EditorStackNavigator
  │   ├── EditorHomeScreen
  │   ├── EditorPanelScreen
  │   ├── EditorProfileScreen
  │   ├── HomeScreen
  │   └── NewsDetailScreen
  │
  └── AdminStackNavigator
      ├── AdminHomeScreen (Dashboard)
      └── NewsDetailScreen
```

## 📦 Componentes Principais

### 1. CustomButton
```javascript
<CustomButton 
  title="Texto"
  onPress={() => {}}
  variant="primary|secondary"  // blue ou gray
  style={customStyle}
/>
```

### 2. Header
```javascript
<Header 
  title="Título"
  showBackButton={true}
  onBackPress={() => navigation.goBack()}
/>
```

### 3. NewsCard
```javascript
<NewsCard 
  news={newsObject}
  onPress={() => navigation.navigate('NewsDetail', { news })}
/>
```

## 📊 Dados Mock

### mockNews
- Array de 4 notícias de exemplo
- Cada notícia tem: id, title, excerpt, content, author, date, category, tags, state, image, published, comments

### mockTags
- 8 tags com count

### mockStates
- 6 estados com count

### mockUsers
- 3 usuários de teste (Autor, Leitor, Editor)

### mockCities
- 6 cidades de teste

## 🎨 Estilos

### Paleta de Cores
```javascript
Primária: #2196F3      (Azul - Default)
Secundária: #f0f0f0   (Cinza claro)
Texto: #333           (Escuro)
Texto secundário: #666 (Cinza)
Texto terciário: #999 (Cinza claro)

Por Perfil:
- Author: #4CAF50    (Verde)
- Reader: #2196F3    (Azul)
- Editor: #FF9800    (Laranja)
- Admin: #9C27B0     (Roxo)
```

### Tipografia
- Headings: 24px, bold
- Títulos cards: 16px, bold
- Corpo: 14px, normal
- Labels: 13px, bold
- Captions: 11-12px, normal

### Spacing
- Padding padrão: 16px
- Margens entre items: 8-12px
- Border radius: 8px (standard), 10px (cards)
- Elevation/Shadow: 1-3 (leve)

## 🔄 Fluxo de Dados

### Home Screen
```
HomeScreen
  ├── [Estado local] selectedTag, selectedState, searchText
  ├── [Dados mock] mockNews, mockTags, mockStates
  ├── [Computado] filteredNews = função de filtro
  └──  Renderiza NewsCards com onPress → NewsDetailScreen
```

### Authentication Flow
```
1. Usuário clica "Login"
2. LoginScreen oferece 3 botões (Autor, Leitor, Admin)
3. Clique → useAuth().login(role)
4. AuthContext atualiza user e userRole
5. RootNavigator renderiza StackNavigator correto
6. Usuário vê seu dashboard
```

### News Detail Flow
```
HomeScreen → NewsDetailScreen
  └── Route params: route.params.news
      ├── Renderiza conteúdo
      ├── Mostra comentários
      ├── Se autenticado → permite comentar
      └── Se não autenticado → botão de login
```

## 🧪 Como Testar Diferentes Perfis

1. **Público:**
   - Recarregue app
   - Navegue em Public Stack

2. **Autor:**
   - Home → Login → Selecione "Entrar como Autor"
   - Verá AuthorStack

3. **Leitor:**
   - Home → Login → Selecione "Entrar como Leitor"
   - Verá ReaderStack

4. **Admin:**
   - Home → Login → Selecione "Entrar como Super Admin"
   - Verá AdminStack

5. **Logout:**
   - Em qualquer tela autenticada → "Sair"
   - Volta ao PublicStack

## 📱 Responsividade

- Todos os componentes usam Flexbox
- Padding/Margin adaptativo baseado em proporções
- ScrollView para conteúdo dinâmico
- FlatList para listas otimizadas (se houver muitos itens)

## ⚡ Performance

- Components funcionais com hooks
- Context API para state global (leve)
- Sem re-renders desnecessários
- Navegação stack-based (eficiente)

## 🔮 Melhorias Futuras

- [ ] Backend real (API)
- [ ] Autenticação real (JWT)
- [ ] Persistência local (AsyncStorage)
- [ ] Busca avançada
- [ ] Notificações push
- [ ] Upload de imagens
- [ ] Rate limiting e validações avançadas
- [ ] Testes unitários
- [ ] CI/CD pipeline

## 🚀 Deployment

### Web:
```bash
eas build --platform web
```

### Mobile:
```bash
eas build --platform android    # Google Play
eas build --platform ios        # App Store
```

### Local Testing:
```bash
npm start
# w → web
# a → android
# i → ios
```

---

**Desenvolvido com ❤️ usando React Native + Expo**
