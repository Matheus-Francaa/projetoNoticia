import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';
import { useAuth } from '@/src/context/AuthContext';
import { useNews } from '@/src/context/NewsContext';

interface Props {
    navigation: NavigationAdapter;
}

export function AuthorHomeScreen({ navigation }: Props) {
    const { user } = useAuth();
    const { getNewsByAuthor, getPublishedNews, getPendingNews } = useNews();

    const myNews = user ? getNewsByAuthor(user.id) : [];
    const pendingCount = getPendingNews().length;
    const publishedCount = getPublishedNews().length;

    const menuItems = [
        {
            icon: '📝',
            title: 'Minhas Notícias',
            subtitle: `${myNews.length} total`,
            color: '#E3F2FD',
            onPress: () => navigation.navigate('AuthorStack'),
        },
        {
            icon: '✏️',
            title: 'Criar Notícia',
            subtitle: 'Escreva uma nova história',
            color: '#E8F5E9',
            onPress: () => navigation.navigate('NewsDetail', {}),
        },
        {
            icon: '⏳',
            title: 'Pendentes',
            subtitle: `${pendingCount} aguardando`,
            color: '#FFF3E0',
            onPress: () => navigation.navigate('AuthorStack'),
        },
        {
            icon: '👤',
            title: 'Meu Perfil',
            subtitle: 'Editar informações',
            color: '#F3E5F5',
            onPress: () => navigation.replace('ReaderStack'),
        },
    ];

    return (
        <View style={styles.container}>
            <Header title="Autor" />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Welcome Banner */}
                <View style={styles.welcomeBanner}>
                    <View style={styles.bannerContent}>
                        <View style={styles.avatarWrapper}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                                </Text>
                            </View>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>✍️</Text>
                            </View>
                        </View>
                        <View style={styles.bannerText}>
                            <Text style={styles.greeting}>Bem-vindo de volta,</Text>
                            <Text style={styles.authorName}>{user?.name || 'Autor'}!</Text>
                            <Text style={styles.bannerSubtext}>
                                Continue creating amazing stories
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <TouchableOpacity style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: '#E3F2FD' }]}>
                            <Text style={styles.statEmoji}>📊</Text>
                        </View>
                        <Text style={styles.statNumber}>{myNews.length}</Text>
                        <Text style={styles.statLabel}>Total</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: '#E8F5E9' }]}>
                            <Text style={styles.statEmoji}>✅</Text>
                        </View>
                        <Text style={styles.statNumber}>{publishedCount}</Text>
                        <Text style={styles.statLabel}>Publicadas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.statCard}>
                        <View style={[styles.statIcon, { backgroundColor: '#FFF3E0' }]}>
                            <Text style={styles.statEmoji}>⏳</Text>
                        </View>
                        <Text style={styles.statNumber}>{pendingCount}</Text>
                        <Text style={styles.statLabel}>Pendentes</Text>
                    </TouchableOpacity>
                </View>

                {/* Quick Actions */}
                <Text style={styles.sectionTitle}>Suas Ações</Text>
                <View style={styles.actionsContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.actionCard}
                            onPress={item.onPress}
                        >
                            <View style={[styles.actionIcon, { backgroundColor: item.color }]}>
                                <Text style={styles.actionEmoji}>{item.icon}</Text>
                            </View>
                            <View style={styles.actionContent}>
                                <Text style={styles.actionTitle}>{item.title}</Text>
                                <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Text style={styles.chevron}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Tips Section */}
                <View style={styles.tipsCard}>
                    <View style={styles.tipsHeader}>
                        <Text style={styles.tipsIcon}>💡</Text>
                        <Text style={styles.tipsTitle}>Dica do Dia</Text>
                    </View>
                    <Text style={styles.tipsText}>
                        Adicione imagens relevantes para aumentar o engajamento dos leitores!
                    </Text>
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
    welcomeBanner: {
        backgroundColor: '#2196F3',
        padding: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    bannerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    badge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        fontSize: 12,
    },
    bannerText: {
        marginLeft: 16,
        flex: 1,
    },
    greeting: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
    },
    authorName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    bannerSubtext: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: -30,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginHorizontal: 4,
        alignItems: 'center',
        elevation: 4,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    statIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    statEmoji: {
        fontSize: 20,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 11,
        color: '#666',
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 12,
    },
    actionsContainer: {
        paddingHorizontal: 16,
    },
    actionCard: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
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
    },
    actionEmoji: {
        fontSize: 22,
    },
    actionContent: {
        flex: 1,
        marginLeft: 12,
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    actionSubtitle: {
        fontSize: 13,
        color: '#999',
        marginTop: 2,
    },
    chevron: {
        fontSize: 24,
        color: '#ccc',
    },
    tipsCard: {
        backgroundColor: '#E3F2FD',
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 24,
        padding: 16,
        borderRadius: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
    tipsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    tipsIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    tipsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2196F3',
    },
    tipsText: {
        fontSize: 14,
        color: '#1565C0',
        lineHeight: 20,
    },
});