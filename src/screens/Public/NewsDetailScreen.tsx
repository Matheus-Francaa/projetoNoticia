import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { CustomButton } from '@/src/components/CustomButton';
import { NavigationAdapter } from '@/src/types';

interface Comment {
    id: string;
    author: string;
    content: string;
    date: string;
}

interface NewsDetailScreenProps {
    navigation: NavigationAdapter;
    news?: {
        id: string;
        title: string;
        subtitle: string;
        author: string;
        date: string;
        category: string;
        content?: string;
    };
}

export function NewsDetailScreen({ navigation, news }: NewsDetailScreenProps) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<Comment[]>([
        { id: '1', author: 'João', content: 'Ótima notícia!', date: '2024-01-15' },
        { id: '2', author: 'Maria', content: 'Muito interessante.', date: '2024-01-14' },
    ]);

    const handleAddComment = () => {
        if (comment.trim()) {
            setComments([
                ...comments,
                {
                    id: Date.now().toString(),
                    author: 'Você',
                    content: comment,
                    date: new Date().toISOString().split('T')[0],
                },
            ]);
            setComment('');
        }
    };

    return (
        <View style={styles.container}>
            <Header
                title="Notícia"
                showBackButton
                onBackPress={() => navigation.goBack()}
            />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{news?.category || 'Geral'}</Text>
                </View>
                <Text style={styles.title}>{news?.title || 'Título da Notícia'}</Text>
                <Text style={styles.subtitle}>{news?.subtitle || 'Subtítulo'}</Text>
                <View style={styles.meta}>
                    <Text style={styles.author}>Por {news?.author || 'Autor'}</Text>
                    <Text style={styles.date}>{news?.date || new Date().toISOString().split('T')[0]}</Text>
                </View>
                <Text style={styles.body}>
                    {news?.content ||
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'}
                </Text>

                <View style={styles.commentsSection}>
                    <Text style={styles.commentsTitle}>Comentários ({comments.length})</Text>
                    {comments.map((c) => (
                        <View key={c.id} style={styles.commentCard}>
                            <View style={styles.commentHeader}>
                                <Text style={styles.commentAuthor}>{c.author}</Text>
                                <Text style={styles.commentDate}>{c.date}</Text>
                            </View>
                            <Text style={styles.commentContent}>{c.content}</Text>
                        </View>
                    ))}

                    <View style={styles.addComment}>
                        <Text style={styles.addCommentTitle}>Adicionar comentário</Text>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Digite seu comentário..."
                            value={comment}
                            onChangeText={setComment}
                            multiline
                        />
                        <CustomButton title="Enviar" onPress={handleAddComment} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    categoryBadge: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    categoryText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 12,
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    author: {
        fontSize: 14,
        color: '#2196F3',
        fontWeight: '500',
    },
    date: {
        fontSize: 14,
        color: '#999',
    },
    body: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 24,
    },
    commentsSection: {
        marginTop: 8,
    },
    commentsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    commentCard: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    commentAuthor: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    commentDate: {
        fontSize: 12,
        color: '#999',
    },
    commentContent: {
        fontSize: 14,
        color: '#666',
    },
    addComment: {
        marginTop: 16,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
    },
    addCommentTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    commentInput: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        height: 80,
        textAlignVertical: 'top',
        marginBottom: 12,
    },
});
