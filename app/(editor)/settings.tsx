import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, TextInput } from 'react-native';
import { Header } from '@/src/components/Header';
import { CustomButton } from '@/src/components/CustomButton';
import { NavigationAdapter } from '@/src/types';
import { useAuth } from '@/src/context/AuthContext';
import { useNews } from '@/src/context/NewsContext';

interface Props {
    navigation: NavigationAdapter;
}

export default function EditorSettingsScreen({ navigation }: Props) {
    const { user } = useAuth();
    const { getPendingNews, getPublishedNews, news } = useNews();
    const [emailAlerts, setEmailAlerts] = useState(true);

    const pendingCount = getPendingNews().length;
    const publishedCount = getPublishedNews().length;

    return (
        <View style={styles.container}>
            <Header title="Configurações" showBackButton onBackPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {user?.name?.charAt(0).toUpperCase() || 'E'}
                        </Text>
                    </View>
                    <Text style={styles.profileName}>{user?.name || 'Editor'}</Text>
                    <Text style={styles.profileBadge}>📋 Editor</Text>
                </View>

                {/* Stats Summary */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{news.length}</Text>
                        <Text style={styles.statLabel}>Total</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={[styles.statNumber, { color: '#FF9800' }]}>{pendingCount}</Text>
                        <Text style={styles.statLabel}>Pendentes</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={[styles.statNumber, { color: '#4CAF50' }]}>{publishedCount}</Text>
                        <Text style={styles.statLabel}>Publicadas</Text>
                    </View>
                </View>

                {/* Notifications */}
                <Text style={styles.sectionTitle}>Notificações</Text>
                <View style={styles.settingsCard}>
                    <View style={styles.settingItem}>
                        <View style={styles.settingContent}>
                            <Text style={styles.settingTitle}>Alertas por email</Text>
                            <Text style={styles.settingSubtitle}>Novas publicações</Text>
                        </View>
                        <Switch
                            value={emailAlerts}
                            onValueChange={setEmailAlerts}
                            trackColor={{ false: '#ccc', true: '#FF9800' }}
                        />
                    </View>
                </View>

                {/* Editor Tools */}
                <Text style={styles.sectionTitle}>Ferramentas</Text>
                <View style={styles.settingsCard}>
                    <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Panel')}>
                        <Text style={styles.settingTitle}>Painel de Revisão</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingTitle}>Histórico</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingTitle}>Estatísticas</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                </View>

                {/* Account */}
                <Text style={styles.sectionTitle}>Conta</Text>
                <View style={styles.settingsCard}>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingTitle}>Perfil</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingTitle}>Alterar Senha</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Sair da Conta</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    profileCard: {
        backgroundColor: '#FF9800',
        padding: 24,
        alignItems: 'center',
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 12,
    },
    profileBadge: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
    statsRow: {
        flexDirection: 'row',
        padding: 16,
        marginTop: -20,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginHorizontal: 4,
        alignItems: 'center',
        elevation: 4,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        paddingHorizontal: 16,
        marginTop: 20,
        marginBottom: 8,
    },
    settingsCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 2,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingContent: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    settingSubtitle: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    chevron: {
        fontSize: 20,
        color: '#ccc',
    },
    logoutButton: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 32,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 2,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#f44336',
    },
});