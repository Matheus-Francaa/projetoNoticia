export const mockNews = [
    {
        id: '1',
        title: 'Novo Framework React Native 2025',
        excerpt: 'Conheça as novidades do React Native para este ano...',
        content: 'O React Native continua evoluindo com melhorias significativas em performance e compatibilidade. Nesta notícia, exploraremos as principais novidades lançadas em 2025.',
        author: 'João Autor',
        date: '2024-01-15',
        category: 'Tecnologia',
        tags: ['React Native', 'JavaScript', 'Mobile'],
        state: 'SP',
        image: '📱',
        published: true,
        comments: [
            { id: '1', author: 'Maria', content: 'Muito bom artigo!', date: '2024-01-16' },
        ]
    },
    {
        id: '2',
        title: 'Desenvolvimento Mobile em 2025',
        excerpt: 'As melhores práticas para desenvolvimento mobile...',
        content: 'Com a evolução contínua das tecnologias mobile, é importante estar por dentro das melhores práticas. Veja neste artigo tudo que você precisa saber.',
        author: 'Carlos Developer',
        date: '2024-01-14',
        category: 'Desenvolvimento',
        tags: ['Mobile', 'Desenvolvimento', 'React Native'],
        state: 'RJ',
        image: '💻',
        published: true,
        comments: []
    },
    {
        id: '3',
        title: 'Expo SDK 54 - Guia Completo',
        excerpt: 'Aprenda tudo sobre o Expo SDK 54 neste guia...',
        content: 'O Expo SDK 54 trouxe muitas novas features interessantes. Neste guia completo, vamos explorar cada uma delas.',
        author: 'Ana Tech',
        date: '2024-01-13',
        category: 'Tutoriais',
        tags: ['Expo', 'React Native', 'Tutorial'],
        state: 'MG',
        image: '🚀',
        published: true,
        comments: []
    },
    {
        id: '4',
        title: 'Segurança em Aplicações Mobile',
        excerpt: 'Boas práticas de segurança para apps mobile...',
        content: 'A segurança é crucial em aplicações mobile. Veja neste artigo as principais boas práticas para proteger suas aplicações.',
        author: 'João Autor',
        date: '2024-01-12',
        category: 'Segurança',
        tags: ['Segurança', 'Mobile', 'Boas Práticas'],
        state: 'SP',
        image: '🔒',
        published: true,
        comments: []
    },
];

export const mockTags = [
    { id: '1', name: 'React Native', count: 45 },
    { id: '2', name: 'JavaScript', count: 32 },
    { id: '3', name: 'Mobile', count: 78 },
    { id: '4', name: 'Desenvolvimento', count: 56 },
    { id: '5', name: 'Tutorial', count: 23 },
    { id: '6', name: 'Segurança', count: 19 },
    { id: '7', name: 'Expo', count: 28 },
    { id: '8', name: 'Boas Práticas', count: 42 },
];

export const mockStates = [
    { id: '1', name: 'São Paulo', code: 'SP', count: 23 },
    { id: '2', name: 'Rio de Janeiro', code: 'RJ', count: 18 },
    { id: '3', name: 'Minas Gerais', code: 'MG', count: 15 },
    { id: '4', name: 'Bahia', code: 'BA', count: 12 },
    { id: '5', name: 'Paraná', code: 'PR', count: 10 },
    { id: '6', name: 'Distrito Federal', code: 'DF', count: 8 },
];

export const mockUsers = [
    {
        id: '1',
        name: 'João Autor',
        email: 'joao@noticia.com',
        role: 'author',
        createdAt: '2023-01-01',
        avatar: '👨‍✍️'
    },
    {
        id: '2',
        name: 'Maria Leitora',
        email: 'maria@noticia.com',
        role: 'reader',
        createdAt: '2023-01-05',
        avatar: '👩‍💼'
    },
    {
        id: '3',
        name: 'Pedro Editor',
        email: 'pedro@noticia.com',
        role: 'editor',
        createdAt: '2023-01-10',
        avatar: '👨‍💻'
    },
];

export const mockCities = [
    { id: '1', name: 'São Paulo', state: 'SP' },
    { id: '2', name: 'Rio de Janeiro', state: 'RJ' },
    { id: '3', name: 'Belo Horizonte', state: 'MG' },
    { id: '4', name: 'Salvador', state: 'BA' },
    { id: '5', name: 'Curitiba', state: 'PR' },
    { id: '6', name: 'Brasília', state: 'DF' },
];
