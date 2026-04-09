import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, TextInput } from 'react-native';
import { Header } from '@/src/components/Header';
import { CustomButton } from '@/src/components/CustomButton';
import { NavigationAdapter } from '@/src/types';
import { useAuth } from '@/src/context/AuthContext';

interface Props {
    navigation: NavigationAdapter;
}

export default function AuthorSettingsScreen({ navigation }: Props) {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState(true);
    const [emailAlerts, setEmailAlerts] = useState(true);

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
                    <Text style={styles.profileName}>{user?.name || 'Autor'}</Text>
                    <Text style={styles.profileBadge}>✍️ Autor</Text>
                </View>

                {/* Edit Profile Section */}
                <Text style={styles.sectionTitle}>Perfil</Text>
                <View style={styles.formCard}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Nome</Text>
                        <TextInput
                            style={styles.input}
                            value={user?.name || ''}
                            placeholder="Seu nome"
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value="autor@exemplo.com"
                            placeholder="Seu email"
                            keyboardType="email-address"
                        />
                    </View>
                    <CustomButton
                        title="Salvar Alterações"
                        onPress={() => {}}
                        fullWidth
                    />
                </View>

                {/* Notifications */}
                <Text style={styles.sectionTitle}>Notificações</Text>
                <View style={styles.settingsCard}>
                    <View style={styles.settingItem}>
                        <View style={styles.settingContent}>
                            <Text style={styles.settingTitle}>Notificações push</Text>
                            <Text style={styles.settingSubtitle}>Receba no seu dispositivo</Text>
                        </View>
                        <Switch
                            value={notifications}
                            onValueChange={setNotifications}
                            trackColor={{ false: '#ccc', true: '#2196F3' }}
                        />
                    </View>
                    <View style={styles.settingItem}>
                        <View style={styles.settingContent}>
                            <Text style={styles.settingTitle}>Alertas por email</Text>
                            <Text style={styles.settingSubtitle}>Status das publicações</Text>
                        </View>
                        <Switch
                            value={emailAlerts}
                            onValueChange={setEmailAlerts}
                            trackColor={{ false: '#ccc', true: '#2196F3' }}
                        />
                    </View>
                </View>

                {/* Writer Stats */}
                <Text style={styles.sectionTitle}>Estatísticas</Text>
                <View style={styles.statsCard}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Publicações</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>2.5K</Text>
                        <Text style={styles.statLabel}>Visualizações</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>156</Text>
                        <Text style={styles.statLabel}>Comentários</Text>
                    </View>
                </View>

                {/* Account */}
                <Text style={styles.sectionTitle}>Conta</Text>
                <View style={styles.settingsCard}>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingTitle}>Alterar Senha</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingItem}>
                        <Text style={styles.settingTitle}>Privacidade</Text>
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
        backgroundColor: '#2196F3',
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
    formCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 16,
        padding: 16,
        elevation: 2,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
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
    statsCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        elevation: 2,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    statLabel: {
        fontSize: 12,
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