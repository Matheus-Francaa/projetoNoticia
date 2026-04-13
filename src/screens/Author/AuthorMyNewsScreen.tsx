import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Header } from '@/src/components/Header';
import { CustomButton } from '@/src/components/CustomButton';
import { NavigationAdapter } from '@/src/types';
import { useNews, News } from '@/src/context/NewsContext';
import { useAuth } from '@/src/context/AuthContext';

interface Props {
    navigation: NavigationAdapter;
}

export function AuthorMyNewsScreen({ navigation }: Props) {
    const { user } = useAuth();
    const { getNewsByAuthor, deleteNews } = useNews();
    const [refreshing, setRefreshing] = useState(false);

    const myNews = user ? getNewsByAuthor(user.id) : [];

    const handleDelete = (id: string) => {
        Alert.alert(
            'Excluir Notícia',
            'Tem certeza que deseja excluir esta notícia?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => deleteNews(id),
                },
            ]
        );
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 500);
    };

    const renderItem = ({ item }: { item: News }) => (
        <TouchableOpacity
            style={styles.newsCard}
            onPress={() => navigation.navigate('NewsDetail', { news: item })}
        >
            <View style={styles.newsInfo}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsDate}>{item.date}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('NewsDetail', { news: item })}
                >
                    <Text style={styles.editText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                >
                    <Text style={styles.deleteText}>🗑️</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header title="Minhas Notícias" showBackButton onBackPress={() => navigation.goBack()} />
            {myNews.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>Você ainda não tem notícias</Text>
                    <CustomButton
                        title="Criar Primeira Notícia"
                        onPress={() => navigation.navigate('NewsDetail', {})}
                    />
                </View>
            ) : (
                <FlatList
                    data={myNews}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    renderItem={renderItem}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            )}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('NewsDetail', {})}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContent: {
        padding: 16,
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    newsCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
    },
    newsInfo: {
        flex: 1,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    newsDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
    },
    editButton: {
        padding: 8,
        marginRight: 8,
    },
    editText: {
        fontSize: 20,
    },
    deleteButton: {
        padding: 8,
    },
    deleteText: {
        fontSize: 20,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    fabText: {
        fontSize: 28,
        color: '#fff',
    },
});