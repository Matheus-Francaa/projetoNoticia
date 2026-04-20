import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/src/components/Header';
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
    const insets = useSafeAreaInsets();
    const scrollRef = useRef<ScrollView>(null);
    const [comment, setComment] = useState('');
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [comments] = useState<Comment[]>([
        { id: '1', author: 'João', content: 'Ótima notícia!', date: '2024-01-15' },
        { id: '2', author: 'Maria', content: 'Muito interessante.', date: '2024-01-14' },
    ]);

    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardHeight(e.endCoordinates.height);
            // Scroll to bottom when keyboard shows
            setTimeout(() => {
                scrollRef.current?.scrollToEnd({ animated: true });
            }, 100);
        });
        const hideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    const handleSendComment = () => {
        if (comment.trim()) {
            // In a real app, you'd save this to a backend
            console.log('New comment:', comment);
            setComment('');
            Keyboard.dismiss();
        }
    };

    return (
        <View style={styles.container}>
            <Header
                title="Notícia"
                showBackButton
                onBackPress={() => navigation.goBack()}
            />
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={0}
                enabled
            >
                <ScrollView 
                    ref={scrollRef}
                    style={styles.content} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.scrollContent,
                        { paddingBottom: keyboardHeight > 0 ? keyboardHeight + 20 : 120 }
                    ]}
                >
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
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'}
                    </Text>

                    <View style={styles.commentsSection}>
                        <Text style={styles.commentsTitle}>Comentários ({comments.length})</Text>
                        {comments.map((c) => (
                            <View key={c.id} style={styles.commentCard}>
                                <View style={styles.commentHeader}>
                                    <View style={styles.commentAvatar}>
                                        <Text style={styles.commentAvatarText}>
                                            {c.author.charAt(0).toUpperCase()}
                                        </Text>
                                    </View>
                                    <View style={styles.commentInfo}>
                                        <Text style={styles.commentAuthor}>{c.author}</Text>
                                        <Text style={styles.commentDate}>{c.date}</Text>
                                    </View>
                                </View>
                                <Text style={styles.commentContent}>{c.content}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                {/* Comment Input */}
                <View style={[
                    styles.commentInputContainer, 
                    { 
                        paddingBottom: Math.max(insets.bottom, 8),
                        transform: [{ translateY: -keyboardHeight / 2 }]
                    }
                ]}>
                    <View style={styles.commentInputRow}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Escreva um comentário..."
                            value={comment}
                            onChangeText={setComment}
                            multiline
                            maxLength={500}
                            blurOnSubmit={false}
                        />
                        <TouchableOpacity 
                            style={[
                                styles.sendButton, 
                                !comment.trim() && styles.sendButtonDisabled
                            ]}
                            onPress={handleSendComment}
                            disabled={!comment.trim()}
                        >
                            <Text style={styles.sendButtonText}>➤</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
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
        lineHeight: 26,
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
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        elevation: 2,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    commentAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentAvatarText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2196F3',
    },
    commentInfo: {
        marginLeft: 10,
    },
    commentAuthor: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    commentDate: {
        fontSize: 11,
        color: '#999',
    },
    commentContent: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    commentInputContainer: {
        backgroundColor: '#fff',
        paddingTop: 12,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    commentInputRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    commentInput: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 14,
        maxHeight: 100,
        marginRight: 8,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#ccc',
    },
    sendButtonText: {
        fontSize: 18,
        color: '#fff',
    },
});