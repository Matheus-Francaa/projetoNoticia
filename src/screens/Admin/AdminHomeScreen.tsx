import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';
import { useUsers, UserManagement } from '@/src/context/UserContext';
import { useAuth } from '@/src/context/AuthContext';

interface Props {
    navigation: NavigationAdapter;
}

export function AdminHomeScreen({ navigation }: Props) {
    const { user } = useAuth();
    const { users, deleteUser, getUsersByRole } = useUsers();
    const [activeTab, setActiveTab] = useState<'authors' | 'editors'>('authors');

    const displayedUsers = activeTab === 'authors' ? getUsersByRole('author') : getUsersByRole('editor');

    const handleDeleteUser = (id: string, name: string) => {
        Alert.alert(
            'Excluir Usuário',
            `Tem certeza que deseja excluir ${name}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => deleteUser(id),
                },
            ]
        );
    };

    const renderItem = ({ item }: { item: UserManagement }) => (
        <View style={styles.userCard}>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <Text style={styles.userDate}>Criado em: {item.createdAt}</Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteUser(item.id, item.name)}
            >
                <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="Painel Admin" />
            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeText}>Bem-vindo, {user?.name || 'Admin'}!</Text>
                <Text style={styles.roleText}>Super Administrador</Text>
            </View>

            <View style={styles.statsSection}>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{users.length}</Text>
                    <Text style={styles.statLabel}>Total Usuários</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{getUsersByRole('author').length}</Text>
                    <Text style={styles.statLabel}>Autores</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{getUsersByRole('editor').length}</Text>
                    <Text style={styles.statLabel}>Editores</Text>
                </View>
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'authors' && styles.activeTab]}
                    onPress={() => setActiveTab('authors')}
                >
                    <Text style={[styles.tabText, activeTab === 'authors' && styles.activeTabText]}>
                        Autores
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'editors' && styles.activeTab]}
                    onPress={() => setActiveTab('editors')}
                >
                    <Text style={[styles.tabText, activeTab === 'editors' && styles.activeTabText]}>
                        Editores
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={displayedUsers}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>Nenhum usuário encontrado</Text>
                    </View>
                }
            />
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
        padding: 16,
    },
    statCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
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
    tabs: {
        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    tab: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#9C27B0',
    },
    tabText: {
        fontSize: 16,
        color: '#666',
    },
    activeTabText: {
        color: '#9C27B0',
        fontWeight: '600',
    },
    listContent: {
        padding: 16,
    },
    empty: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
    userCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    userDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    deleteButton: {
        padding: 8,
    },
    deleteText: {
        fontSize: 20,
    },
});