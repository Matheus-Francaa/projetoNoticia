import { desc, eq } from 'drizzle-orm';
import { getDatabase } from '../db/init';
import { news, type InsertNews } from '../db/schema';

export interface NewsItem {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    author: string;
    authorId: string;
    date: string;
    category: string;
    status: 'draft' | 'pending' | 'published' | 'rejected';
    imageUrl?: string;
}

export class NewsStorage {
    async addNews(newsData: Omit<NewsItem, 'id'>): Promise<NewsItem> {
        const db = getDatabase();
        const id = Date.now().toString();
        const now = new Date();

        const insertData: InsertNews = {
            id,
            title: newsData.title,
            subtitle: newsData.subtitle,
            content: newsData.content,
            author: newsData.author,
            authorId: newsData.authorId,
            date: newsData.date,
            category: newsData.category,
            status: newsData.status,
            imageUrl: newsData.imageUrl,
            createdAt: now,
            updatedAt: now,
        };

        await db.insert(news).values(insertData).run();
        return { id, ...newsData };
    }

    async updateNews(id: string, updates: Partial<NewsItem>): Promise<boolean> {
        const db = getDatabase();
        const now = new Date();

        const result = await db
            .update(news)
            .set({ ...updates, updatedAt: now })
            .where(eq(news.id, id))
            .run();

        return result.changes > 0;
    }

    async deleteNews(id: string): Promise<boolean> {
        const db = getDatabase();
        const result = await db.delete(news).where(eq(news.id, id)).run();
        return result.changes > 0;
    }

    async getNewsById(id: string): Promise<NewsItem | null> {
        const db = getDatabase();
        const result = await db
            .select()
            .from(news)
            .where(eq(news.id, id))
            .get();

        if (!result) return null;

        return {
            id: result.id,
            title: result.title,
            subtitle: result.subtitle,
            content: result.content,
            author: result.author,
            authorId: result.authorId,
            date: result.date,
            category: result.category,
            status: result.status as 'draft' | 'pending' | 'published' | 'rejected',
            imageUrl: result.imageUrl || undefined,
        };
    }

    async getAllNews(): Promise<NewsItem[]> {
        const db = getDatabase();
        const results = await db
            .select()
            .from(news)
            .orderBy(desc(news.createdAt))
            .all();

        return results.map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            content: item.content,
            author: item.author,
            authorId: item.authorId,
            date: item.date,
            category: item.category,
            status: item.status as 'draft' | 'pending' | 'published' | 'rejected',
            imageUrl: item.imageUrl || undefined,
        }));
    }

    async getNewsByAuthor(authorId: string): Promise<NewsItem[]> {
        const db = getDatabase();
        const results = await db
            .select()
            .from(news)
            .where(eq(news.authorId, authorId))
            .orderBy(desc(news.createdAt))
            .all();

        return results.map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            content: item.content,
            author: item.author,
            authorId: item.authorId,
            date: item.date,
            category: item.category,
            status: item.status as 'draft' | 'pending' | 'published' | 'rejected',
            imageUrl: item.imageUrl || undefined,
        }));
    }

    async getNewsByStatus(status: 'draft' | 'pending' | 'published' | 'rejected'): Promise<NewsItem[]> {
        const db = getDatabase();
        const results = await db
            .select()
            .from(news)
            .where(eq(news.status, status))
            .orderBy(desc(news.createdAt))
            .all();

        return results.map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            content: item.content,
            author: item.author,
            authorId: item.authorId,
            date: item.date,
            category: item.category,
            status: item.status as 'draft' | 'pending' | 'published' | 'rejected',
            imageUrl: item.imageUrl || undefined,
        }));
    }

    async getPendingNews(): Promise<NewsItem[]> {
        return this.getNewsByStatus('pending');
    }

    async getPublishedNews(): Promise<NewsItem[]> {
        return this.getNewsByStatus('published');
    }

    async getDraftNews(): Promise<NewsItem[]> {
        return this.getNewsByStatus('draft');
    }

    async clearAllNews(): Promise<void> {
        const db = getDatabase();
        await db.delete(news).run();
    }
}

export const newsStorage = new NewsStorage();
