import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from '../../components/Header';
import { NewsCard } from '../../components/NewsCard';
import { mockNews, mockStates, mockTags } from '../../utils/mockData';

export const HomeScreen = ({ navigation }) => {
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [searchText, setSearchText] = useState('');

    const filteredNews = mockNews.filter(news => {
        const matchTag = !selectedTag || news.tags.includes(selectedTag);
        const matchState = !selectedState || news.state === selectedState;
        const matchSearch = !searchText || news.title.toLowerCase().includes(searchText.toLowerCase());
        return matchTag && matchState && matchSearch;
    });

    const handleNewsPress = (news) => {
        navigation.navigate('NewsDetail', { news });
    };

    return (
        <View style={styles.container}>
            <Header title="📰 Notícias" />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar notícias..."
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholderTextColor="#999"
                    />
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.actionBtnIcon}>📝</Text>
                        <Text style={styles.actionBtnText}>Cadastro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.actionBtnIcon}>🔐</Text>
                        <Text style={styles.actionBtnText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => navigation.navigate('Recovery')}
                    >
                        <Text style={styles.actionBtnIcon}>🔑</Text>
                        <Text style={styles.actionBtnText}>Recuperar</Text>
                    </TouchableOpacity>
                </View>

                {/* Tags Filter */}
                <View style={styles.filterSection}>
                    <Text style={styles.filterTitle}>🏷️ Tags</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.tagsScroll}
                    >
                        {mockTags.map(tag => (
                            <TouchableOpacity
                                key={tag.id}
                                style={[
                                    styles.tagButton,
                                    selectedTag === tag.name && styles.tagButtonActive
                                ]}
                                onPress={() => setSelectedTag(selectedTag === tag.name ? null : tag.name)}
                            >
                                <Text style={styles.tagButtonText}>{tag.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* States Filter */}
                <View style={styles.filterSection}>
                    <Text style={styles.filterTitle}>📍 Estados</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.statesScroll}
                    >
                        {mockStates.map(state => (
                            <TouchableOpacity
                                key={state.id}
                                style={[
                                    styles.stateButton,
                                    selectedState === state.code && styles.stateButtonActive
                                ]}
                                onPress={() => setSelectedState(selectedState === state.code ? null : state.code)}
                            >
                                <Text style={styles.stateButtonText}>{state.code}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* News List */}
                <View style={styles.newsSection}>
                    <Text style={styles.newsTitle}>Notícias Publicadas ({filteredNews.length})</Text>
                    {filteredNews.length > 0 ? (
                        filteredNews.map(news => (
                            <NewsCard
                                key={news.id}
                                news={news}
                                onPress={() => handleNewsPress(news)}
                            />
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>📭 Nenhuma notícia encontrada</Text>
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
    searchContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        backgroundColor: '#f9f9f9',
    },
    actionButtons: {
        flexDirection: 'row',
        padding: 16,
        gap: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    actionBtn: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    actionBtnIcon: {
        fontSize: 24,
        marginBottom: 4,
    },
    actionBtnText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    filterSection: {
        marginVertical: 12,
    },
    filterTitle: {
        paddingHorizontal: 16,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    tagsScroll: {
        paddingHorizontal: 16,
    },
    tagButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 16,
        marginRight: 8,
    },
    tagButtonActive: {
        backgroundColor: '#2196F3',
    },
    tagButtonText: {
        fontSize: 12,
        color: '#666',
    },
    statesScroll: {
        paddingHorizontal: 16,
    },
    stateButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        marginRight: 8,
    },
    stateButtonActive: {
        backgroundColor: '#2196F3',
    },
    stateButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
    },
    newsSection: {
        paddingVertical: 16,
    },
    newsTitle: {
        paddingHorizontal: 16,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    emptyState: {
        padding: 40,
        alignItems: 'center',
    },
    emptyStateText: {
        fontSize: 16,
        color: '#999',
    },
});
