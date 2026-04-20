import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';
import { useAuth } from '@/src/context/AuthContext';
import { useUsers } from '@/src/context/UserContext';
import { useNews } from '@/src/context/NewsContext';

interface Props {
    navigation: NavigationAdapter;
}

export default function AdminSettingsScreen({ navigation }: Props) {
    const { user } = useAuth();
    const { users } = useUsers();
    const { news } = useNews();
    const [maintenance, setMaintenance] = useState(false);

    return (
        <View style={styles.container}>
            <Header title="Configurações" showBackButton onBackPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {user?.name?.charAt(0).toUpperCase() || 'A'}
                        </Text>
                    </View>
                    <Text style={styles.profileName}>{user?.name || 'Admin'}</Text>
                    <Text style={styles.profileBadge}>⚡ Administrador</Text>
                </View>

                {/* System Stats */}
                <Text style={styles.sectionTitle}>Sistema</Text>
                <View style={styles.statsCard}>
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Usuários</Text>
                        <Text style={styles.statValue}>{users.length}</Text>
                    </View>
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Notícias</Text>
                        <Text style={styles.statValue}>{news.length}</Text>
                    </View>
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Versão</Text>
                        <Text style={styles.statValue}>1.0.0</Text>
                    </View>
                </View>

                {/* Settings */}
                <Text style={styles.sectionTitle}>Configurações</Text>
                <View style={styles.settingsCard}>
                    <View style={styles.settingItem}>
                        <View style={styles.settingContent}>
                            <Text style={styles.settingTitle}>Modo Manutenção</Text>
                            <Text style={styles.settingSubtitle}>Bloquear acesso temporariamente</Text>
                        </View>
                        <Switch
                            value={maintenance}
                            onValueChange={setMaintenance}
                            trackColor={{ false: '#ccc', true: '#9C27B0' }}
                        />
                    </View>
                </View>

                {/* Management */}
                <Text style={styles.sectionTitle}>Gerenciamento</Text>
                <View style={styles.settingsCard}>
                    <TouchableOpacity 
                        style={styles.settingItem}
                        onPress={() => navigation.navigate('Users')}
                    >
                        <Text style={styles.settingTitle}>Gerenciar Usuários</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingTitle}>Categorias</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingTitle}>Moderar Comentários</Text>
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
                        <Text style={styles.settingTitle}>Segurança</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                </View>

                {/* About */}
                <Text style={styles.sectionTitle}>Sobre</Text>
                <View style={styles.aboutCard}>
                    <Text style={styles.aboutTitle}>Portal de Notícias</Text>
                    <Text style={styles.aboutText}>Versão 1.0.0</Text>
                    <Text style={styles.aboutText}>© 2024 Todos os direitos reservados</Text>
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
        backgroundColor: '#9C27B0',
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
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        paddingHorizontal: 16,
        marginTop: 20,
        marginBottom: 8,
    },
    statsCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 16,
        padding: 16,
        elevation: 2,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    statLabel: {
        fontSize: 16,
        color: '#333',
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#9C27B0',
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
    aboutCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        elevation: 2,
    },
    aboutTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    aboutText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
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