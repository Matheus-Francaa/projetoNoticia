import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';
import { mockNews } from '../../utils/mockData';

export const EditorPanelScreen = ({ navigation }) => {
    const handlePublish = (newsId) => alert(`Notícia ${newsId} publicada!`);
    const handleUnpublish = (newsId) => alert(`Notícia ${newsId} despublicada!`);
    const handleEdit = (newsId) => alert(`Editando notícia ${newsId}`);

    return (
        <View style={styles.container}>
            <Header
                title="📊 Painel de Publicação"
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView style={styles.content}>
                <View style={styles.statsContain}>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{mockNews.length}</Text>
                        <Text style={styles.statLabel}>Total de Notícias</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{mockNews.filter(n => n.published).length}</Text>
                        <Text style={styles.statLabel}>Publicadas</Text>
                    </View>
                </View>

                {mockNews.map(news => (
                    <View key={news.id} style={styles.newsItem}>
                        <View style={styles.newsInfo}>
                            <Text style={styles.newsTitle} numberOfLines={2}>{news.title}</Text>
                            <Text style={styles.newsAuthor}>{news.author}</Text>
                            <Text style={styles.newsStatus}>
                                Status: {news.published ? '✅ Publicada' : '⏸️ Rascunho'}
                            </Text>
                        </View>
                        <View style={styles.actions}>
                            <CustomButton
                                title={news.published ? 'Despublicar' : 'Publicar'}
                                onPress={() => news.published ? handleUnpublish(news.id) : handlePublish(news.id)}
                                style={styles.actionBtn}
                            />
                            <CustomButton
                                title="Editar"
                                onPress={() => handleEdit(news.id)}
                                variant="secondary"
                                style={styles.actionBtn}
                            />
                        </View>
                    </View>
                ))}
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
    statsContain: {
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
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF9800',
    },
    statLabel: {
        fontSize: 11,
        color: '#666',
        marginTop: 4,
    },
    newsItem: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 10,
        borderRadius: 8,
        padding: 12,
    },
    newsInfo: {
        marginBottom: 12,
    },
    newsTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
    },
    newsAuthor: {
        fontSize: 11,
        color: '#666',
        marginTop: 4,
    },
    newsStatus: {
        fontSize: 10,
        color: '#999',
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionBtn: {
        flex: 1,
        marginVertical: 0,
    },
});
