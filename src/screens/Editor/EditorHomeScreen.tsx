import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';
import { useAuth } from '@/src/context/AuthContext';

interface Props {
    navigation: NavigationAdapter;
}

export function EditorHomeScreen({ navigation }: Props) {
    const { user } = useAuth();

    return (
        <View style={styles.container}>
            <Header title="Área do Editor" />
            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeText}>Bem-vindo, {user?.name || 'Editor'}!</Text>
                <Text style={styles.roleText}>Você está na área de editor</Text>
            </View>
            <View style={styles.statsSection}>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>Pendentes</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>45</Text>
                    <Text style={styles.statLabel}>Publicadas</Text>
                </View>
            </View>
            <View style={styles.menuSection}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuIcon}>📋</Text>
                    <Text style={styles.menuText}>Revisar Notícias</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuIcon}>✅</Text>
                    <Text style={styles.menuText}>Publicar Notícias</Text>
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
        backgroundColor: '#FF9800',
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
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 8,
        elevation: 2,
    },
    statNumber: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FF9800',
    },
    statLabel: {
        fontSize: 14,
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
