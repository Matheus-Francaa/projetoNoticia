import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';
import { useAuth } from '@/src/context/AuthContext';
import { useReader } from '@/src/context/ReaderContext';
import { useNews } from '@/src/context/NewsContext';

interface Props {
    navigation: NavigationAdapter;
}

export function ReaderHomeScreen({ navigation }: Props) {
    const { user } = useAuth();
    const { favorites } = useReader();
    const { getPublishedNews } = useNews();
    
    const publishedCount = getPublishedNews().length;
    const favoriteCount = favorites.length;

    return (
        <View style={styles.container}>
            <Header title="Leitor" />
            
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Welcome Section with Avatar */}
                <View style={styles.welcomeSection}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {user?.name?.charAt(0).toUpperCase() || 'L'}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.welcomeText}>
                        Olá, {user?.name || 'Leitor'}!
                    </Text>
                    <Text style={styles.welcomeSubtext}>
                        Continue informed with the latest news
                    </Text>
                </View>

                {/* Quick Stats */}
                <View style={styles.statsRow}>
                    <TouchableOpacity 
                        style={styles.statCard}
                        onPress={() => navigation.replace('Home')}
                    >
                        <Text style={styles.statNumber}>{publishedCount}</Text>
                        <Text style={styles.statLabel}>Notícias</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.statCard}
                        onPress={() => navigation.navigate('Favorites')}
                    >
                        <Text style={styles.statNumber}>{favoriteCount}</Text>
                        <Text style={styles.statLabel}>Favoritos</Text>
                    </TouchableOpacity>
                </View>

                {/* Quick Actions */}
                <Text style={styles.sectionTitle}>Ações Rápidas</Text>
                <View style={styles.actionsGrid}>
                    <TouchableOpacity 
                        style={styles.actionCard}
                        onPress={() => navigation.replace('Home')}
                    >
                        <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
                            <Text style={styles.actionEmoji}>📰</Text>
                        </View>
                        <Text style={styles.actionTitle}>Todas as Notícias</Text>
                        <Text style={styles.actionSubtitle}>Explore o feed</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.actionCard}
                        onPress={() => navigation.navigate('Favorites')}
                    >
                        <View style={[styles.actionIcon, { backgroundColor: '#FFEBEE' }]}>
                            <Text style={styles.actionEmoji}>❤️</Text>
                        </View>
                        <Text style={styles.actionTitle}>Favoritos</Text>
                        <Text style={styles.actionSubtitle}>{favoriteCount} salvas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.actionCard}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
                            <Text style={styles.actionEmoji}>⚙️</Text>
                        </View>
                        <Text style={styles.actionTitle}>Configurações</Text>
                        <Text style={styles.actionSubtitle}>Personalize</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.actionCard}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
                            <Text style={styles.actionEmoji}>👤</Text>
                        </View>
                        <Text style={styles.actionTitle}>Meu Perfil</Text>
                        <Text style={styles.actionSubtitle}>Ver informações</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Activity */}
                <Text style={styles.sectionTitle}>Em Alta</Text>
                <View style={styles.trendingSection}>
                    <View style={styles.trendingItem}>
                        <View style={styles.trendingRank}>
                            <Text style={styles.trendingRankText}>1</Text>
                        </View>
                        <View style={styles.trendingInfo}>
                            <Text style={styles.trendingTitle}>Tecnologia</Text>
                            <Text style={styles.trendingSubtitle}>12 notícias</Text>
                        </View>
                    </View>
                    <View style={styles.trendingItem}>
                        <View style={styles.trendingRank}>
                            <Text style={styles.trendingRankText}>2</Text>
                        </View>
                        <View style={styles.trendingInfo}>
                            <Text style={styles.trendingTitle}>Esportes</Text>
                            <Text style={styles.trendingSubtitle}>8 notícias</Text>
                        </View>
                    </View>
                    <View style={styles.trendingItem}>
                        <View style={styles.trendingRank}>
                            <Text style={styles.trendingRankText}>3</Text>
                        </View>
                        <View style={styles.trendingInfo}>
                            <Text style={styles.trendingTitle}>Economia</Text>
                            <Text style={styles.trendingSubtitle}>5 notícias</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    welcomeSection: {
        backgroundColor: '#4CAF50',
        padding: 24,
        paddingTop: 16,
        alignItems: 'center',
    },
    avatarContainer: {
        marginBottom: 12,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    welcomeSubtext: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
    statsRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: -20,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginHorizontal: 6,
        alignItems: 'center',
        elevation: 4,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    statNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 12,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
    },
    actionCard: {
        width: '47%',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginHorizontal: '1.5%',
        marginBottom: 12,
        elevation: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    actionEmoji: {
        fontSize: 24,
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    actionSubtitle: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    trendingSection: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 16,
        padding: 8,
        elevation: 2,
    },
    trendingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    trendingRank: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    trendingRankText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    trendingInfo: {
        marginLeft: 12,
        flex: 1,
    },
    trendingTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    trendingSubtitle: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
});