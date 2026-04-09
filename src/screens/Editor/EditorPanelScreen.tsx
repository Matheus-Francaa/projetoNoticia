import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';
import { useNews, News } from '@/src/context/NewsContext';

interface Props {
    navigation: NavigationAdapter;
}

export function EditorPanelScreen({ navigation }: Props) {
    const { getPendingNews, publishNews, rejectNews } = useNews();
    const [refreshing, setRefreshing] = useState(false);

    const pendingNews = getPendingNews();

    const handleApprove = (id: string) => {
        Alert.alert(
            'Publicar Notícia',
            'Deseja publicar esta notícia?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Publicar',
                    onPress: () => {
                        publishNews(id);
                        Alert.alert('Sucesso', 'Notícia publicada com sucesso!');
                    },
                },
            ]
        );
    };

    const handleReject = (id: string) => {
        Alert.alert(
            'Rejeitar Notícia',
            'Deseja rejeitar esta notícia?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Rejeitar',
                    style: 'destructive',
                    onPress: () => {
                        rejectNews(id);
                        Alert.alert('Sucesso', 'Notícia rejeitada');
                    },
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
                <Text style={styles.newsAuthor}>Por {item.author}</Text>
                <Text style={styles.newsDate}>{item.date}</Text>
                <Text style={styles.category}>{item.category}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.approveButton}
                    onPress={() => handleApprove(item.id)}
                >
                    <Text style={styles.approveText}>✓ Aprovar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleReject(item.id)}
                >
                    <Text style={styles.rejectText}>✕ Rejeitar</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header title="Painel do Editor" showBackButton onBackPress={() => navigation.goBack()} />
            {pendingNews.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>Nenhuma notícia aguardando revisão</Text>
                </View>
            ) : (
                <FlatList
                    data={pendingNews}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    renderItem={renderItem}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            )}
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
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
    newsCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    newsInfo: {
        marginBottom: 12,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    newsAuthor: {
        fontSize: 14,
        color: '#666',
    },
    newsDate: {
        fontSize: 12,
        color: '#999',
    },
    category: {
        fontSize: 12,
        color: '#2196F3',
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    approveButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 4,
        marginRight: 8,
    },
    approveText: {
        color: '#fff',
        fontWeight: '600',
    },
    rejectButton: {
        backgroundColor: '#f44336',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 4,
    },
    rejectText: {
        color: '#fff',
        fontWeight: '600',
    },
});