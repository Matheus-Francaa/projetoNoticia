import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';

const mockMyNews = [
    { id: '1', title: 'Minha primeira notícia', status: 'Publicada', date: '2024-01-15' },
    { id: '2', title: 'Notícia em andamento', status: 'Rascunho', date: '2024-01-14' },
];

interface Props {
    navigation: NavigationAdapter;
}

export function AuthorMyNewsScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Header title="Minhas Notícias" showBackButton onBackPress={() => navigation.goBack()} />
            <FlatList
                data={mockMyNews}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.newsCard}
                        onPress={() => navigation.navigate('NewsDetail', { news: item })}
                    >
                        <View style={styles.newsInfo}>
                            <Text style={styles.newsTitle}>{item.title}</Text>
                            <Text style={styles.newsDate}>{item.date}</Text>
                        </View>
                        <View style={[styles.statusBadge, item.status === 'Publicada' ? styles.publishedBadge : styles.draftBadge]}>
                            <Text style={styles.statusText}>{item.status}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('NewsDetail', {})}>
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
    newsCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    publishedBadge: {
        backgroundColor: '#4CAF50',
    },
    draftBadge: {
        backgroundColor: '#FFC107',
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
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
