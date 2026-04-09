import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';
import { useAuth } from '@/src/context/AuthContext';

interface Props {
    navigation: NavigationAdapter;
}

interface SettingItemProps {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
}

function SettingItem({ icon, title, subtitle, onPress, rightElement }: SettingItemProps) {
    return (
        <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={!onPress}>
            <View style={styles.settingIcon}>
                <Text style={styles.settingEmoji}>{icon}</Text>
            </View>
            <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{title}</Text>
                {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
            </View>
            {rightElement || <Text style={styles.chevron}>›</Text>}
        </TouchableOpacity>
    );
}

export default function ReaderSettingsScreen({ navigation }: Props) {
    const { user } = useAuth();
    const [notifications, setNotifications] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(false);

    return (
        <View style={styles.container}>
            <Header title="Configurações" showBackButton onBackPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {user?.name?.charAt(0).toUpperCase() || 'R'}
                        </Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{user?.name || 'Leitor'}</Text>
                        <Text style={styles.profileEmail}>leitor@exemplo.com</Text>
                    </View>
                </View>

                {/* Settings Sections */}
                <Text style={styles.sectionTitle}>Preferências</Text>
                <View style={styles.settingsCard}>
                    <SettingItem
                        icon="🔔"
                        title="Notificações"
                        subtitle="Receba alertas de novas notícias"
                        rightElement={
                            <Switch
                                value={notifications}
                                onValueChange={setNotifications}
                                trackColor={{ false: '#ccc', true: '#4CAF50' }}
                            />
                        }
                    />
                    <SettingItem
                        icon="🌙"
                        title="Modo Escuro"
                        subtitle="Reduz esforço visual"
                        rightElement={
                            <Switch
                                value={darkMode}
                                onValueChange={setDarkMode}
                                trackColor={{ false: '#ccc', true: '#4CAF50' }}
                            />
                        }
                    />
                </View>

                <Text style={styles.sectionTitle}>Conta</Text>
                <View style={styles.settingsCard}>
                    <SettingItem
                        icon="👤"
                        title="Editar Perfil"
                        onPress={() => navigation.navigate('Profile')}
                    />
                    <SettingItem
                        icon="🔒"
                        title="Privacidade"
                        subtitle="Quem pode ver seu perfil"
                    />
                    <SettingItem
                        icon="🔑"
                        title="Alterar Senha"
                    />
                </View>

                <Text style={styles.sectionTitle}>Suporte</Text>
                <View style={styles.settingsCard}>
                    <SettingItem
                        icon="❓"
                        title="Ajuda"
                        subtitle="Perguntas frequentes"
                    />
                    <SettingItem
                        icon="📧"
                        title="Contato"
                        subtitle="Fale conosco"
                    />
                    <SettingItem
                        icon="ℹ️"
                        title="Sobre"
                        subtitle="Versão 1.0.0"
                    />
                </View>

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
        backgroundColor: '#4CAF50',
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
    profileInfo: {
        alignItems: 'center',
        marginTop: 12,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    profileEmail: {
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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingEmoji: {
        fontSize: 18,
    },
    settingContent: {
        flex: 1,
        marginLeft: 12,
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