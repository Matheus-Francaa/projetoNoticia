import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';
import { useAuth } from '@/src/context/AuthContext';

interface Props {
    navigation: NavigationAdapter;
}

export default function AdminUsersScreen({ navigation }: Props) {
    useAuth();

    return (
        <View style={styles.container}>
            <Header title="Usuários" showBackButton onBackPress={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>3</Text>
                        <Text style={styles.statLabel}>Autores</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={[styles.statNumber, { color: '#FF9800' }]}>1</Text>
                        <Text style={styles.statLabel}>Editores</Text>
                    </View>
                </View>

                {/* Users List */}
                <Text style={styles.sectionTitle}>Todos os Usuários</Text>
                <View style={styles.usersCard}>
                    <TouchableOpacity style={styles.userItem}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>JS</Text>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>João Silva</Text>
                            <Text style={styles.userEmail}>joao@exemplo.com</Text>
                            <View style={styles.roleBadge}>
                                <Text style={styles.roleText}>✍️ Autor</Text>
                            </View>
                        </View>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.userItem}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>MS</Text>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>Maria Santos</Text>
                            <Text style={styles.userEmail}>maria@exemplo.com</Text>
                            <View style={styles.roleBadge}>
                                <Text style={styles.roleText}>✍️ Autor</Text>
                            </View>
                        </View>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.userItem}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>PO</Text>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>Pedro Oliveira</Text>
                            <Text style={styles.userEmail}>pedro@exemplo.com</Text>
                            <View style={[styles.roleBadge, styles.editorBadge]}>
                                <Text style={styles.roleText}>📋 Editor</Text>
                            </View>
                        </View>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                </View>

                {/* Add User Button */}
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ Adicionar Usuário</Text>
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
    statsRow: {
        flexDirection: 'row',
        padding: 16,
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#9C27B0',
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
        marginTop: 16,
        marginBottom: 8,
    },
    usersCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 2,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2196F3',
    },
    userInfo: {
        flex: 1,
        marginLeft: 12,
    },
    userName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    userEmail: {
        fontSize: 13,
        color: '#666',
    },
    roleBadge: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginTop: 4,
    },
    editorBadge: {
        backgroundColor: '#FFF3E0',
    },
    roleText: {
        fontSize: 11,
        color: '#666',
    },
    chevron: {
        fontSize: 20,
        color: '#ccc',
    },
    addButton: {
        backgroundColor: '#9C27B0',
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 32,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});