import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';
import { useAuth } from '../../context/AuthContext';

export const NewsDetailScreen = ({ navigation, route }) => {
    const { news } = route.params;
    const { user, userRole } = useAuth();
    const [comments, setComments] = useState(news.comments || []);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim() === '') {
            alert('Por favor, escreva um comentário!');
            return;
        }

        if (!user) {
            alert('Você precisa fazer login para comentar!');
            return;
        }

        const comment = {
            id: (comments.length + 1).toString(),
            author: user.name,
            content: newComment,
            date: new Date().toLocaleDateString('pt-BR')
        };

        setComments([...comments, comment]);
        setNewComment('');
    };

    return (
        <View style={styles.container}>
            <Header
                title="📰 Notícia"
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView style={styles.content}>
                {/* Image */}
                <View style={styles.imageContainer}>
                    <Text style={styles.image}>{news.image}</Text>
                </View>

                {/* Title */}
                <Text style={styles.title}>{news.title}</Text>

                {/* Meta Info */}
                <View style={styles.metaContainer}>
                    <Text style={styles.author}>{news.author}</Text>
                    <Text style={styles.date}>{new Date(news.date).toLocaleDateString('pt-BR')}</Text>
                    <Text style={styles.category}>{news.category}</Text>
                </View>

                {/* Tags */}
                <View style={styles.tagsContainer}>
                    {news.tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>

                {/* State */}
                <View style={styles.stateContainer}>
                    <Text style={styles.stateLabel}>📍 Estado:</Text>
                    <Text style={styles.state}>{news.state}</Text>
                </View>

                {/* Content */}
                <Text style={styles.content_text}>{news.content}</Text>

                {/* Comments Section */}
                <View style={styles.commentsSection}>
                    <Text style={styles.commentsTitle}>💬 Comentários</Text>

                    {/* Add Comment */}
                    <View style={styles.addCommentContainer}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder={user ? "Escreva seu comentário..." : "Faça login para comentar..."}
                            value={newComment}
                            onChangeText={setNewComment}
                            multiline={true}
                            numberOfLines={3}
                            editable={!!user}
                            placeholderTextColor="#999"
                        />
                        {user && (
                            <CustomButton
                                title="Enviar Comentário"
                                onPress={handleAddComment}
                                style={styles.commentButton}
                            />
                        )}
                        {!user && (
                            <CustomButton
                                title="Faça login para comentar"
                                onPress={() => navigation.navigate('Login')}
                                style={styles.commentButton}
                            />
                        )}
                    </View>

                    {/* Comments List */}
                    <View style={styles.commentsList}>
                        {comments.length > 0 ? (
                            comments.map(comment => (
                                <View key={comment.id} style={styles.commentItem}>
                                    <View style={styles.commentHeader}>
                                        <Text style={styles.commentAuthor}>{comment.author}</Text>
                                        <Text style={styles.commentDate}>{comment.date}</Text>
                                    </View>
                                    <Text style={styles.commentContent}>{comment.content}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.noComments}>Nenhum comentário ainda</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
    },
    content_text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        paddingHorizontal: 16,
        marginVertical: 16,
    },
    imageContainer: {
        height: 200,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        fontSize: 60,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        paddingHorizontal: 16,
        marginTop: 16,
    },
    metaContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginVertical: 12,
        gap: 12,
    },
    author: {
        fontSize: 12,
        color: '#666',
        fontWeight: '600',
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    category: {
        fontSize: 12,
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        color: '#666',
    },
    tagsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginVertical: 12,
        gap: 8,
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    tagText: {
        fontSize: 11,
        color: '#666',
    },
    stateContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginVertical: 12,
        alignItems: 'center',
        gap: 8,
    },
    stateLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    state: {
        fontSize: 12,
        backgroundColor: '#2196F3',
        color: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        fontWeight: 'bold',
    },
    commentsSection: {
        backgroundColor: '#fff',
        marginTop: 16,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    commentsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    addCommentContainer: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        marginBottom: 10,
        color: '#333',
    },
    commentButton: {
        marginVertical: 4,
    },
    commentsList: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    commentItem: {
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        borderLeftWidth: 3,
        borderLeftColor: '#2196F3',
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    commentAuthor: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
    },
    commentDate: {
        fontSize: 11,
        color: '#999',
    },
    commentContent: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },
    noComments: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        paddingVertical: 20,
    },
});
