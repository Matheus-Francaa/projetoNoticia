import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import * as schema from './schema';

let db: ReturnType<typeof drizzle> | null = null;

export const initializeDatabase = async () => {
    try {
        const dbConnection = await SQLite.openDatabaseAsync('news.db');
        db = drizzle(dbConnection, { schema });

        // Create tables if they don't exist
        await dbConnection.execAsync(
            `CREATE TABLE IF NOT EXISTS news (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        author_id TEXT NOT NULL,
        date TEXT NOT NULL,
        category TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'draft',
        image_url TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );`
        );

        console.log('Database initialized successfully');
        return db;
    } catch (error) {
        console.error('Failed to initialize database:', error);
        throw error;
    }
};

export const getDatabase = () => {
    if (!db) {
        throw new Error('Database not initialized. Call initializeDatabase first.');
    }
    return db;
};
