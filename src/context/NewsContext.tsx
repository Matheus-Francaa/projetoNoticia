import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface News {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    author: string;
    authorId: string;
    date: string;
    category: string;
    status: 'draft' | 'pending' | 'published' | 'rejected';
    comments?: Comment[];
}

export interface Comment {
    id: string;
    author: string;
    content: string;
    date: string;
}

interface NewsContextType {
    news: News[];
    addNews: (news: Omit<News, 'id' | 'date' | 'status'>) => void;
    updateNews: (id: string, updates: Partial<News>) => void;
    deleteNews: (id: string) => void;
    publishNews: (id: string) => void;
    rejectNews: (id: string) => void;
    getNewsById: (id: string) => News | undefined;
    getNewsByAuthor: (authorId: string) => News[];
    getPendingNews: () => News[];
    getPublishedNews: () => News[];
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

interface NewsProviderProps {
    children: ReactNode;
}

const initialNews: News[] = [
    {
        id: '1',
        title: 'Nova tecnologia revoluciona o mercado',
        subtitle: 'Inovação promete mudar a forma como trabalhamos',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        author: 'João Silva',
        authorId: 'author1',
        date: '2024-01-15',
        category: 'Tecnologia',
        status: 'published',
    },
    {
        id: '2',
        title: 'Esportes: Time nacional conquista título',
        subtitle: 'Uma vitória histórica',
        content: 'O time nacional conquistou um título histórico...',
        author: 'Maria Santos',
        authorId: 'author2',
        date: '2024-01-14',
        category: 'Esportes',
        status: 'published',
    },
    {
        id: '3',
        title: 'Economia em recuperação',
        subtitle: 'Indicadores mostram crescimento',
        content: 'A economia mostra sinais de recuperação...',
        author: 'Pedro Oliveira',
        authorId: 'author3',
        date: '2024-01-13',
        category: 'Economia',
        status: 'pending',
    },
];

export function NewsProvider({ children }: NewsProviderProps) {
    const [news, setNews] = useState<News[]>(initialNews);

    const addNews = useCallback((newNews: Omit<News, 'id' | 'date' | 'status'>) => {
        const id = Date.now().toString();
        const newsItem: News = {
            ...newNews,
            id,
            date: new Date().toISOString().split('T')[0],
            status: 'pending',
        };
        setNews((prev) => [newsItem, ...prev]);
    }, []);

    const updateNews = useCallback((id: string, updates: Partial<News>) => {
        setNews((prev) =>
            prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
        );
    }, []);

    const deleteNews = useCallback((id: string) => {
        setNews((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const publishNews = useCallback((id: string) => {
        setNews((prev) =>
            prev.map((n) => (n.id === id ? { ...n, status: 'published' as const } : n))
        );
    }, []);

    const rejectNews = useCallback((id: string) => {
        setNews((prev) =>
            prev.map((n) => (n.id === id ? { ...n, status: 'rejected' as const } : n))
        );
    }, []);

    const getNewsById = useCallback(
        (id: string) => news.find((n) => n.id === id),
        [news]
    );

    const getNewsByAuthor = useCallback(
        (authorId: string) => news.filter((n) => n.authorId === authorId),
        [news]
    );

    const getPendingNews = useCallback(
        () => news.filter((n) => n.status === 'pending'),
        [news]
    );

    const getPublishedNews = useCallback(
        () => news.filter((n) => n.status === 'published'),
        [news]
    );

    const value: NewsContextType = {
        news,
        addNews,
        updateNews,
        deleteNews,
        publishNews,
        rejectNews,
        getNewsById,
        getNewsByAuthor,
        getPendingNews,
        getPublishedNews,
    };

    return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function useNews(): NewsContextType {
    const context = useContext(NewsContext);
    if (context === undefined) {
        throw new Error('useNews must be used within a NewsProvider');
    }
    return context;
}