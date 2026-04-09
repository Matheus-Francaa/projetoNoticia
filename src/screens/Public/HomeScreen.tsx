import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';

const mockNews = [
    {
        id: '1',
        title: 'Nova tecnologia revoluciona o mercado',
        subtitle: 'Inovação promete mudar a forma como trabalhamos',
        author: 'João Silva',
        date: '2024-01-15',
        category: 'Tecnologia',
    },
    {
        id: '2',
        title: 'Esportes: Time nacional conquista título histórico',
        subtitle: 'Uma vitória que entrará para a história',
        author: 'Maria Santos',
        date: '2024-01-14',
        category: 'Esportes',
    },
    {
        id: '3',
        title: 'Economia em crescimento',
        subtitle: 'Indicadores mostram recuperação sustentada',
        author: 'Pedro Oliveira',
        date: '2024-01-13',
        category: 'Economia',
    },
];

interface Props {
    navigation: NavigationAdapter;
}

export function HomeScreen({ navigation }: Props) {
    const renderNewsItem = ({ item }: { item: typeof mockNews[0] }) => (
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
            <Header
                title="Portal de Notícias"
                rightComponent={
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                }
            />
            <FlatList
                data={mockNews}
                renderItem={renderNewsItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
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
    newsCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    categoryBadge: {
        backgroundColor: '#2196F3',
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
