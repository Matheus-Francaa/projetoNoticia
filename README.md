# 📰 Portal de Notícias - React Native com Expo

Uma aplicação React Native completa desenvolvida com Expo para gerenciamento e leitura de notícias com diferentes níveis de acesso de usuários.

## 🚀 Funcionalidades

### 👤 Público (Sem Login)
- **Home - Lista de Notícias**: Visualizar todas as notícias publicadas
- **Busca por Tag**: Filtrar notícias por tags
- **Busca por UF**: Filtrar notícias por estado
- **Detalhe da Notícia**: Ver conteúdo completo e comentários
- **Cadastro**: Criar uma nova conta
- **Login**: Acessar como diferentes perfis
- **Recuperação de Acesso**: Recuperar acesso via email

### ✍️ Autor
- **Meu Perfil**: Editar informações pessoais
- **Minhas Notícias**: Visualizar, editar e deletar notícias criadas
- **Nova Notícia**: Criar e publicar novas notícias
- **Comentar**: Participar da comunidade com comentários

### 👁️ Leitor
- **Meu Perfil**: Editar informações e preferências
- **Ler Notícias**: Acessar todas as notícias publicadas
- **Comentar**: Adicionar comentários nas notícias

### 📋 Editor
- **Meu Perfil**: Editar informações pessoais
- **Painel de Publicação**: Gerenciar todas as notícias

### 👑 Super Admin
- **Dashboard Completo**: CRUD de Cidades, Tags, Perfis, UF, Notícias, Usuários e Comentários

## 📋 Pré-requisitos

- Node.js 16 ou superior
- npm
- Expo Go (opcional, para celular)

## 🛠️ Instalação

```bash
cd projetoNoticia
npm install
npm start
```

## 💻 Como Usar

Pressione:
- `w` para web
- `a` para Android
- `i` para iOS

Na tela de Login, escolha um dos 3 perfis!

## 📁 Estrutura

```
src/
├── screens/         (Telas por perfil)
├── navigation/      (Navegação)
├── context/         (Autenticação)
├── components/      (Componentes)
└── utils/          (Dados mock)
```

## 🎨 Estilos

- Ícones: Emojis
- Cores: Azul (#2196F3), Laranja, Roxo

## 📝 Notas

- Dados mock (sem backend real)
- Autenticação simulada
- Para fins educacionais

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
