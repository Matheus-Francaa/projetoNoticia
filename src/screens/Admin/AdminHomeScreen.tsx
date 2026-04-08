import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';
import { useAuth } from '@/src/context/AuthContext';

interface Props {
    navigation: NavigationAdapter;
}

export function AdminHomeScreen({ navigation }: Props) {
    const { user } = useAuth();

    return (
        <View style={styles.container}>
            <Header title="Painel Admin" />
            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeText}>Bem-vindo, {user?.name || 'Admin'}!</Text>
                <Text style={styles.roleText}>Super Administrador</Text>
            </View>
            <View style={styles.statsSection}>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>150</Text>
                    <Text style={styles.statLabel}>Usuários</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>89</Text>
                    <Text style={styles.statLabel}>Notícias</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>23</Text>
                    <Text style={styles.statLabel}>Autores</Text>
                </View>
            </View>
            <View style={styles.menuSection}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuIcon}>👥</Text>
                    <Text style={styles.menuText}>Gerenciar Usuários</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuIcon}>📰</Text>
                    <Text style={styles.menuText}>Gerenciar Notícias</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuIcon}>⚙️</Text>
                    <Text style={styles.menuText}>Configurações</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    welcomeSection: {
        backgroundColor: '#9C27B0',
        padding: 20,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    roleText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 4,
        elevation: 2,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#9C27B0',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    menuSection: {
        paddingHorizontal: 16,
    },
    menuItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
    },
    menuIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    menuText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
});
