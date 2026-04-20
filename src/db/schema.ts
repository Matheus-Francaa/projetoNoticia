import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const news = sqliteTable('news', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    subtitle: text('subtitle').notNull(),
    content: text('content').notNull(),
    author: text('author').notNull(),
    authorId: text('author_id').notNull(),
    date: text('date').notNull(),
    category: text('category').notNull(),
    status: text('status', { enum: ['draft', 'pending', 'published', 'rejected'] })
        .notNull()
        .default('draft'),
    imageUrl: text('image_url'),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;
