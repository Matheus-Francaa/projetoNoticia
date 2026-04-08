import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';

const pendingNews = [
    { id: '1', title: 'Notícia em revisão', author: 'João Silva', date: '2024-01-15' },
    { id: '2', title: 'Artigo pendente', author: 'Maria Santos', date: '2024-01-14' },
];

interface Props {
    navigation: NavigationAdapter;
}

export function EditorPanelScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Header title="Painel do Editor" showBackButton onBackPress={() => navigation.goBack()} />
            <FlatList
                data={pendingNews}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.newsCard}
                        onPress={() => navigation.navigate('NewsDetail', { news: item })}
                    >
                        <Text style={styles.newsTitle}>{item.title}</Text>
                        <Text style={styles.newsAuthor}>Por {item.author}</Text>
                        <Text style={styles.newsDate}>{item.date}</Text>
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.approveButton}>
                                <Text style={styles.approveText}>Aprovar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rejectButton}>
                                <Text style={styles.rejectText}>Rejeitar</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
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
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    newsAuthor: {
        fontSize: 14,
        color: '#666',
    },
    newsDate: {
        fontSize: 12,
        color: '#999',
        marginBottom: 12,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    approveButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 16,
        paddingVertical: 8,
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
        paddingVertical: 8,
        borderRadius: 4,
    },
    rejectText: {
        color: '#fff',
        fontWeight: '600',
    },
});
