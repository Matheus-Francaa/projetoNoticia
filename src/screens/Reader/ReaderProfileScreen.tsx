import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { useAuth } from '@/src/context/AuthContext';
import { NavigationAdapter } from '@/src/types';

interface Props {
    navigation: NavigationAdapter;
}

export function ReaderProfileScreen({ navigation }: Props) {
    const { user, logout } = useAuth();

    return (
        <View style={styles.container}>
            <Header title="Meu Perfil" />
            <View style={styles.profileSection}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {user?.name?.charAt(0).toUpperCase() || 'L'}
                    </Text>
                </View>
                <Text style={styles.name}>{user?.name || 'Leitor'}</Text>
                <Text style={styles.role}>Papel: Leitor</Text>
            </View>
            <View style={styles.statsSection}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Favoritos</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Comentários</Text>
                </View>
            </View>
            <View style={styles.actionsSection}>
                <Text style={[styles.actionText, styles.logoutText]} onPress={logout}>
                    Sair
                </Text>
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
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#4CAF50',
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
        color: '#4CAF50',
    },
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 16,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 14,
        color: '#999',
    },
    actionsSection: {
        padding: 20,
    },
    actionText: {
        fontSize: 16,
        color: '#333',
    },
    logoutText: {
        color: '#f44336',
        textAlign: 'center',
    },
});
