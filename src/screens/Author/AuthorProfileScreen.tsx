import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { useAuth } from '@/src/context/AuthContext';
import { NavigationAdapter } from '@/src/types';

interface Props {
    navigation: NavigationAdapter;
}

export function AuthorProfileScreen({ navigation }: Props) {
    const { user, logout } = useAuth();

    return (
        <View style={styles.container}>
            <Header title="Meu Perfil" />
            <View style={styles.profileSection}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {user?.name?.charAt(0).toUpperCase() || 'A'}
                    </Text>
                </View>
                <Text style={styles.name}>{user?.name || 'Autor'}</Text>
                <Text style={styles.role}>Papel: Autor</Text>
                <Text style={styles.email}>{user?.email || 'autor@exemplo.com'}</Text>
            </View>
            <View style={styles.actionsSection}>
                <Text style={styles.sectionTitle}>Configurações</Text>
                <View style={styles.actionItem}>
                    <Text style={styles.actionText}>Editar Perfil</Text>
                </View>
                <View style={styles.actionItem}>
                    <Text style={styles.actionText}>Notificações</Text>
                </View>
                <View style={styles.actionItem}>
                    <Text style={[styles.actionText, styles.logoutText]} onPress={logout}>
                        Sair
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileSection: {
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    role: {
        fontSize: 16,
        color: '#2196F3',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#999',
    },
    actionsSection: {
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    actionItem: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    actionText: {
        fontSize: 16,
        color: '#333',
    },
    logoutText: {
        color: '#f44336',
    },
});
