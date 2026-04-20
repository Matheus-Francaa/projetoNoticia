import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { initializeDatabase } from '../db/init';
import { newsStorage, type NewsItem } from '../services/newsStorage';

export interface News extends NewsItem {
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
    const [news, setNews] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize database and load initial data
    useEffect(() => {
        const initialize = async () => {
            try {
                await initializeDatabase();

                // Check if we have data in the database
                const existingNews = await newsStorage.getAllNews();

                if (existingNews.length === 0) {
                    // Load initial news if database is empty
                    for (const newsItem of initialNews) {
                        await newsStorage.addNews({
                            title: newsItem.title,
                            subtitle: newsItem.subtitle,
                            content: newsItem.content,
                            author: newsItem.author,
                            authorId: newsItem.authorId,
                            date: newsItem.date,
                            category: newsItem.category,
                            status: newsItem.status,
                        });
                    }
                    // Reload after inserting initial data
                    const loaded = await newsStorage.getAllNews();
                    setNews(loaded);
                } else {
                    setNews(existingNews);
                }

            } catch (error) {
                console.error('Failed to initialize database:', error);
                // Fallback to initial news in memory if database fails
                setNews(initialNews);
            } finally {
                setIsLoading(false);
            }
        };

        initialize();
    }, []);

    const addNews = useCallback(async (newNews: Omit<News, 'id' | 'date' | 'status'>) => {
        try {
            const newsItem = await newsStorage.addNews({
                ...newNews,
                status: 'pending',
                date: new Date().toISOString().split('T')[0],
            });
            setNews((prev) => [newsItem, ...prev]);
        } catch (error) {
            console.error('Failed to add news:', error);
        }
    }, []);

    const updateNews = useCallback(async (id: string, updates: Partial<News>) => {
        try {
            const success = await newsStorage.updateNews(id, updates);
            if (success) {
                setNews((prev) =>
                    prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
                );
            }
        } catch (error) {
            console.error('Failed to update news:', error);
        }
    }, []);

    const deleteNews = useCallback(async (id: string) => {
        try {
            const success = await newsStorage.deleteNews(id);
            if (success) {
                setNews((prev) => prev.filter((n) => n.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete news:', error);
        }
    }, []);

    const publishNews = useCallback((id: string) => {
        updateNews(id, { status: 'published' });
    }, [updateNews]);

    const rejectNews = useCallback((id: string) => {
        updateNews(id, { status: 'rejected' });
    }, [updateNews]);

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

    if (isLoading) {
        return (
            <NewsContext.Provider value={value}>
                {children}
            </NewsContext.Provider>
        );
    }

    return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function useNews(): NewsContextType {
    const context = useContext(NewsContext);
    if (context === undefined) {
        throw new Error('useNews must be used within a NewsProvider');
    }
    return context;
}