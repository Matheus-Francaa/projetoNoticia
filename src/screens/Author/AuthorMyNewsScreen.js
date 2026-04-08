import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';
import { NewsCard } from '../../components/NewsCard';
import { mockNews } from '../../utils/mockData';

export const AuthorMyNewsScreen = ({ navigation }) => {
    const [myNews, setMyNews] = useState(mockNews.filter(news => news.author === 'João Autor'));

    const handleEdit = (news) => {
        navigation.navigate('AuthorEditNews', { news });
    };

    const handleDelete = (newsId) => {
        Alert.alert('Confirmar', 'Tem certeza que deseja deletar esta notícia?', [
            { text: 'Cancelar', onPress: () => { } },
            {
                text: 'Deletar',
                onPress: () => {
                    setMyNews(myNews.filter(n => n.id !== newsId));
                    Alert.alert('Sucesso', 'Notícia deletada com sucesso!');
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Header
                title="📰 Minhas Notícias"
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{myNews.length}</Text>
                        <Text style={styles.statLabel}>Notícias Criadas</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{myNews.filter(n => n.published).length}</Text>
                        <Text style={styles.statLabel}>Publicadas</Text>
                    </View>
                </View>

                <CustomButton
                    title="✨ Criar Nova Notícia"
                    onPress={() => navigation.navigate('AuthorNewNews')}
                    style={styles.createButton}
                />

                <View style={styles.newsList}>
                    {myNews.length > 0 ? (
                        myNews.map(news => (
                            <View key={news.id} style={styles.newsItemContainer}>
                                <NewsCard
                                    news={news}
                                    onPress={() => navigation.navigate('NewsDetail', { news })}
                                />
                                <View style={styles.newsActions}>
                                    <TouchableOpacity
                                        style={styles.actionBtn}
                                        onPress={() => handleEdit(news)}
                                    >
                                        <Text style={styles.actionBtnText}>✏️ Editar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.actionBtn, styles.deleteBtn]}
                                        onPress={() => handleDelete(news.id)}
                                    >
                                        <Text style={styles.deleteText}>🗑️ Deletar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>📭 Você ainda não criou nenhuma notícia</Text>
                            <CustomButton
                                title="Criar sua primeira notícia"
                                onPress={() => navigation.navigate('AuthorNewNews')}
                                style={styles.emptyButton}
                            />
                        </View>
                    )}
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
    statsContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 10,
    },
    stat: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        elevation: 1,
    },
    statNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    createButton: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    newsList: {
        paddingBottom: 20,
    },
    newsItemContainer: {
        marginBottom: 8,
    },
    newsActions: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 8,
        marginBottom: 8,
    },
    actionBtn: {
        flex: 1,
        backgroundColor: '#2196F3',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    deleteBtn: {
        backgroundColor: '#f44336',
    },
    actionBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    deleteText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    emptyState: {
        padding: 40,
        alignItems: 'center',
    },
    emptyStateText: {
        fontSize: 16,
        color: '#999',
        marginBottom: 16,
    },
    emptyButton: {
        marginVertical: 8,
    },
});
