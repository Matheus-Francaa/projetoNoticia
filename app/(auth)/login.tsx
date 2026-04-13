import React, { useState } from 'react';
import { CustomButton } from '@/src/components/CustomButton';
import { useAuth } from '@/src/context/AuthContext';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';

type UserRole = 'author' | 'reader' | 'editor' | 'admin';

const roles: {
    role: UserRole;
    icon: string;
    name: string;
    description: string;
    color: string;
}[] = [
    {
        role: 'author',
        icon: '✏️',
        name: 'Autor',
        description: 'Criar e gerenciar notícias',
        color: '#2196F3',
    },
    {
        role: 'reader',
        icon: '👁️',
        name: 'Leitor',
        description: 'Ler e comentar',
        color: '#4CAF50',
    },
    {
        role: 'editor',
        icon: '📋',
        name: 'Editor',
        description: 'Revisar e publicar',
        color: '#FF9800',
    },
    {
        role: 'admin',
        icon: '⚡',
        name: 'Admin',
        description: 'Gerenciar sistema',
        color: '#9C27B0',
    },
];

export default function LoginScreen() {
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (role: UserRole) => {
        setSelectedRole(role);
        setLoading(true);

        setTimeout(() => {
            login(role);
            const routes: Record<UserRole, string> = {
                author: '/(author)',
                reader: '/(reader)',
                editor: '/(editor)',
                admin: '/(admin)',
            };
            router.replace(routes[role] as Parameters<typeof router.replace>[0]);
        }, 500);
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Logo Section */}
                    <View style={styles.header}>
                        <View style={styles.logoCircle}>
                            <Text style={styles.logo}>📰</Text>
                        </View>
                        <Text style={styles.appName}>Portal de Notícias</Text>
                        <Text style={styles.subtitle}>Faça login para continuar</Text>
                    </View>

                    {/* Info Card */}
                    <View style={styles.infoCard}>
                        <Text style={styles.infoTitle}>Selecione seu perfil</Text>
                        <Text style={styles.infoText}>
                            Para demonstração, escolha um dos perfis abaixo para acessar o sistema
                        </Text>
                    </View>

                    {/* Role Cards */}
                    <View style={styles.rolesContainer}>
                        {roles.map((item) => (
                            <View
                                key={item.role}
                                style={[
                                    styles.roleCard,
                                    selectedRole === item.role && styles.roleCardSelected,
                                ]}
                            >
                                <View
                                    style={[
                                        styles.iconCircle,
                                        { backgroundColor: item.color + '20' },
                                    ]}
                                >
                                    <Text style={styles.roleIcon}>{item.icon}</Text>
                                </View>
                                <View style={styles.roleInfo}>
                                    <Text style={styles.roleName}>{item.name}</Text>
                                    <Text style={styles.roleDescription}>
                                        {item.description}
                                    </Text>
                                </View>
                                <CustomButton
                                    title={selectedRole === item.role ? '✓' : '→'}
                                    onPress={() => handleLogin(item.role)}
                                    variant={
                                        selectedRole === item.role
                                            ? 'primary'
                                            : 'outline'
                                    }
                                    size="small"
                                    loading={selectedRole === item.role && loading}
                                    style={styles.loginButton}
                                />
                            </View>
                        ))}
                    </View>

                    {/* Back Button */}
                    <View style={styles.footer}>
                        <CustomButton
                            title="← Voltar"
                            onPress={() => router.back()}
                            variant="secondary"
                            fullWidth
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 24,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        elevation: 8,
        boxShadow: '0 4px 12px rgba(33,150,243,0.3)',
    },
    logo: {
        fontSize: 40,
    },
    appName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    infoCard: {
        backgroundColor: '#E3F2FD',
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1976D2',
        marginBottom: 4,
    },
    infoText: {
        fontSize: 13,
        color: '#1565C0',
        lineHeight: 18,
    },
    rolesContainer: {
        paddingHorizontal: 16,
    },
    roleCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    },
    roleCardSelected: {
        borderWidth: 2,
        borderColor: '#2196F3',
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    roleIcon: {
        fontSize: 24,
    },
    roleInfo: {
        flex: 1,
        marginLeft: 12,
    },
    roleName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    roleDescription: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    loginButton: {
        minWidth: 70,
    },
    footer: {
        paddingHorizontal: 16,
        marginTop: 16,
    },
});