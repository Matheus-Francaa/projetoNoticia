import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Favorite {
    newsId: string;
    addedAt: string;
}

interface Comment {
    id: string;
    newsId: string;
    author: string;
    content: string;
    date: string;
}

interface ReaderContextType {
    favorites: Favorite[];
    comments: Comment[];
    addFavorite: (newsId: string) => void;
    removeFavorite: (newsId: string) => void;
    isFavorite: (newsId: string) => boolean;
    addComment: (newsId: string, content: string, author: string) => void;
    getCommentsByNews: (newsId: string) => Comment[];
}

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

interface ReaderProviderProps {
    children: ReactNode;
}

export function ReaderProvider({ children }: ReaderProviderProps) {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);

    const addFavorite = useCallback((newsId: string) => {
        setFavorites((prev) => {
            if (prev.some((f) => f.newsId === newsId)) return prev;
            return [
                ...prev,
                { newsId, addedAt: new Date().toISOString().split('T')[0] },
            ];
        });
    }, []);

    const removeFavorite = useCallback((newsId: string) => {
        setFavorites((prev) => prev.filter((f) => f.newsId !== newsId));
    }, []);

    const isFavorite = useCallback(
        (newsId: string) => favorites.some((f) => f.newsId === newsId),
        [favorites]
    );

    const addComment = useCallback((newsId: string, content: string, author: string) => {
        const comment: Comment = {
            id: Date.now().toString(),
            newsId,
            author,
            content,
            date: new Date().toISOString().split('T')[0],
        };
        setComments((prev) => [...prev, comment]);
    }, []);

    const getCommentsByNews = useCallback(
        (newsId: string) => comments.filter((c) => c.newsId === newsId),
        [comments]
    );

    return (
        <ReaderContext.Provider
            value={{
                favorites,
                comments,
                addFavorite,
                removeFavorite,
                isFavorite,
                addComment,
                getCommentsByNews,
            }}
        >
            {children}
        </ReaderContext.Provider>
    );
}

export function useReader() {
    const context = useContext(ReaderContext);
    if (context === undefined) {
        throw new Error('useReader must be used within a ReaderProvider');
    }
    return context;
}