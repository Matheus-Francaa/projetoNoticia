import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';
import { useReader } from '@/src/context/ReaderContext';
import { useNews } from '@/src/context/NewsContext';

interface Props {
    navigation: NavigationAdapter;
}

export default function FavoritesScreen({ navigation }: Props) {
    const { favorites } = useReader();
    const { getNewsById } = useNews();

    const favoriteNews = favorites
        .map((f) => getNewsById(f.newsId))
        .filter(Boolean);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.newsCard}
            onPress={() => navigation.navigate('NewsDetail', { news: item })}
        >
            <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{item.category}</Text>
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
            <Header title="Favoritos" showBackButton onBackPress={() => navigation.goBack()} />
            {favoriteNews.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyIcon}>❤️</Text>
                    <Text style={styles.emptyTitle}>Nenhum favorito</Text>
                    <Text style={styles.emptyText}>
                        Toque no coração para salvar notícias
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={favoriteNews}
                    keyExtractor={(item) => item?.id || ''}
                    contentContainerStyle={styles.listContent}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    listContent: {
        padding: 16,
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    newsCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    },
    categoryBadge: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    categoryText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    newsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
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
});