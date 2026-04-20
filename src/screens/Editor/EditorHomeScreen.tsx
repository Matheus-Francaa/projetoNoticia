import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';
import { useAuth } from '@/src/context/AuthContext';
import { useNews } from '@/src/context/NewsContext';

interface Props {
    navigation: NavigationAdapter;
}

export function EditorHomeScreen({ navigation }: Props) {
    const { user } = useAuth();
    const { getPendingNews, getPublishedNews, news } = useNews();

    const pendingCount = getPendingNews().length;
    const publishedCount = getPublishedNews().length;
    const totalCount = news.length;

    const pendingPercentage = totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0;

    return (
        <View style={styles.container}>
            <Header title="Editor" />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Welcome Header */}
                <View style={styles.welcomeSection}>
                    <View style={styles.welcomeContent}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.welcomeIcon}>📋</Text>
                        </View>
                        <View style={styles.welcomeText}>
                            <Text style={styles.greeting}>Olá, {user?.name || 'Editor'}!</Text>
                            <Text style={styles.roleText}>
                                Review and publish content
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Stats Overview */}
                <View style={styles.statsContainer}>
                    <View style={styles.mainStat}>
                        <Text style={styles.mainStatNumber}>{pendingCount}</Text>
                        <Text style={styles.mainStatLabel}>Aguardando Revisão</Text>
                        <View style={styles.progressBar}>
                            <View 
                                style={[
                                    styles.progressFill, 
                                    { width: `${pendingPercentage}%` }
                                ]} 
                            />
                        </View>
                        <Text style={styles.progressText}>
                            {pendingPercentage}% do total
                        </Text>
                    </View>
                </View>

                {/* Quick Stats Row */}
                <View style={styles.quickStats}>
                    <View style={styles.quickStatCard}>
                        <Text style={styles.quickStatNumber}>{totalCount}</Text>
                        <Text style={styles.quickStatLabel}>Total</Text>
                    </View>
                    <View style={styles.quickStatCard}>
                        <Text style={[styles.quickStatNumber, { color: '#4CAF50' }]}>
                            {publishedCount}
                        </Text>
                        <Text style={styles.quickStatLabel}>Publicadas</Text>
                    </View>
                    <View style={styles.quickStatCard}>
                        <Text style={[styles.quickStatNumber, { color: '#FF9800' }]}>
                            {pendingCount}
                        </Text>
                        <Text style={styles.quickStatLabel}>Pendentes</Text>
                    </View>
                </View>

                {/* Actions */}
                <Text style={styles.sectionTitle}>Ações</Text>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.actionCard} onPress={() => {}}>
                        <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
                            <Text style={styles.actionEmoji}>📋</Text>
                        </View>
                        <View style={styles.actionContent}>
                            <Text style={styles.actionTitle}>Painel de Revisão</Text>
                            <Text style={styles.actionSubtitle}>
                                {pendingCount} notícias aguardando
                            </Text>
                        </View>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{pendingCount}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard} onPress={() => {}}>
                        <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
                            <Text style={styles.actionEmoji}>✅</Text>
                        </View>
                        <View style={styles.actionContent}>
                            <Text style={styles.actionTitle}>Histórico</Text>
                            <Text style={styles.actionSubtitle}>
                                {publishedCount} publicadas
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard} onPress={() => {}}>
                        <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
                            <Text style={styles.actionEmoji}>📊</Text>
                        </View>
                        <View style={styles.actionContent}>
                            <Text style={styles.actionTitle}>Estatísticas</Text>
                            <Text style={styles.actionSubtitle}>
                                Visualizar métricas
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Recent Activity */}
                <Text style={styles.sectionTitle}>Recentes</Text>
                <View style={styles.recentSection}>
                    <View style={styles.recentItem}>
                        <View style={[styles.recentDot, { backgroundColor: '#4CAF50' }]} />
                        <View style={styles.recentContent}>
                            <Text style={styles.recentTitle}>
                                &quot;Economia em recuperação&quot;
                            </Text>
                            <Text style={styles.recentTime}>Há 2 horas</Text>
                        </View>
                        <Text style={[styles.recentStatus, { color: '#4CAF50' }]}>
                            Aprovada
                        </Text>
                    </View>
                    <View style={styles.recentItem}>
                        <View style={[styles.recentDot, { backgroundColor: '#FF9800' }]} />
                        <View style={styles.recentContent}>
                            <Text style={styles.recentTitle}>
                                &quot;Nova tecnologia&quot;
                            </Text>
                            <Text style={styles.recentTime}>Há 5 horas</Text>
                        </View>
                        <Text style={[styles.recentStatus, { color: '#FF9800' }]}>
                            Pendente
                        </Text>
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
        backgroundColor: '#FF9800',
        padding: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    welcomeContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeIcon: {
        fontSize: 28,
    },
    welcomeText: {
        marginLeft: 16,
    },
    greeting: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    roleText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
    statsContainer: {
        paddingHorizontal: 16,
        marginTop: -20,
    },
    mainStat: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 4,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    mainStatNumber: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FF9800',
    },
    mainStatLabel: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    progressBar: {
        width: '100%',
        height: 8,
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
        marginTop: 16,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#FF9800',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 12,
        color: '#999',
        marginTop: 8,
    },
    quickStats: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: 16,
    },
    quickStatCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginHorizontal: 4,
        alignItems: 'center',
        elevation: 2,
    },
    quickStatNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF9800',
    },
    quickStatLabel: {
        fontSize: 11,
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
    badge: {
        backgroundColor: '#FF9800',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    recentSection: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 16,
        padding: 8,
        elevation: 2,
        marginBottom: 24,
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    recentDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    recentContent: {
        flex: 1,
        marginLeft: 12,
    },
    recentTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    recentTime: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    recentStatus: {
        fontSize: 12,
        fontWeight: '600',
    },
});