import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';
import { useNews, News } from '@/src/context/NewsContext';
import { useReader } from '@/src/context/ReaderContext';

interface Props {
    navigation: NavigationAdapter;
}

export function HomeScreen({ navigation }: Props) {
    const { getPublishedNews } = useNews();
    const { addFavorite, removeFavorite, isFavorite } = useReader();
    const [refreshing, setRefreshing] = useState(false);

    const publishedNews = getPublishedNews();

    const handleFavorite = (newsId: string) => {
        if (isFavorite(newsId)) {
            removeFavorite(newsId);
        } else {
            addFavorite(newsId);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 500);
    };

    const renderNewsItem = ({ item }: { item: News }) => (
        <TouchableOpacity
            style={styles.newsCard}
            onPress={() => navigation.navigate('NewsDetail', { news: item })}
        >
            <View style={styles.cardHeader}>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <TouchableOpacity onPress={() => handleFavorite(item.id)}>
                    <Text style={styles.favoriteIcon}>
                        {isFavorite(item.id) ? '❤️' : '🤍'}
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsSubtitle}>{item.subtitle}</Text>
            <View style={styles.newsFooter}>
                <Text style={styles.authorText}>Por {item.author}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header
                title="Portal de Notícias"
                rightComponent={
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                }
            />
            <FlatList
                data={publishedNews}
                renderItem={renderNewsItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>Nenhuma notícia publicada</Text>
                    </View>
                }
            />
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
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
    newsCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryBadge: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    categoryText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    favoriteIcon: {
        fontSize: 20,
    },
    newsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    newsSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    newsFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    authorText: {
        fontSize: 12,
        color: '#999',
    },
    dateText: {
        fontSize: 12,
        color: '#999',
    },
    loginText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});