import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const NewsCard = ({ news, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.imageContainer}>
                <Text style={styles.image}>{news.image}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{news.title}</Text>
                <Text style={styles.excerpt} numberOfLines={2}>{news.excerpt}</Text>
                <View style={styles.meta}>
                    <Text style={styles.author}>{news.author}</Text>
                    <Text style={styles.date}>{new Date(news.date).toLocaleDateString('pt-BR')}</Text>
                </View>
                <View style={styles.tags}>
                    {news.tags.slice(0, 2).map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    imageContainer: {
        width: 100,
        height: 100,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        fontSize: 40,
    },
    content: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    excerpt: {
        fontSize: 12,
        color: '#666',
        marginBottom: 6,
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    author: {
        fontSize: 11,
        color: '#999',
    },
    date: {
        fontSize: 11,
        color: '#999',
    },
    tags: {
        flexDirection: 'row',
        gap: 4,
    },
    tag: {
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    tagText: {
        fontSize: 10,
        color: '#666',
    },
});
